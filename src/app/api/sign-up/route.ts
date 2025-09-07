import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export interface SignUpResponseI {
  success: boolean;
  nameError?: string;
  emailError?: string;
  passwordError?: string;
  generalError?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          nameError: z.flattenError(parsed.error).fieldErrors.name,
          emailError: z.flattenError(parsed.error).fieldErrors.email,
          passwordError: z.flattenError(parsed.error).fieldErrors.password,
        },
        { status: 400 }
      );
    }

    // Call Better Auth sign-up
    const betterAuthResponse = await auth.api.signUpEmail({
      body: {
        email: parsed.data.email,
        name: parsed.data.name,
        password: parsed.data.password,
        callbackURL: "/",
      },
      headers: await headers(),
      returnHeaders: true,
      asResponse: true,
    });

    if (!betterAuthResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          generalError: (await betterAuthResponse.json()).message,
        },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });
    betterAuthResponse.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    console.log("✅ User signed up");
    return response;
  } catch (error: unknown) {
    console.error("❌ Signup error:", error);
    return NextResponse.json(
      {
        success: false,
        generalError:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
