"use client";

import Link from "next/link";
import { useEffect } from "react";

import useCartStore from "@/stores/cart_store";
import CartItem from "./cart_item";
import DisplayAlert from "@/components/display_alert";

import { Button } from "@/components/ui/button";
import { CartProduct } from "@/lib/types";

interface Props {
  initialCart: CartProduct[];
}

function CartList({ initialCart }: Props) {
  const { products, setProducts } = useCartStore();

  useEffect(() => {
    setProducts(initialCart);
  }, [initialCart, setProducts]);

  const total = products.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (products.length === 0)
    return <DisplayAlert> No products in the cart!</DisplayAlert>;

  return (
    <>
      <section className="grid grid-cols-2 gap-6 mt-8 px-4">
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </section>

      {products.length > 0 && (
        <footer className="mt-8 space-y-4 flex flex-col">
          <div className="flex justify-between w-full px-6">
            <p className="text-lg headingFont font-medium">Amount to Pay</p>
            <p className="font-medium headingFont">${total.toFixed(2)}</p>
          </div>
          <Link href={"/checkout"} className="w-fit self-center">
            <Button className="w-96 bg-emerald-700 hover:bg-emerald-800 transition-all duration-300 text-white rounded-full py-6">
              Continue to Checkout
            </Button>
          </Link>
        </footer>
      )}
    </>
  );
}

export default CartList;
