import { NewUserInput, InsertUserOnDB, UserFromDB } from "../types";
import getDb from "@/database/mongodb";
import bcrypt from "bcryptjs";
export default async function createUser(
  data: NewUserInput
): Promise<
  { success: true; user: UserFromDB } | { success: false; message: string }
> {
  // check for required fields such as email and password
  if (!data.email) {
    return { success: false, message: "Email is required but, missing here" };
  }
  if (data.provider === "credentials" && !data.password) {
    return {
      success: false,
      message: "Password is required but, missing here",
    };
  }
  if (data.role !== "Faculty" && data.role !== "Student") {
    return {
      success: false,
      message: "Only Student and Faculty signin is allowed",
    };
  }
  // get database connection
  const db = await getDb();

  // Check if user already exists
  const isExist = await db.users.findOne({ email: data.email });

  if (isExist) {
    return { success: false, message: "Email is already used with another account" };
  }

  let user: InsertUserOnDB;

  if (data.provider === "credentials") {
    // Hash password using bcrypt
    const rawPassword = data.password;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    user = {
      email: data.email,
      password: hashedPassword,
      role: data.role,
      provider: data.provider,
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } else {
    // If data.provider isn't "credentials" then we don't store password
    user = {
      email: data.email,
      role: data.role,
      provider: data.provider,
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const result = await db.users.insertOne(user);

  // Send user data with success message if inserted successfully
  if (result.acknowledged) {
    return {
      success: true,
      user: {
        id: result.insertedId.toString(),
        email: user.email,
        role: user.role,
        provider: user.provider,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
  // In case if user creation fails
  return { success: false, message: "Failed to create user" };
}
