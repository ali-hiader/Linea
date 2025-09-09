"use client";

import { addToCart } from "@/actions/cart-actions";
import CartIcon from "@/icons/cart";
import Spinner from "@/icons/spinner";
import { Product } from "@/lib/types";
import useCartStore from "@/stores/cart_store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function ProductCard({
  id,
  title,
  slug,
  imageUrl,
  price,
  category,
}: Product) {
  const { addProduct } = useCartStore();
  const [loading, setLoading] = useState(false);

  async function handleAddingToCart() {
    setLoading(true);
    const cartProduct = await addToCart(id);
    addProduct(cartProduct);
    setLoading(false);
    toast.info("Added to Cart!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      className: "rounded-none",
      closeButton: true,
      style: {
        background: "#d4af37",
      },
    });
  }

  return (
    <section className="w-full flex flex-col gap-3">
      <div>
        <Link
          href={`/shirts/${slug}`}
          className="block relative aspect-[3/4] overflow-hidden"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 1024px) 640px, 30vw"
          />
        </Link>
        <div className="flex mt-2 gap-1.5 flex-col px-2">
          {/* Product Name */}
          <div className="flex flex-row flex-nowrap justify-between items-center">
            <span className="my-0">
              <Link href={`/shirts/${slug}`}>{title}</Link>
            </span>
            {loading ? (
              <Spinner className="size-4 animate-spin" />
            ) : (
              <button onClick={handleAddingToCart}>
                <CartIcon className="cursor-pointer size-4" />
              </button>
            )}
          </div>

          {/* Product Type */}
          <div>
            <h2 className="text-sm text-slate-600">{category}</h2>
          </div>

          {/* Price + Color Options */}
          <div className=" flex flex-col gap-2 sm:flex-row sm:justify-between">
            {/* Price */}
            <p className="">Price from _</p>
            <span className="">${price}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
