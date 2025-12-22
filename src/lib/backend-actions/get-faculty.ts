import { auth } from "@/auth";
import db from "@/database/mongodb";
import { ObjectId } from "mongodb";

export async function getAllFaculty({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) {
  const session = await auth();
  if (!session) {
    return null;
  }

  const faculties = await db.faculties.find().limit(limit).skip(skip).toArray();

  return faculties;
}

export async function getFacultyById({ id }: { id: string }) {
  const session = await auth();
  if (!session) {
    return null;
  }

  const faculty = await db.faculties.findOne({ _id: new ObjectId(id) });

  return faculty;
}
