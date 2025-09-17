import NextAuth, { type User, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import db from "./app/database/mongodb";
import { InsertUserOnDB } from "./lib/types";
import createUser from "./lib/backend-actions/create-user";
import verifySignin from "./lib/backend-actions/verify-signin";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }
  interface User {
    id?: string;
    role?: string;
    createdAt?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "Name", name: "name", type: "text" },
        email: { label: "Email", name: "email", type: "email" },
        password: { label: "Password", name: "password", type: "password" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials): Promise<(User & { role: string }) | null> {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        try {
          if (credentials.action === "register" && credentials.name) {
            const user = await createUser({
              name: credentials.name as string,
              email: credentials.email as string,
              password: credentials.password as string,
              role: "user",
              image: null,
              provider: "credentials",
            });

            return {
              id: user.data.id,
              name: user.data.name,
              email: user.data.email,
              image: user.data.image,
              role: user.data.role,
            };
          }
          const user = await verifySignin({
            email: credentials.email as string,
            password: credentials.password as string,
          });
          return {
            id: user.data.id,
            name: user.data.name,
            email: user.data.email,
            image: user.data.image,
            role: user.data.role,
          };
        } catch (err) {
          console.error("Error in authorize:", err);
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        const email = user.email || profile?.email;
        if (!email) {
          throw new Error(
            "No email found from the provider. Please ty using a new method."
          );
        }

        const existingUser = await db.users.findOne({ email });
        if (existingUser) {
          user.id = existingUser._id.toString();
          user.name = existingUser.name;
          user.email = existingUser.email;
          user.image = existingUser.image;
          user.role = existingUser.role;
          user.createdAt = existingUser.createdAt;
          return true;
        }

        if (
          account?.provider === "google" ||
          account?.provider === "facebook"
        ) {
          const newUser: InsertUserOnDB = {
            email: email,
            name: user.name || profile?.name || "Not provided",
            image: user.image || profile?.picture,
            role: "user",
            isActive: true,
            provider: account?.provider,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          const userData = (await createUser(newUser)).data;

          user.id = userData.id;
          user.name = userData.name;
          user.email = userData.email;
          user.image = userData.image;
          user.role = userData.role;
          user.createdAt = userData.createdAt;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user && user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.role = token.role as string;
        session.user.createdAt = token.createdAt as string;
      }

      return session;
    },
  },
});
