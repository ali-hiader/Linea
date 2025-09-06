import { getCart } from "@/actions/cart-actions";
import CartList from "@/components/cart_list";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Cart() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  if (!session) {
    redirect("/sign-in");
  }
  const cart = await getCart();

  return (
    <main className="max-w-5xl mx-auto py-6">
      <h1 className="headingFont font-medium text-xl">Your Cart</h1>
      <CartList initialCart={cart} />
    </main>
  );
}
