"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import authImg from "@/assets/auth-img.jpg";
import { FieldValues, useForm } from "react-hook-form";
import { Eye, EyeOff, GraduationCap, School } from "lucide-react";
import { useState } from "react";
import { authenticate } from "@/lib/frontend-actions/auth-action";
import { useSession } from "next-auth/react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import Link from "next/link";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPass, setShowPass] = useState(false);
  const [activeRole, setActiveRole] = useState<"student" | "faculty">(
    "student"
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      signinAs: "student",
    },
  });

  const handleFormSubmit = async (data: FieldValues) => {
    const { email, password } = data;

    const res = await authenticate({
      formData: { email, password, signinAs: activeRole },
      method: "credentials",
      action: "register",
    });
    if (res.success) reset();
    console.log(res);
    if (!res.success) toast.error(res.error);
  };

  // Add faculty as an admin, send the verification email. Design the auth flow for this.

  const session = useSession();

  console.log(session);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <FieldGroup className="p-6 md:p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Create a new account</h1>
            </div>
            {/* Role Switcher Tabs */}
            <Tabs
              defaultValue="student"
              value={activeRole}
              onValueChange={(val) =>
                setActiveRole(val as "student" | "faculty")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 h-10">
                <TabsTrigger
                  value="student"
                  className="flex gap-2 items-center"
                >
                  <GraduationCap className="h-4 w-4" /> Student
                </TabsTrigger>
                <TabsTrigger
                  value="faculty"
                  className="flex gap-2 items-center"
                >
                  <School className="h-4 w-4" /> Faculty
                </TabsTrigger>
              </TabsList>
              {/* We can keep the content outside TabsContent so it doesn't unmount/remount */}
            </Tabs>
            {/* Credentials Form */}
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex-col gap-7 flex"
            >
              <Field>
                <FieldLabel htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="address@example.com"
                  aria-invalid={errors.email ? true : false}
                  {...register("email", {
                    required: "Please enter your email address",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    className="pr-10"
                    aria-invalid={errors.password ? true : false}
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="max-w-max absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <FieldDescription>
                  Must be at least 8 characters long
                </FieldDescription>
              </Field>
              <Field>
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Submitting" : `Register as ${activeRole}`}
                </Button>
              </Field>
            </form>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
            {/* Social Logins */}
            <Field className="grid grid-cols-3 gap-4">
              <Button
                onClick={async () => {
                  await authenticate({
                    method: "google",
                    action: "register",
                    formData: { signinAs: activeRole },
                  });
                }}
                variant="outline"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Sign up with Google</span>
              </Button>
              <Button
                onClick={async () => {
                  await authenticate({
                    method: "facebook",
                    action: "register",
                    formData: { signinAs: activeRole },
                  });
                }}
                variant="outline"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Sign up with Facebook</span>
              </Button>
              <Button
                onClick={() =>
                  toast.info("Github method is not implemented yet")
                }
                variant="outline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Sign up with Github</span>
              </Button>
            </Field>
            <FieldDescription className="text-center">
              Already have an account? <Link href="/login">Sign in</Link>
            </FieldDescription>
          </FieldGroup>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={authImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
