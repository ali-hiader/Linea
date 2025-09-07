"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cart_store";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Spinner from "@/icons/spinner";
import { useState } from "react";
import CheckoutProduct from "@/components/checkout_product";

function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useCartStore();
  const router = useRouter();

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
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
    <main className="max-w-5xl mx-auto mt-8">
      <Button variant={"outline"} onClick={() => router.back()}>
        <ArrowLeft /> Back
      </Button>
      <section className="grid grid-cols-2 gap-6 mt-8 px-4">
        {products.map((product) => (
          <CheckoutProduct key={product.id} product={product} />
        ))}
      </section>

      {products.length > 0 && (
        <footer className="mt-8 space-y-4 flex flex-col">
          <div className="flex justify-between w-full px-6">
            <p className="text-lg headingFont font-medium">Amount to Pay</p>
            <p className="font-medium headingFont">${total.toFixed(2)}</p>
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
    </main>
  );
}

export default CheckoutPage;
