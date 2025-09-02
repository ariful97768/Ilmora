import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", name: "email", type: "email" },
        password: {},
      },
      async authorize(): Promise<User | null> {
        return {
          name: "ariful",
          image: "https://lh3.googleusercontent.com/a/ACg8ocK4LArs19HD4bbE_9ocQZs30q92nDI0IWHQCba2ZypUlCvX0fc=s96-c",
        };
      },
    }),
  ],
});
