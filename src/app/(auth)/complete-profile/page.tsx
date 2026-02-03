"use client";

import { CompleteProfileForm } from "@/components/complete-profile-form";
import LoadingUi from "@/components/loading-ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") return router.push("/login");
  if (session.status === "loading") {
    return <LoadingUi />;
  }
  if (!session || !session?.data?.user.email || !session?.data?.user.id) {
    return router.push("/login");
  }
  if (session?.data?.user.status === "Active") {
    return router.push("/dashboard/profile");
  }
  if (session?.data?.user.status === "Inactive") {
    return router.push("/inactive");
  }
  // console.log(session);
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <p onClick={() => session.update("role")}>{session.data.user.role}</p>
        <CompleteProfileForm
          role={session?.data?.user.role as "Faculty" | "Student"} // Added implicit types because roles are strictly checked inside the component
          email={session?.data?.user.email}
          userId={session?.data?.user.id}
          update={session.update}
        />
      </div>
    </div>
  );
}
