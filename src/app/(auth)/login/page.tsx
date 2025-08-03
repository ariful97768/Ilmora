import { LoginForm } from "@/components/login-form";
import { auth } from "@/auth";

export default async function LoginPage() {
  const userData = await auth();
  console.log(userData?.user);
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
