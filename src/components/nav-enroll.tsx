"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DynamicEnroll() {
  const session = useSession();
  return (
    <>
      {session && session.data?.user ? (
        <Link
          href={"/dashboard/profile"}
          className="text-lg hover:underline font-bold"
        >
          Dashboard
        </Link>
      ) : (
        <Link href={"/login"} className="text-lg hover:underline font-bold">
          Enroll
        </Link>
      )}
    </>
  );
}
