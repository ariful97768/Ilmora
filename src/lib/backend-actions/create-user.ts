import db from "@/app/database/mongodb";
import { CreateUserInput, InsertUserOnDB, UserResponse } from "../types";

export default async function createUser(data: CreateUserInput): Promise<UserResponse> {
  if (!data.name || !data.email) {
    throw new Error(
      "Missing required fields. Required: name, email, password."
    );
  }
  if (data.provider === "credentials" && !data.password) {
    throw new Error("Password is missing for credentials sign in.");
  }

  const isExist = await db.users.findOne({ email: data.email });

  if (isExist) {
    throw new Error("User already exits.");
  }

  let user: InsertUserOnDB;
  if (data.provider === "credentials") {
    user = {
      name: data.name,
      email: data.email,
      image: data.image || null,
      role: "user",
      provider: data.provider,
      password: data.password,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } else {
    user = {
      name: data.name,
      email: data.email,
      image: data.image || null,
      role: "user",
      provider: data.provider,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const result = await db.users.insertOne(user);

  if (result.acknowledged) {
    return {
      success: true,
      message: "User created successfully",
      data: {
        id: result.insertedId.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        provider: user.provider,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
  throw new Error("Failed to create user.");
}
