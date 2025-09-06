import NextAuth, { type User, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { createUser, verifySignin } from "./app/api/users/user/route";

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
              role: "student",
              image: null,
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
    async jwt({ token, user }) {
      if (user && user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role as string;
      if (token) session.user.id = token.id as string;

      return session;
    },
  },
});
