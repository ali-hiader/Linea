import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Session } from "better-auth";

const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be atleaset 6 chracters long." }),
});

export interface SignInResponseI {
  success: boolean;
  session: Session | null;
  emailError?: string;
  passwordError?: string;
  generalError?: string;
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      return NextResponse.json({ success: true, session }, { status: 200 });
    }

    const body = await req.json();
    const parsedData = signInSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          session: null,
          emailError: z.flattenError(parsedData.error).fieldErrors.email,
          passwordError: z.flattenError(parsedData.error).fieldErrors.password,
        },
        { status: 400 }
      );
    }

    const signInResponse = await auth.api.signInEmail({
      body: {
        email: parsedData.data.email,
        password: parsedData.data.password,
        callbackURL: "/",
      },
      headers: await headers(),
      returnHeaders: true,
      asResponse: true,
    });

    if (!signInResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          session: null,
          generalError: "Invalid credentials. Please try again.",
        },
        { status: 401 }
      );
    }
    const betterAuthResponse: Response = await signInResponse.json();

    const response = NextResponse.json(
      { success: true, session: betterAuthResponse },
      { status: 200 }
    );

    signInResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        response.headers.append("set-cookie", value);
      }
    });

    console.log("✅ User signed In");
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Signin error:", error.message);
      return NextResponse.json(
        { success: false, generalError: error.message },
        { status: 500 }
      );
    }

    console.error("❌ Unknown signin error:", error);
    return NextResponse.json(
      { success: false, generalError: "Something went wrong" },
      { status: 500 }
    );
  }
}
