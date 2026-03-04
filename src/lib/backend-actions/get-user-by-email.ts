import db from "@/database/mongodb";
import { StudentResponse, UserResponse } from "../types";

export async function getUserByEmail(
  email: string,
  findUser?: "User" | "Student" | "Faculty" | "Admin"
): Promise<UserResponse | StudentResponse | void> {
  if (!email) throw new Error("Email not provided.");

  if (!findUser) {
    const user = await db.users.findOne({ email });
    console.log(user, "user data getEmail");
    if (!user) throw new Error("User does not exist.");
    return {
      success: true,
      message: "User data found successfully.",
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        isActive: user.isActive,
        provider: user.provider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    } satisfies UserResponse;
  }

  // if (findUser === "student") {
  //   const student = await db.users.findOne({ email, role: "student" });
  //   if (!student) throw new Error("Student does not exist.");
  //   return {
  //     success: true,
  //     message: "Student data found successfully.",
  //     data: {
  //       id: student._id.toString(),
  //       ...student,
  //     },
  //   }; // satisfies StudentResponse
  // }

  // if (findUser === "faculty") {
  //   const faculty = await db.users.findOne({ email, role: "faculty" });
  //   if (!faculty) throw new Error("Faculty does not exist.");
  //   return {
  //     success: true,
  //     message: "Faculty data found successfully.",
  //     data: {
  //       id: faculty._id.toString(),
  //       ...faculty,
  //     },
  //   };
  // }

  // if (findUser === "admin") {
  //   const admin = await db.users.findOne({ email, role: "admin" });
  //   if (!admin) throw new Error("Admin does not exist.");
  //   return {
  //     success: true,
  //     message: "Admin data found successfully.",
  //     data: {
  //       id: admin._id.toString(),
  //       ...admin,
  //     },
  //   };
  // }
}
