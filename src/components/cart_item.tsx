"use client";
import Spinner from "@/icons/spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartProduct } from "@/lib/types";
import {
  decreaseQtyDB,
  increaseQtyDB,
  removeFromCart,
} from "@/actions/cart-actions";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import useCartStore from "@/stores/cart_store";

interface Props {
  product: CartProduct;
}

function CartItem({ product }: Props) {
  const [loading, setLoading] = useState({
    delete: false,
    update: false,
    decrease: false,
  });

  const { decreaseQuantity, removeProduct, updateQuantity } = useCartStore();
  async function deleteProduct(productId: number) {
    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      await removeFromCart(productId);
      removeProduct(productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  }

  async function increaseQty() {
    setLoading((prev) => ({ ...prev, update: true }));
    await increaseQtyDB(product.id);
    updateQuantity(product.id);
    setLoading((prev) => ({ ...prev, update: false }));
  }

  async function decQty(productId: number) {
    setLoading((prev) => ({ ...prev, decrease: true }));
    await decreaseQtyDB(productId);
    decreaseQuantity(productId);
    setLoading((prev) => ({ ...prev, decrease: false }));
  }

  return (
    <Card
      key={product.cartId}
      className="h-fit grid grid-cols-[1fr_3fr] min-h-36 gap-5 overflow-hidden  px-6 py-4"
    >
      <div className="relative border border-border shadow overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <section className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{product.title}</h3>
          <p className="font-medium headingFont text-emerald-700">
            ${product.price}
          </p>
        </div>

        <p className="text-sm text-muted-foreground mt-1">
          Category: {product.category}
        </p>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center">
            <Button
              onClick={() => decQty(product.id)}
              variant="ghost"
              size="icon"
              className="size-7 rounded-none cursor-pointer"
              disabled={loading.decrease}
            >
              {loading.decrease ? (
                <Spinner className="size-4 animate-spin" />
              ) : (
                <Minus className="size-2" />
              )}
              <span className="sr-only">Decrease quantity</span>
            </Button>

            <span className="w-8 text-center">{product.quantity}</span>

            <Button
              onClick={increaseQty}
              variant="ghost"
              size="icon"
              className="size-7 rounded-none cursor-pointer"
              disabled={loading.update}
            >
              {loading.update ? (
                <Spinner className="size-4 animate-spin" />
              ) : (
                <Plus className="sze-2" />
              )}
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <Button
            onClick={() => deleteProduct(product.id)}
            variant="link"
            size="icon"
            className="h-10 w-10 cursor-pointer"
            disabled={loading.delete}
          >
            {loading.delete ? (
              <Spinner className="size-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 text-rose-600" />
            )}
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </section>
    </Card>
  );
}

export default CartItem;
