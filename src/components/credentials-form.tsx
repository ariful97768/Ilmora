"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { authenticate } from "@/lib/frontend-actions/auth-action";
import { useActionState } from "react";

export default function CredentialsForm() {
  const [state, dispatch, pending] = useActionState(authenticate, undefined);

  return (
    <form action={dispatch} className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="email@example.com"
          required
        />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" name="password" required />
      </div>
      {state?.error && (
        <div className="text-red-600 text-center">{state.error}</div>
      )}
      <Button type="submit" className="w-full">
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
