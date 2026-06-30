"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/features/auth/hooks/use-auth-mutations";
import { loginSchema } from "@/features/auth/schemas/login-schema/login.schema";
import type { LoginDTO } from "@/features/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDTO) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-zinc-950">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-600">Welcome back to NextStore.</p>
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Email
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            {...register("email")}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Password
          </label>
          <input
            type="password"
            placeholder="Your password"
            {...register("password")}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {loginMutation.isError && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          Sign in failed. Please check your email and password.
        </p>
      )}

      <Button
        type="submit"
        className="mt-6 w-full"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="mt-4 text-center text-sm text-zinc-600">
        New to NextStore?{" "}
        <Link href="/register" className="font-medium text-zinc-950 underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
