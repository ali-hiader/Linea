import Checkout from "@/components/checkout";
import { cartTable, shirtsTable } from "@/db/schema";
import { db } from "@/index";
import { auth } from "@/lib/auth";
import { eq, getTableColumns } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function CheckoutPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const cartItems = await db
    .select({
      cartId: cartTable.id,
      quantity: cartTable.quantity,
      ...getTableColumns(shirtsTable),
    })
    .from(cartTable)
    .innerJoin(shirtsTable, eq(cartTable.productId, shirtsTable.id))
    .where(eq(cartTable.createdBy, session.user.id));

  return <Checkout cartItems={cartItems} />;
}

export default CheckoutPage;
