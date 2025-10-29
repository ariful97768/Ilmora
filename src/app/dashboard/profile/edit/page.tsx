"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import UpdateImage from "./image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ApiResponse, StudentProfile } from "@/lib/types";
import { updateProfile } from "@/lib/backend-actions/form-actions";

export default function EditProfile() {
  const session = useSession();
  const [data, setData] = useState<StudentProfile>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session.status === "loading") return;
    if (session.status === "unauthenticated") {
      return redirect("/login");
    }
    if (!session.data?.user.id) return;

    async function fetchData(id: string) {
      try {
        const studentRes = await fetch(
          `/api/students/profile?student-id=${id}`
        );

        if (!studentRes.ok)
          throw new Error(
            "Failed to fill inputs. No worries, you can still update your profile."
          );

        const studentData: ApiResponse<StudentProfile> =
          await studentRes.json();

        setData(studentData.data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unknown error happened while getting you information. No worries, you can still update you information.";

        Swal.fire(message, "error");
      }
    }
    fetchData(session.data?.user.id);
  }, [session.status, session.data?.user.id]);

  async function handleUpdate(form: FormData) {
    const name = form.get("name")?.toString() || data?.name || "";
    const phone = form.get("phoneNumber")?.toString() || data?.phone || "";
    const address = form.get("address")?.toString() || data?.address || "";
    const dateOfBirth =
      form.get("dateOfBirth")?.toString() || data?.dateOfBirth || "";
    const formData = { name, phone, address, dateOfBirth };
    setIsLoading(true);
    try {
      await updateProfile(session.data?.user.id as string, formData);
     await session.update({
        ...session.data,
        user: {
          name,
        },
      });
      Swal.fire({ text: "Your profile updated successfully", icon: "success" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error happened while updating your profile";
      Swal.fire({ text: message, icon: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form action={handleUpdate} className="py-10">
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-md w-full max-w-[300px] min-w-[200px] ">
            <div>
              <UpdateImage image={data?.image} />
            </div>
            <div className="space-y-3 mt-3 w-full   ">
              <h2 className="text-lg  mt-3">
                <span className="font-semibold">Name</span>:{" "}
                {data?.name || "Not found"}
              </h2>
              <hr />
              <h3>
                <span className="font-semibold">Department</span>:{" "}
                {data?.department || "Not found"}
              </h3>
              <hr />
              <h3>
                <span className="font-semibold">Semester</span>:{" "}
                {data?.currentSemester || "Not found"}
              </h3>
              <hr />
              <h3>
                <span className="font-semibold">Admitted</span>:{" "}
                {data?.admissionDate
                  ? `${new Date(data?.admissionDate)
                      .toDateString()
                      .split(" ")
                      .slice(1)
                      .join(" ")}`
                  : "Not found"}
              </h3>
              <hr />
            </div>
          </div>

          <div className="space-y-5 w-full bg-white p-5 rounded-md">
            <div>
              <h3 className="font-semibold pb-5 border-b border-b-gray-300">
                Account Setup
              </h3>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="name" className="text-sm text-indigo-600">
                  Name<span className="text-red-600">*</span>
                </label>
                <input
                  required
                  className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  placeholder="John Doe"
                  type="text"
                  defaultValue={data?.name}
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm text-indigo-600"
                >
                  Phone Number<span className="text-red-600">*</span>
                </label>
                <input
                  required
                  className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  placeholder="+123 456-7890"
                  type="tel"
                  defaultValue={data?.phone}
                  name="phoneNumber"
                  id="phoneNumber"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col w-full space-y-2">
                <label
                  htmlFor="dateOfBirth"
                  className="text-sm text-indigo-600"
                >
                  Date of birth<span className="text-red-600">*</span>
                </label>
                <input
                  required
                  max={new Date().toISOString().split("T")[0]}
                  className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  placeholder="Last name"
                  type="date"
                  defaultValue={data?.dateOfBirth}
                  name="dateOfBirth"
                  id="dateOfBirth"
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="address" className="text-sm text-indigo-600">
                  Address<span className="text-red-600">*</span>
                </label>
                <input
                  required
                  className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  placeholder="New Street, Old York"
                  defaultValue={data?.address}
                  name="address"
                  id="address"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button disabled={isLoading} className="mt-3" variant={"primary"}>
                {isLoading ? "Updating" : "Update"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
