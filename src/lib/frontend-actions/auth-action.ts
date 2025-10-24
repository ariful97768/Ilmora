"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

type AuthState = {
  error?: string;
  success?: boolean;
};

export async function authenticate(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    redirect("/dashboard/profile");
  } catch (err) {
    console.log("error from auth-action", err);
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials provided", success: false };
        case "CallbackRouteError":
          return { error: "Callback route error", success: false };
        default:
          return { error: `Authentication error: ${err.type}`, success: false };
      }
    }
    throw err;
  }
}
