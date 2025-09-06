"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      });

      const data = await res.json();
      console.log("data:", data);

      if (!res.ok) {
        setError(
          data.generalError ||
            data.emailError ||
            data.passwordError ||
            "Signup failed"
        );
        return;
      }
    } catch (err: unknown) {
      console.log(err);
      setError("Something went wrong");
    }
  }

  return (
    <main className="flex flex-col items-center justify-start h-[calc(100vh-30vh)]">
      <h1 className="text-5xl font-bold headingFont mb-8 text-primary">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-xl">
        <input
          type="email"
          className=" placeholder:text-gray-700 text-gray-800 border border-gray-400 px-4 py-2 rounded"
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          className=" placeholder:text-gray-700 text-gray-800 border border-gray-400 px-4 py-2 rounded"
          placeholder="Password"
          name="password"
        />
        <p className="text-rose-600 text-sm text-start">{error}</p>

        <p>
          Don&apos;t have an account?{" "}
          <Link className="text-sky-600 underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <button className="rounded-full px-4 py-2 bg-secondary-foreground mt-6 hover:bg-secondary transition-all hover:text-white cursor-pointer">
          Sign In
        </button>
      </form>
    </main>
  );
}
