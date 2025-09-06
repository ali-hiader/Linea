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

  return <div>UserAccountPage</div>;
}

export default UserAccountPage;
