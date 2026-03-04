"use client";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { NewFacultyInput } from "@/lib/types";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Calendar22 } from "@/components/select-calender-date";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import ProfileImage from "@/components/profileImage";

export default function AddFaculty() {
  const session = useSession();

  useEffect(() => {
    if (session.status === "loading" || session.status === "authenticated")
      return;
    if (session.status === "unauthenticated") {
      redirect("/login");
    }
  }, [session.status]);

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function handleFormSubmit(data: FieldValues) {
    const email = data.email;
    const regex = RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
    // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
      Swal.fire({
        icon: "error",
        text: "Invalid email address.",
      });
      return;
    }
    console.log({
      ...data,
      joiningDate: new Date(data.joiningDate).toUTCString(),
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    });

    // Check if user id is available on the auth session
    if (!session.data?.user.id) {
      Swal.fire({
        icon: "error",
        text: "User not found.",
      });
      return;
    }

    const faculty: NewFacultyInput = {
      userId: session.data?.user.id,
      name: data.name,
      gender: data.gender,
      image: data.image,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      address: data.address,
      email: data.email,
      phone: data.phoneNumber,
      education: {
        degree: data.degree,
        university: data.university,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      },
      department: data.department as
        | "Computer Science"
        | "Mathematics"
        | "Physics"
        | "Chemistry",
      about: data.about,
      joiningDate: new Date(data.joiningDate).toISOString(),
    };

    async function submitForm(formData: NewFacultyInput) {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/faculties/faculty?req-user=${session.data?.user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!res.ok) {
          throw new Error((await res.json()).message);
        }
        const data = await res.json();
        console.log(data);
        if (!data?.success) throw new Error("Failed to promote user.");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User promoted successfully",
        });

        // form.reset();
      } catch (error: unknown) {
        const errMsg =
          error instanceof Error ? error.message : "Unknown error happened.";
        Swal.fire({
          icon: "error",
          text: errMsg,
        });
        console.log(errMsg);
      } finally {
        setLoading(false);
      }
    }
    // submitForm(faculty);
  }

  return (
    <div className="rounded-md p-6 space-y-6 bg-white">
      <div>
        <h3 className="font-semibold border-b pb-2 border-b-gray-300">
          Personal Details
        </h3>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
        <div className="flex gap-5">
          <div className="flex w-full flex-col space-y-2 relative">
            <Label className="text-sm text-indigo-600" htmlFor="name">
              Full Name<span className="text-red-600">*</span>
            </Label>
            <Input
              {...register("name", {
                required: "Name is required",
              })}
              aria-invalid={errors.name ? true : false}
              className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              type="text"
              placeholder="John Doe"
              id="name"
            />
            {errors.name?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col space-y-2">
            <Label htmlFor="gender" className="text-sm text-indigo-600">
              Gender<span className="text-red-600">*</span>
            </Label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Please select a gender" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Select onValueChange={onChange} defaultValue={value}>
                  <SelectTrigger
                    id="gender"
                    aria-invalid={error ? true : false}
                    className="border w-full px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  >
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.gender.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="department" className="text-sm text-indigo-600">
              Department<span className="text-red-600">*</span>
            </Label>
            <Controller
              name="department"
              control={control}
              rules={{ required: "Please select an option" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    id="department"
                    aria-invalid={errors.department ? true : false}
                    className="border w-full px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  >
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Computer Science">
                        Computer Science
                      </SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.department?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.department.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="joiningDate" className="text-sm text-indigo-600">
              Joining date<span className="text-red-600">*</span>
            </Label>
            <Controller
              name="joiningDate"
              control={control}
              rules={{ required: "Please select a date" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Calendar22
                  error={error?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.joiningDate?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.joiningDate.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="email" className="text-sm text-indigo-600">
              Email<span className="text-red-600">*</span>
            </Label>

            <Input
              aria-invalid={errors.email ? true : false}
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
              placeholder="email@example.com"
              type="email"
              id="email"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm text-indigo-600">
              Phone Number<span className="text-red-600">*</span>
            </Label>

            <Input
              aria-invalid={errors.phoneNumber ? true : false}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[+]?[\d]{11,15}$/,
                  message: "Phone number must be 11 digits (Numbers only)",
                },
              })}
              placeholder="+1 234 567 890"
              type="tel"
              id="phoneNumber"
            />
            {errors.phoneNumber?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.phoneNumber.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col w-1/2 space-y-2">
            <Label htmlFor="about" className="text-sm text-indigo-600">
              About<span className="text-red-600">*</span>
            </Label>
            <Textarea
              aria-invalid={errors.about ? true : false}
              {...register("about", {
                required: "About is required",
              })}
              placeholder="Give a brief description"
              name="about"
              id="about"
            />
            {errors.about?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.about.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col w-1/2 space-y-2">
            <Label htmlFor="image" className="text-sm text-indigo-600">
              Image<span className="text-red-600">*</span>
            </Label>
            <Controller
              control={control}
              rules={{ required: "Image is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <ProfileImage
                  onChange={onChange}
                  value={value}
                  errors={error?.message}
                />
              )}
              name="image"
            />
            {errors.image?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.image.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex w-full flex-col space-y-2 relative">
            <Label className="text-sm text-indigo-600" htmlFor="address">
              Address<span className="text-red-600">*</span>
            </Label>
            <Input
              {...register("address", {
                required: "Address is required",
              })}
              aria-invalid={errors.address ? true : false}
              className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
              type="text"
              placeholder="New state, Old York"
              id="address"
            />
            {errors.address?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.address.message as string}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm text-indigo-600">
              Date of Birth<span className="text-red-600">*</span>
            </Label>
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: "Please select a date" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Calendar22
                  error={error?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.dateOfBirth?.message && (
              <p className="text-red-500 text-sm -mt-1">
                {errors.dateOfBirth.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold border-b border-b-gray-300 mb-6 pb-2">
              Educational Details
            </h3>
          </div>
          <div className="flex gap-5">
            <div className="flex w-1/2 relative flex-col space-y-2">
              <Label className="text-sm text-indigo-600" htmlFor="university">
                University<span className="text-red-600">*</span>
              </Label>
              <Input
                {...register("university", {
                  required: "University is required",
                })}
                className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                type="text"
                placeholder="eg: Major, University"
                id="university"
              />
              {errors.university?.message && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.university.message as string}
                </p>
              )}
            </div>
            <div className="flex w-1/2 relative flex-col space-y-2">
              <Label className="text-sm text-indigo-600" htmlFor="degree">
                Degree<span className="text-red-600">*</span>
              </Label>
              <Input
                {...register("degree", {
                  required: "Degree is required",
                })}
                className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                type="text"
                placeholder="eg: Philosophy"
                id="degree"
              />
              {errors.degree?.message && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.degree.message as string}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="w-1/2 flex gap-5">
              <div className="flex w-1/2 relative flex-col space-y-2">
                <Label className="text-sm text-indigo-600" htmlFor="startDate">
                  Start date<span className="text-red-600">*</span>
                </Label>
                <Input
                  {...register("startDate", {
                    required: "Please select a date",
                  })}
                  className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  type="date"
                  id="startDate"
                />
                {errors.startDate?.message && (
                  <p className="text-red-500 text-sm -mt-1">
                    {errors.startDate.message as string}
                  </p>
                )}
              </div>
              <div className="flex w-1/2 relative flex-col space-y-2">
                <Label className="text-sm text-indigo-600" htmlFor="startDate">
                  Start date<span className="text-red-600">*</span>
                </Label>
                <Input
                  {...register("endDate", {
                    required: "Please select a date",
                  })}
                  className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                  type="date"
                  id="endDate"
                />
                {errors.endDate?.message && (
                  <p className="text-red-500 text-sm -mt-1">
                    {errors.endDate.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Button className="mt-3" variant={"primary"}>
          {loading ? (
            <>
              <span className="animate-spin border-white w-4 h-4 border-t-transparent border-2 rounded-full"></span>
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
