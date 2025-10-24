import db from "@/database/mongodb";
import { UserResponse } from "../types";

export default async function verifySignin(credentials: {
  email: string;
  password?: string;
}): Promise<UserResponse> {

  const userExist = await db.users.findOne({
    email: credentials.email,
  });

  if (!userExist) throw new Error("User does not exist.");

  if (userExist.provider === "credentials" && !credentials.password) {
    throw new Error("Password required for verification.");
  }

  if (
    userExist.provider === "credentials" &&
    userExist.password !== credentials.password
  ) {
    throw new Error("Wrong password.");
  }

  return {
    success: true,
    message: "User verification successful.",
    data: {
      id: userExist._id.toString(),
      role: userExist.role,
      name: userExist.name,
      email: userExist.email,
      image: userExist.image,
      provider: userExist.provider,
      isActive: userExist.isActive,
      createdAt: userExist.createdAt,
      updatedAt: userExist.updatedAt,
    },
  };
}