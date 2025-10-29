"use server";

import db from "@/database/mongodb";
import { ObjectId } from "mongodb";

export async function updateProfile(
  id: string,
  data: {
    name: string;
    phone: string;
    dateOfBirth: string;
    address: string;
  }
) {
  try {
    const [userInfo, studentInfo] = await Promise.all([
      db.users.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: data.name,
            updatedAt: new Date().toISOString(),
          },
        }
      ),
      db.students.updateOne(
        { userId: id },
        {
          $set: {
            address: data.address,
            phone: data.phone,
            dateOfBirth: data.dateOfBirth,
            updatedAt: new Date().toISOString(),
          },
        }
      ),
    ]);
    return { userInfo, studentInfo };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unknown error happened while updating your profile";
    return message;
  }
}
