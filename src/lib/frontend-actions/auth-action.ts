"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";

type AuthState = {
  error?: string;
  success?: boolean;
};

type AuthProps = {
  action: "register" | "signin";
} & (
  | {
      method: "credentials";
      formData: {
        email: string;
        password: string;
        signinAs: "student" | "faculty";
      };
    }
  | {
      method: "google" | "facebook" | "github";
      formData: { signinAs: "student" | "faculty" };
    }
);

export async function authenticate({
  method,
  formData,
  action,
}: AuthProps): Promise<AuthState> {
  // Get the Role from the form data

  const role = formData.signinAs;
  if (!role)
    return {
      error: "Role is required",
      success: false,
    };

  try {
    // Sign in user using credentials method. Password is accessible only if the method is credentials.
    if (method === "credentials") {
      const email = formData.email;
      const password = formData.password;
      if (!email || !password) {
        return {
          error: "Email and Password is required for credentials method",
          success: false,
        };
      }

      // Successful signin will redirect to the provided url
      await signIn("credentials", {
        email: email,
        password: password,
        action: action,
        signinAs: role,
        redirect: true,
        redirectTo: "/dashboard/profile",
      });
    }

    // In other case such as google, facebook or github, OAuth will handle the credentials
    if (method === "google" || method === "facebook" || method === "github") {
      // we can't send additional props to OAuth signin method. But as must have to pass the signinAs props, we store it in the cookies.
      // And then the next step is to access the cookie on the signin callback
      (await cookies()).set("signinAs", role, {
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });
      await signIn(method, { redirectTo: "/dashboard/profile" });
    }

    // Signin will fail if different method is used
    return {
      error:
        "Signin method is not allowed. Allowed methods: credentials, google, facebook and github.",
      success: false,
    };
  } catch (err) {
    // CRUCIAL: By default next.js throws an redirect error whenever redirect happens.
    // During the signin call, Auth.js redirects the user to signin providers callback url.
    // So we must throw the error again if it is a next.js redirect error so that next.js can handle the redirect.
    if (isRedirectError(err)) {
      throw err;
    }

    // console.log("error from auth-action", err);

    // Error message provided by next-auth
    if (err instanceof AuthError) {
      // This catches any error message thrown from signin's authorize function
      const customMessage = err.cause?.err?.message;

      switch (err.type) {
        case "CredentialsSignin":
          return {
            error: customMessage || "Invalid credentials provided",
            success: false,
          };
        case "CallbackRouteError":
          return {
            error:
              customMessage || "There was a problem with the login provider",
            success: false,
          };
        default:
          return {
            error: customMessage || "Something went wrong, Please try again!",
            success: false,
          };
      }
    } else {
      // Non Auth Errors will caught here
      // console.error("Non-Auth Error:", err);
      return { error: "An unexpected error occurred.", success: false };
    }
  }
}
