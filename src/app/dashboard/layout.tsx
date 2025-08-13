import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <>
      <Navbar />
      <div className="flex">
        <aside className="md:w-1/4 transform duration-500 border-r-4 px-3 h-screen">
          <Sidebar />
        </aside>
        <main className="px-5 bg-gray-100 w-full">
          <div>{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
