import { auth } from "@/auth";
import { ReactNode } from "react";

export default async function AdminRoutes({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (session?.user.role !== "admin") throw new Error("You are not authorized to access this page");

  return children;
}
