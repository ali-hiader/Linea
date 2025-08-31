"use client";

import CartIcon from "@/icons/cart";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  href: string;
  image: string;
  price: string;
  type: string;
}

export default function ProductCard({
  name,
  href,
  image,
  price,
  type,
}: ProductCardProps) {
  return (
    <section className="w-full flex flex-col gap-3">
      <div>
        <Link
          href={href}
          className="block relative aspect-[3/4] overflow-hidden"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 1024px) 640px, 30vw"
          />
        </Link>
        <div className="flex mt-2 gap-1.5 flex-col px-2">
          {/* Product Name */}
          <div className="flex flex-row flex-nowrap justify-between items-center">
            <span className="my-0">
              <Link href={href}>{name}</Link>
            </span>

            <CartIcon className="cursor-pointer" />
          </div>

          {/* Product Type */}
          <div>
            <h2 className="text-sm text-slate-600">{type}</h2>
          </div>

          {/* Price + Color Options */}
          <div className=" flex flex-col gap-2 sm:flex-row sm:justify-between">
            {/* Price */}
            <p className="">Price from _</p>
            <span className="">{price}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
