"use server";
import getDb from "@/database/mongodb";
import { InsertUserOnDB, UserFromDB } from "../types";

export async function oAuthSignin({
  email,
  provider,
  role,
}: {
  email: string;
  provider: "google" | "facebook" | "github";
  role: "Student" | "Faculty";
}): Promise<
  { success: true; user: UserFromDB } | { success: false; message: string }
> {
  if (!email) {
    return { success: false, message: "Email is required but missing here" };
  }

  try {
    const { users } = await getDb();

    const existingUser = await users.findOne({ email });
    // console.log(existingUser);
    // console.log("oauth login called");

    // If user is already created return the user data
    if (existingUser) {
      return {
        success: true,
        user: {
          id: existingUser._id.toString(),
          createdAt: existingUser.createdAt,
          email: existingUser.email,
          provider: existingUser.provider,
          role: existingUser.role,
          status: existingUser.status,
          updatedAt: existingUser.updatedAt,
        },
      };
    }
    // console.log("oauth register called");

    // If user does not exist then we proceed to create a new user
    // But before that we must verify that only faculty or student is sent as role
    if (role !== "Faculty" && role !== "Student") {
      return {
        success: false,
        message: "Only Student and Faculty signin is allowed",
      };
    }
    // Create user object before inserting to database
    const userData: InsertUserOnDB = {
      email,
      provider,
      role,
      status: "Pending" as "Pending" | "Active" | "Inactive",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert user on database
    const newUser = await users.insertOne(userData);

    // If user doesn't exists then create a new user and send the data
    if (newUser.insertedId) {
      return {
        success: true,
        user: {
          id: newUser.insertedId.toString(),
          createdAt: userData.createdAt,
          email: userData.email,
          provider: userData.provider,
          role: userData.role,
          status: userData.status,
          updatedAt: userData.updatedAt,
        },
      };
    }

    // If database fails to create user
    return {
      success: false,
      message: "Failed to create user data",
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong";

    return {
      success: false,
      message: msg,
    };
  }
}
