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
      async authorize(credentials): Promise<User | null> {
        console.log(credentials?.email, "fssssssssss");
        return {
          name: "ariful",
          image: "https://example.com/image.png",
        };
      },
    }),
  ],
});
