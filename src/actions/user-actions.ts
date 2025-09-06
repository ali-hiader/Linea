"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as z from "zod";

const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

interface SignUpState {
  success: boolean;
  emailError?: string[];
  passwordError?: string[];
  generalError?: string;
}

export async function signUp(
  prevState: SignUpState | null,
  formData: FormData
): Promise<SignUpState> {
  try {
    const userData = Object.fromEntries(formData.entries());
    const parsedData = signUpSchema.safeParse(userData);

    if (!parsedData.success) {
      return {
        success: false,
        emailError: z.flattenError(parsedData.error).fieldErrors.email,
        passwordError: z.flattenError(parsedData.error).fieldErrors.password,
      };
    }

    const response = await auth.api.signUpEmail({
      body: {
        email: parsedData.data.email,
        name: parsedData.data.name,
        password: parsedData.data.password,
        callbackURL: "/",
      },
      returnHeaders: true,
    });

    if (!response.response.user) {
      return {
        success: false,
        generalError: "Could not create account. Please try again.",
      };
    }

    console.log("✅ User signed up:");
    return { success: true };
  } catch (error: unknown) {
    // Type-safe error handling
    if (error instanceof Error) {
      console.error("❌ Signup error:", error.message);
      return { success: false, generalError: error.message };
    }

    console.error("❌ Unknown signup error:", error);
    return { success: false, generalError: "Something went wrong" };
  }
}

// Sign In

const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

interface SignInState {
  success: boolean;
  emailError?: string[];
  passwordError?: string[];
  generalError?: string;
}

export async function signIn(
  prevState: SignInState | null,
  formData: FormData
): Promise<SignInState> {
  try {
    const userData = Object.fromEntries(formData.entries());
    const parsedData = signInSchema.safeParse(userData);

    if (!parsedData.success) {
      return {
        success: false,
        emailError: z.flattenError(parsedData.error).fieldErrors.email,
        passwordError: z.flattenError(parsedData.error).fieldErrors.password,
      };
    }

    const { user, token } = await auth.api.signInEmail({
      body: {
        email: parsedData.data.email,
        password: parsedData.data.password,
        callbackURL: "/",
      },

      headers: await headers(),
    });

    if (!user) {
      return {
        success: false,
        generalError: "Invalid credentials. Please try again.",
      };
    }

    console.log("✅ User signed in:", user, token);

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Signin error:", error.message);
      return { success: false, generalError: error.message };
    }

    console.error("❌ Unknown signin error:", error);
    return { success: false, generalError: "Something went wrong" };
  }
}
