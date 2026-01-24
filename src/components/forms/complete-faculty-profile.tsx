"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar22 } from "@/components/select-calender-date";
import { Textarea } from "@/components/ui/textarea";
import ProfileImage from "@/components/profileImage";
import { Controller, type UseFormReturn } from "react-hook-form";
import { Session } from "next-auth";

export default function CompleteFacultyProfile({
  register,
  formState: { errors, isSubmitting },
  control,
  email,
}: UseFormReturn & {
  update: (data?: any) => Promise<Session | null>;
  email: string;
  role: "Faculty" | "Student";
  userId: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full p-0">
      <FieldGroup className="w-full col-span-1">
        <Field>
          <FieldLabel htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            aria-invalid={errors.name ? true : false}
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.name?.message as string}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">
            Email<span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            aria-invalid={errors.email ? true : false}
            {...register("email", {
              required: "Email address is required",
              disabled: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email",
              },
            })}
            value={email}
            placeholder="email@example.com"
            type="email"
            id="email"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.email?.message as string}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="phoneNumber">
            Phone Number <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            aria-invalid={errors.phoneNumber ? true : false}
            {...register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^[+]?[\d]{11,15}$/,
                message: "Phone Number must be 11-15 digits (Numbers only)",
              },
            })}
            placeholder="+8801234567890"
            type="tel"
            id="phoneNumber"
          />
          {errors.phoneNumber?.message && (
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.phoneNumber?.message as string}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="gender">
            Gender <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Please select a gender" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.gender?.message as string}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="about">
            About <span className="text-red-500">*</span>
          </FieldLabel>
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
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.about?.message as string}
            </p>
          )}
        </Field>
      </FieldGroup>
      <FieldGroup className="w-full col-span-1">
        <Field>
          <FieldLabel htmlFor="dateOfBirth">
            Date of Birth <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{
              required: "Please select a date",
              validate: (date) => {
                const today = new Date();
                const eighteenYearsAgo = new Date(
                  today.getFullYear() - 18,
                  today.getMonth(),
                  today.getDate() + 1,
                );

                if (new Date(date) >= eighteenYearsAgo)
                  return "You must be at least 18 years old";

                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Calendar22
                dateAfter={new Date()}
                error={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.dateOfBirth?.message && (
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.dateOfBirth?.message as string}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="address">
            Address <span className="text-red-500">*</span>
          </FieldLabel>
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
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.address?.message as string}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="department">
            Department <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="department"
            control={control}
            rules={{ required: "Please select an option" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          {errors.department && (
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.department.message as string}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="joiningDate">
            Joining date <span className="text-red-600">*</span>
          </FieldLabel>
          <Controller
            name="joiningDate"
            control={control}
            rules={{
              required: "Please select a date",
              validate: (value) => {
                if (value < new Date()) {
                  return "Please select a valid date";
                }
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Calendar22
                dateBefore={new Date()}
                error={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.joiningDate && (
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.joiningDate.message as string}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="image">
            Image <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ProfileImage
                onChange={onChange}
                value={value}
                errors={error?.message}
              />
            )}
          />
          {errors.image && (
            <p className="text-red-500 text-sm -mt-1.5">
              {errors.image.message as string}
            </p>
          )}
        </Field>
      </FieldGroup>
      <div className="md:col-span-2">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold border-b border-b-gray-300 mb-6 pb-2">
              Educational Details
            </h3>
          </div>
          <div className="flex gap-5">
            <Field>
              <FieldLabel htmlFor="university">
                University <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...register("university", {
                  required: "University is required",
                })}
                aria-invalid={errors.university ? true : false}
                className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                type="text"
                placeholder="eg: Major, University"
                id="university"
              />
              {errors.university && (
                <p className="text-red-500 text-sm -mt-1.5">
                  {errors.university.message as string}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="degree">
                Degree <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...register("degree", {
                  required: "Degree is required",
                })}
                aria-invalid={errors.degree ? true : false}
                className="border px-3 py-2 transition-colors duration-300 rounded-md outline-none focus:border-indigo-500"
                type="text"
                placeholder="eg: Philosophy"
                id="degree"
              />
              {errors.degree && (
                <p className="text-red-500 text-sm -mt-1.5">
                  {errors.degree.message as string}
                </p>
              )}
            </Field>
          </div>
          <div className="flex gap-5">
            <Field>
              <FieldLabel htmlFor="startDate">
                Start date <span className="text-red-500">*</span>
              </FieldLabel>
              <Controller
                name="startDate"
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
              {errors.startDate && (
                <p className="text-red-500 text-sm -mt-1.5">
                  {errors.startDate.message as string}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="endDate">
                End date <span className="text-red-500">*</span>
              </FieldLabel>
              <Controller
                name="endDate"
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
              {errors.endDate && (
                <p className="text-red-500 text-sm -mt-1.5">
                  {errors.endDate.message as string}
                </p>
              )}
            </Field>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button disabled={isSubmitting}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
