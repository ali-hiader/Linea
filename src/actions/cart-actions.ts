"use server";

import { db } from "..";
import { cartTable, user as userTable, shirtsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSingleCartProduct(shirtId: number) {
  const products = await db
    .select()
    .from(cartTable)
    .where(eq(cartTable.productId, shirtId));
  return products[0];
}

export async function getSingleShirt(shirtId: number) {
  const products = await db
    .select({
      cartId: cartTable.id,
      quantity: cartTable.quantity,
      ...getTableColumns(shirtsTable),
    })
    .from(cartTable)
    .innerJoin(shirtsTable, eq(cartTable.productId, shirtsTable.id))
    .where(eq(cartTable.productId, shirtId));
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
      .select()
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

export async function addToCart(shirtId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-up");
  }

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, session.user.id));

  const exsistingProduct = await getSingleCartProduct(shirtId);

  if (!exsistingProduct) {
    const newCartProduct = await db
      .insert(cartTable)
      .values({
        createdBy: user[0].id,
        productId: shirtId,
        quantity: 1,
      })
      .returning();
    return await getSingleShirt(newCartProduct[0].productId);
  } else {
    const increasedQtyCartProduct = await increaseQtyDB(shirtId);
    return await getSingleShirt(increasedQtyCartProduct[0].productId);
  }
}

export async function increaseQtyDB(shirtId: number) {
  const exsistingProduct = await getSingleCartProduct(shirtId);
  return await db
    .update(cartTable)
    .set({
      quantity: exsistingProduct.quantity + 1,
    })
    .where(eq(cartTable.productId, shirtId))
    .returning();
}

export async function decreaseQtyDB(shirtId: number) {
  const exsistingProduct = await getSingleCartProduct(shirtId);

  if (exsistingProduct.quantity === 1) {
    await removeFromCart(shirtId);
    return "success";
  } else {
    return await db
      .update(cartTable)
      .set({
        quantity: exsistingProduct.quantity - 1,
      })
      .where(eq(cartTable.productId, exsistingProduct.productId))
      .returning();
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
