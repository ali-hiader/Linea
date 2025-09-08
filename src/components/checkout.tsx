"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/icons/spinner";
import { useState } from "react";
import CheckoutProduct from "@/components/checkout_product";
import Heading from "./heading";
import { CartProduct } from "@/lib/types";

interface Props {
  cartItems: CartProduct[];
}

function Checkout({ cartItems }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cartItems }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="px-4 sm:px-[5%] mb-12">
      <Heading
        title="Checkout"
        itemsOnPage={cartItems.reduce((sum, shirt) => sum + shirt.quantity, 0)}
      />
      <section className="max-w-5xl mx-auto mt-12">
        <div className="grid grid-cols-2 gap-6 mt-8 px-4">
          {cartItems.map((product) => (
            <CheckoutProduct key={product.id} product={product} />
          ))}
        </div>

        {cartItems.length > 0 && (
          <footer className="mt-12 space-y-4 flex flex-col">
            <div className="flex justify-between w-full px-6">
              <p className="">Amount to Pay</p>
              <p className="font-semibold headingFont text-xl">
                ${total.toFixed(2)}
              </p>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-96 self-center bg-emerald-700 hover:bg-emerald-800 transition-all duration-300 text-white rounded-full py-6"
            >
              {isLoading ? (
                <Spinner className="size-7 animate-spin [&>path]:stroke-white" />
              ) : (
                "Checkout"
              )}
            </Button>
          </footer>
        )}
      </section>
    </main>
  );
}

export default Checkout;
