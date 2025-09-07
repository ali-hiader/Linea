import Hero from "@/components/hero";
import ProductCard from "@/components/product_card";
import React from "react";
import { db } from "..";
import { shirtsTable } from "@/db/schema";
import { ToastContainer } from "react-toastify";

async function HomePage() {
  const shirts = await db.select().from(shirtsTable);

  return (
    <main>
      <Hero itemsOnPage={shirts.length} />
      <section className="grid sm:grid-cols-3 gap-x-6 gap-y-10 px-4 mb-12">
        {shirts.map((shirt) => (
          <ProductCard key={shirt.id} {...shirt} />
        ))}
      </section>
      <ToastContainer />
    </main>
  );
}

export default HomePage;
