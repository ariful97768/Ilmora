import NextAuth, { type User, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import createUser from "./lib/backend-actions/create-user";
import verifySignin from "./lib/backend-actions/verify-signin";
import { cookies } from "next/headers";
import { oAuthSignin } from "./lib/backend-actions/oauth-user-signin";
import { getUserRole, getUserStatus } from "./lib/utils/helper-functions";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
      status: "Pending" | "Active" | "Inactive";
      lastChecked: number;
    } & DefaultSession["user"];
  }
  interface User {
    id?: string;
    role?: "Faculty" | "Admin" | "Student";
    status: "Pending" | "Active" | "Inactive";
    lastChecked: number;
    createdAt?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    Github,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", name: "email", type: "email" },
        password: { label: "Password", name: "password", type: "password" },
        action: { label: "Action", type: "text" },
        signinAs: { label: "Signin As", name: "signinAs", type: "text" },
      },

      async authorize(credentials): Promise<User | null> {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and Password is required but missing here");
        }
        // console.log("Credentials form auth.ts: ", credentials);
        try {
          // insert user to database if action equals register
          if (credentials.action === "register") {
            const result = await createUser({
              email: credentials.email as string,
              password: credentials.password as string,
              role: credentials.signinAs as "Student" | "Faculty",
              provider: "credentials",
            });

            // If user creation fails by some reason then we throw the error returned by the createUser function
            if (!result.success) throw new Error(result.message);

            return {
              id: result.user.id,
              email: result.user.email,
              role: result.user.role,
              status: result.user.status,
              lastChecked: Date.now(),
              createdAt: new Date().toISOString(),
            };
          }

          // This section is for credentials log in
          // If action === "signin" then this block gets executed
          const result = await verifySignin({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (!result.success) throw new Error(result.message);

          return {
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
            status: result.user.status,
            lastChecked: Date.now(),
            createdAt: new Date().toISOString(),
          };
        } catch (err) {
          // console.error("Error in authorize:", err);
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("[user console form signIn:] ", user);
      try {
        if (account?.provider !== "credentials") {
          // "signinAs" props was passed to cookies from auth-action.ts as we can't send additional props to OAuth methods
          // We must get the value from cookies before inserting the user data
          let signinAs = (await cookies()).get("signinAs")?.value as
            | "Student"
            | "Faculty";

          // Set default role as Student if we don't get the role from cookie
          if (signinAs !== "Student" && signinAs !== "Faculty")
            signinAs = "Student";

          const email = user.email || profile?.email;
          if (!email) return false;

          // Proceed to next step only if provider is google or facebook
          if (
            account?.provider === "google" ||
            account?.provider === "facebook"
          ) {
            const result = await oAuthSignin({
              email,
              provider: account.provider,
              role: signinAs,
            });
            if (!result.success) return false;
            user.id = result.user.id;
            user.email = result.user.email;
            user.role = result.user.role;
            user.createdAt = result.user.createdAt;
            user.status = result.user.status;
            user.lastChecked = Date.now();
          }
        }
      } catch (error) {
        // console.error("Error in signIn callback:", error);
        return false;
      }
      // Credentials method also calls signIn() function, and in that case we just return true so that we don't counter any auth failure.
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.status = user.status;
        token.lastChecked = Date.now();
        token.createdAt = user.createdAt;
      }

      const now = Date.now();
      const TEN_MINUTES = 10 * 60 * 1000; // ten minutes
      // client can send any data using the session update method. we must use data retrieved from database only
      if (trigger === "update" && session === "status" && token.email) {
        const status = await getUserStatus({ email: token.email });
        if (status) {
          token.status = status;
          token.lastChecked = now;
        }
      }

      if (trigger === "update" && session === "role" && token.email) {
        const role = await getUserRole({ email: token.email });
        if (role) {
          token.role = role;
          token.lastChecked = now;
        }
      }

      // I'm using JWT session strategy here and as an admin I can't change a user's token.
      // Therefore this periodic check is implemented to check user's status, and a 10 minute delay wouldn't cost much security threat.
      // checks status periodically after 10 minutes
      if (now - (token.lastChecked as number) > TEN_MINUTES && token.email) {
        const status = await getUserStatus({ email: token.email });
        if (status) {
          token.status = status;
          token.lastChecked = now;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as "Student" | "Faculty" | "Admin";
        session.user.status = token.status as "Pending" | "Active" | "Inactive";
        session.user.lastChecked = token.lastChecked as number;
        session.user.createdAt = token.createdAt as string;
      }

      return session;
    },
  },
});
