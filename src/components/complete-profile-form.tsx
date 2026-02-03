"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FieldValues, useForm } from "react-hook-form";
import { completeProfile } from "@/lib/frontend-actions/complete-profile";
import { NewFacultyInput, NewStudentInput } from "@/lib/types";
import { Session } from "next-auth";
import CompleteStudentProfile from "./forms/complete-student-profile";
import CompleteFacultyProfile from "./forms/complete-faculty-profile";
import { toast } from "sonner";
import { TWO_MB } from "@/lib/utils";
import { uploadImage } from "@/lib/frontend-actions/upload-image";
import { useRouter } from "next/navigation";

export function CompleteProfileForm({
  email,
  role,
  userId,
  update,
}: {
  update: (data?: string) => Promise<Session | null>;
  email: string;
  role: "Faculty" | "Student";
  userId: string;
}) {
  const hookFormProps = useForm();
  const router = useRouter();

  async function handleFormSubmit(e: FieldValues) {
    const image = e.image;
    if (image.size > TWO_MB) {
      throw new Error(`Image size must be less then ${TWO_MB}MB`);
    }

    if (
      image.type !== "image/jpeg" &&
      image.type !== "image/png" &&
      image.type !== "image/jpg"
    ) {
      throw new Error("Image must be jpg, jpeg or png");
    }

    // toast.promise is an asynchronous toaster that allows showing pending toast message
    const imageResult = await toast
      .promise(uploadImage(image), {
        loading: "Uploading image...",
        success: (data) => {
          if (!data.success) throw new Error(data.message);
          return data.message;
        },
        error: (error) => {
          return error.message;
        },
      })
      .unwrap();
    if (!imageResult?.data) return toast.error("Failed to upload image");
    let result;

    // Proceed to create faculty profile if role is Faculty
    if (role === "Faculty") {
      const facultyProfile: NewFacultyInput = {
        userId,
        name: e.name,
        email,
        about: e.about,
        address: e.address,
        phone: e.phoneNumber,
        gender: e.gender,
        dateOfBirth: new Date(e.dateOfBirth).toISOString(),
        image: imageResult.data.url,
        department: e.department,
        education: {
          university: e.university,
          degree: e.degree,
          startDate: new Date(e.startDate).toISOString(),
          endDate: new Date(e.endDate).toISOString(),
        },
        joiningDate: new Date(e.joiningDate).toISOString(),
      };

      result = await toast
        .promise(
          completeProfile({
            data: facultyProfile,
            role: "Faculty",
          }),
          {
            loading: "Creating profile...",
            success: (data) => {
              // console.log(data);
              if (!data.success) throw new Error(data.message);
              return data.message;
            },
            error: (error) => {
              return error.message;
            },
          },
        )
        .unwrap();
    }

    // Proceed to create student profile if role is Student
    if (role === "Student") {
      const studentProfile: NewStudentInput = {
        userId,
        name: e.name,
        email,
        address: e.address,
        phone: e.phoneNumber,
        gender: e.gender,
        dateOfBirth: new Date(e.dateOfBirth).toISOString(),
        image: imageResult.data.url,
        department: e.department,
      };

      result = await toast
        .promise(
          completeProfile({
            data: studentProfile,
            role: "Student",
          }),
          {
            loading: "Creating profile...",
            success: (data) => {
              // console.log(data);
              if (!data.success) throw new Error(data.message);
              return data.message;
            },
            error: (error) => {
              return error.message;
            },
          },
        )
        .unwrap();
    }

    if (result?.success) {
      await update("status");
      router.push("/dashboard");
    }
  }

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-6 w-full md:p-8">
          <form onSubmit={hookFormProps.handleSubmit(handleFormSubmit)}>
            {role === "Faculty" && (
              <CompleteFacultyProfile
                {...hookFormProps}
                email={email}
                role={role}
                userId={userId}
                update={update}
              />
            )}
            {role === "Student" && (
              <CompleteStudentProfile
                {...hookFormProps}
                email={email}
                role={role}
                userId={userId}
                update={update}
              />
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
