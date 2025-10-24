import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session || !session?.user) redirect("/login");
  return (
    <main className="flex">
      <Sidebar session={session} />
      <div className="w-full">
        <Navbar />
        <div className="flex">
          <main className="px-5 bg-gray-100 w-full">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
