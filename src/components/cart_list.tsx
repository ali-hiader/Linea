"use client";

import Link from "next/link";
import { useEffect } from "react";

import useCartStore from "@/stores/cart_store";
import CartItem from "./cart_item";
import DisplayAlert from "@/components/display_alert";

import { Button } from "@/components/ui/button";
import { CartProduct } from "@/lib/types";
import Heading from "./heading";

interface Props {
  initialCart: CartProduct[];
}

function CartList({ initialCart }: Props) {
  const { products, setProducts } = useCartStore();

  useEffect(() => {
    setProducts(initialCart);
  }, [initialCart, setProducts]);

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const totalItemsInCart = products.reduce(
    (totalQty, item) => item.quantity + totalQty,
    0
  );

  return (
    <>
      <Heading title="Cart" itemsOnPage={totalItemsInCart} />
      {products.length === 0 ? (
        <DisplayAlert> No products in the cart!</DisplayAlert>
      ) : (
        <section className="grid grid-cols-2 gap-6 mt-12 px-4 max-w-5xl mx-auto">
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </section>
      )}

      {products.length > 0 && (
        <footer className="mt-12 space-y-4 flex flex-col max-w-5xl mx-auto">
          <div className="flex justify-between w-full px-6 text-gray-700">
            <p className="font-medium">Amount to Pay</p>
            <p className="font-medium">${totalPrice.toFixed(2)}</p>
          </div>
          <Link href={"/checkout"} className="w-fit self-center">
            <Button className="w-96 bg-secondary cursor-pointer hover:bg-secondary/90 transition-all duration-300 text-white rounded-full py-6">
              Continue to Checkout
            </Button>
          </Link>
        </footer>
      )}
    </>
  );
}

export default CartList;
