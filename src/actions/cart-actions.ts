"use server";

import { db } from "..";
import { cartTable, user as userTable, shirtsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { headers } from "next/headers";
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
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return redirect("/sign-up");
    }

    const user = await db
      .selectDistinct()
      .from(userTable)
      .where(eq(userTable.id, session.user.id));

    const cart = await db
      .select({
        cartId: cartTable.id,
        quantity: cartTable.quantity,
        ...getTableColumns(shirtsTable),
      })
      .from(cartTable)
      .innerJoin(shirtsTable, eq(cartTable.productId, shirtsTable.id))
      .where(eq(cartTable.createdBy, user[0].id))
      .orderBy(desc(cartTable.id));
    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function addToCart(productId: number) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    redirect("/sign-up");
  }
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, session.user.id));
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
