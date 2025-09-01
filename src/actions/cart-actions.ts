"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { cartTable, productsTable, usersTable } from "@/db/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getSingleCartProduct(productId: number) {
  const products = await db
    .select()
    .from(cartTable)
    .where(eq(cartTable.productId, productId));
  return products[0];
}
export async function getCart() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return redirect("/sign-up");
    }

    const user = await db
      .selectDistinct()
      .from(usersTable)
      .where(eq(usersTable.email, clerkUser!.emailAddresses[0].emailAddress));

    const cart = await db
      .select({
        cartId: cartTable.id,
        quantity: cartTable.quantity,
        ...getTableColumns(productsTable),
      })
      .from(cartTable)
      .innerJoin(productsTable, eq(cartTable.productId, productsTable.id))
      .where(eq(cartTable.createdBy, user[0].id))
      .orderBy(desc(cartTable.id));
    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function addToCart(productId: number) {
  const currUser = await currentUser();
  if (!currUser) {
    redirect("/sign-up");
  }
  const user = await db
    .select()
    .from(usersTable)
    .where(
      eq(
        usersTable.email,
        currUser.primaryEmailAddress?.emailAddress ??
          currUser.emailAddresses[0].emailAddress
      )
    );
  console.log(user);
  const exsistingProduct = await getSingleCartProduct(productId);

  if (!exsistingProduct) {
    await db.insert(cartTable).values({
      createdBy: user[0].id,
      productId: productId,
      quantity: 1,
    });
    return "success";
  } else {
    await increaseQtyDB(productId);
    return "success";
  }
}

export async function increaseQtyDB(productId: number) {
  const exsistingProduct = await getSingleCartProduct(productId);
  await db
    .update(cartTable)
    .set({
      quantity: exsistingProduct.quantity + 1,
    })
    .where(eq(cartTable.productId, productId));
}

export async function decreaseQtyDB(productId: number) {
  const exsistingProduct = await getSingleCartProduct(productId);

  if (exsistingProduct.quantity === 1) {
    await removeFromCart(productId);
    return "success";
  } else {
    const result = await db
      .update(cartTable)
      .set({
        quantity: exsistingProduct.quantity - 1,
      })
      .where(eq(cartTable.productId, exsistingProduct.productId));
    console.log(result);
    return "success";
  }
}
export async function removeFromCart(productId: number) {
  await db.delete(cartTable).where(eq(cartTable.productId, productId));
  const cartProducts = await getCart();
  return cartProducts;
}

export async function clearCart() {
  await db.delete(cartTable);
}
