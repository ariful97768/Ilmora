"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DynamicEnroll() {
  const session = useSession();
  return (
    <>
      {!session || session.status === "loading" ? (
        <div className="animate-spin border-3 rounded-full border-t-transparent h-5 w-5"></div>
      ) : session.status === "unauthenticated" ? (
        <Link href={"/login"} className="text-lg hover:underline font-bold">
          Enroll
        </Link>
      ) : (
        session.status === "authenticated" && (
          <Link
            href={"/dashboard/profile"}
            className="text-lg hover:underline font-bold"
          >
            Dashboard
          </Link>
        )
      )}
    </>
  );
}
