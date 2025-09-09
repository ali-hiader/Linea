import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function UserAccountPage() {
  const incomingHeaders = new Headers(await headers());
  const session = await auth.api.getSession({
    headers: incomingHeaders,
  });

  console.log(session);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="px-4 sm:px-[5%]">
      <h1 className="relative w-fit headingFont text-4xl md:text-7xl text-gray-900 font-bold">
        Account
      </h1>
    </main>
  );
}

export default UserAccountPage;
