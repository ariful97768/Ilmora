import db from "@/database/mongodb";

export default async function getAllUsers({
  usersType,
  email,
}: {
  usersType?: "user" | "student" | "faculty" | "admin";
  email: string;
}) {
  if (!email) throw new Error("Requested user's email is not provided");

  const isAdmin = await db.users.findOne({
    email,
    role: "admin",
    isActive: true,
  });
  if (!isAdmin) throw new Error("User does not have access to this resources");

  const result = await db.users
    .find({ role: usersType ? usersType : { $exists: true } }) 
    .toArray();
  return result;
}
