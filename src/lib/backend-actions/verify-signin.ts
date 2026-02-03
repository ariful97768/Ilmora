import getDb from "@/database/mongodb";
import { UserFromDB } from "../types";
import bcrypt from "bcryptjs";

export default async function verifySignin(credentials: {
  email: string;
  password?: string;
  provider: "credentials" | "google" | "github" | "facebook";
}): Promise<
  { success: true; user: UserFromDB } | { success: false; message: string }
> {
  // Get database collections and check if user exist
  const db = await getDb();

  const userExist = await db.users.findOne({
    email: credentials.email,
  });

  // No user exists response
  if (!userExist) return { success: false, message: "User does not exist" };

  // Different provider response
  if (userExist.provider !== credentials.provider) {
    return {
      success: false,
      message: "Email is already used with another account",
    };
  }

  // No password provided response
  if (userExist.provider === "credentials" && !credentials.password) {
    return { success: false, message: "Password is required for verification" };
  }

  // Verify user credentials and return user data
  if (userExist.provider === "credentials" && credentials.password) {
    const isPasswordMatched = await bcrypt.compare(
      credentials.password,
      userExist.password,
    );
    if (!isPasswordMatched)
      return { success: false, message: "Wrong password" };

    return {
      success: true,
      user: {
        id: userExist._id.toString(),
        role: userExist.role,
        email: userExist.email,
        provider: userExist.provider,
        status: userExist.status,
        createdAt: userExist.createdAt,
        updatedAt: userExist.updatedAt,
      },
    };
  }
  // For non credentials signin such as OAuth sign in, we don't check password

  return {
    success: true,
    user: {
      id: userExist._id.toString(),
      role: userExist.role,
      email: userExist.email,
      provider: userExist.provider,
      status: userExist.status,
      createdAt: userExist.createdAt,
      updatedAt: userExist.updatedAt,
    },
  };
}
