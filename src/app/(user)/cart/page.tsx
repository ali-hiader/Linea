import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getCart } from "@/actions/cart-actions";
import CartList from "@/components/cart_list";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Cart() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const cart = await getCart();

  return (
    <main className="px-4 sm:px-[5%] mx-auto pt-2 pb-6">
      <CartList initialCart={cart} />
    </main>
  );
}
