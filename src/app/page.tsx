import Hero from "@/components/hero";
import React from "react";
import { db } from "..";
import { shirtsTable } from "@/db/schema";
import { ToastContainer } from "react-toastify";
import Shirts from "@/components/shirts";

async function HomePage() {
  const shirts = await db.select().from(shirtsTable);
  return (
    <main>
      <Hero initialShirts={shirts} />
      <Shirts initialShirts={shirts} />
      <ToastContainer />
    </main>
  );
}

export default HomePage;
