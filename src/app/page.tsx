import Hero from "@/components/hero";
import ProductCard from "@/components/product_card";
import { shirts } from "@/lib/utils";
import React from "react";

function HomePage() {
  return (
    <main>
      <Hero />
      <section className="grid sm:grid-cols-3 gap-x-6 gap-y-10 px-4">
        {shirts.map(({ id, href, image, name, price, type }) => (
          <ProductCard
            key={id}
            href={href}
            image={image}
            name={name}
            price={price}
            type={type}
          />
        ))}
      </section>
    </main>
  );
}

export default HomePage;
