"use server";
import { currentUser } from "@clerk/nextjs/server";
import { validateForm } from "../lib/validate-form";
import * as v from "valibot";
import { db } from "@/db";
import { cartTable, productsTable, usersTable } from "@/db/schema";
import { eq, getTableColumns, asc, like, sql, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { slugifyIt } from "@/lib/utils";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

const scheme = v.object({
  image: v.pipe(v.file("Invalid file format")),
  title: v.pipe(
    v.string("Product title is required"),
    v.minLength(1, "Title cannot be empty")
  ),
  price: v.pipe(v.string("Price cannot be empty"), v.nonEmpty()),
  category: v.pipe(v.string(), v.nonEmpty()),
  description: v.pipe(
    v.string("Description is required"),
    v.nonEmpty(),
    v.minLength(1, "Description cannot be empty")
  ),
  productDetail: v.pipe(v.string(), v.nonEmpty()),
  message: v.pipe(v.string(), v.nonEmpty()),
});

export async function addNewProduct(state: unknown, formdata: FormData) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL!);
  }
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, clerkUser.emailAddresses[0].emailAddress));
  console.log(user);

  const result = validateForm(scheme, formdata);

  if (!result.success) {
    return result.output;
  }
  const product = result.output;
  const arrayBuffer = await product.image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await uploadImage(buffer, async (result) => {
    if (!result) {
      throw redirect("/add-product");
    }

    const imageUrl =
      result.url.split("/upload")[0] +
      "/upload" +
      "/q_auto/f_auto" +
      result.url.split("/upload")[1];

    await db.insert(productsTable).values({
      category: product.category,
      description: product.description,
      imageUrl,
      message: product.message,
      price: +product.price,
      productDetail: product.productDetail,
      title: product.title,
      slug: slugifyIt(product.title),
      createdBy: user[0].id,
    });
    throw redirect("/seller-dashboard");
  });
}

export async function fetchAllProducts(
  limit: number,
  offset: number,
  sortBy = "newest"
) {
  let orderBy = asc(productsTable.id);
  if (sortBy === "fromLow") {
    orderBy = asc(productsTable.price);
  }
  if (sortBy === "fromHigh") {
    orderBy = desc(productsTable.price);
  }

  const products = await db
    .select({
      user: { ...getTableColumns(usersTable) },
      ...getTableColumns(productsTable),
    })
    .from(productsTable)
    .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.id))
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset);

  console.log(products);
  return products;
}

export async function fetchSimilarProducts(
  category: string,
  productName: string
) {
  const products = await db
    .select({
      user: { ...getTableColumns(usersTable) },
      ...getTableColumns(productsTable),
    })
    .from(productsTable)
    .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.id))
    .where(
      sql`${productsTable.category} = ${category} AND ${productsTable.title} != ${productName}`
    )
    .limit(9);
  return products;
}

const searchSchema = v.object({
  search: v.pipe(v.string("Enter product name in form of text.")),
});
export async function searchProduct(state: unknown, formdata: FormData) {
  const result = validateForm(searchSchema, formdata);

  if (!result.success) {
    return result.output;
  }

  const products = await db
    .select({
      user: { ...getTableColumns(usersTable) },
      ...getTableColumns(productsTable),
    })
    .from(productsTable)
    .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.id))
    .where(
      like(
        sql`LOWER(${productsTable.title})`,
        "%" + result.output.search.toLowerCase() + "%"
      )
    )
    .limit(9)
    .orderBy(asc(productsTable.title));
  return products;
}

export async function getProductDetail(slug: string) {
  const products = await db
    .select({
      user: { ...getTableColumns(usersTable) },
      ...getTableColumns(productsTable),
    })
    .from(productsTable)
    .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.id))
    .where(like(productsTable.slug, slug));
  return products;
}

export async function deleteProduct(id: number, imageUrl: string) {
  await db.delete(cartTable).where(eq(cartTable.productId, id));
  await db.delete(productsTable).where(eq(productsTable.id, id));

  const filePathMatch = imageUrl.match(/products-images%2F(.+?)\?/);
  if (filePathMatch) {
    const fileName = filePathMatch[1];
    try {
      await deleteImage(`products-images/${fileName}`);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  redirect("/seller-dashboard");
}
