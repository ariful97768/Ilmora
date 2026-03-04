import getDb from "@/database/mongodb";
export default async function getAllUsers({
  usersType,
  email,
}: {
  usersType?: "Student" | "Faculty";
  email: string;
}) {
  if (!email) throw new Error("Requested user's email is not provided");
  // Retrieve all user if admin is valid and user role is provided. 
  const db = await getDb();
  const isAdmin = await db.admins.findOne({
    email,
    role: "Admin",
    isActive: true,
  });
  if (!isAdmin) throw new Error("User does not have access to this resources");
  
  // Add pagination rate limiting 
  const result = await db.users
    .find({ role: usersType ? usersType : { $exists: true } })
    .toArray();
  return result;
}
