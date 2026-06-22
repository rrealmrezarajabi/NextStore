"use client";

import { Button } from "@/components/ui/button";
import { useRegister } from "@/features/auth/hooks/use-auth-mutations";
import { registerSchema } from "@/features/auth/schemas/register schema/register.schema";
import type { RegisterDTO } from "@/features/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterDTO) => {
    await registerMutation.mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-zinc-950">Create account</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Join NextStore and start shopping.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            First Name
          </label>
          <input
            type="text"
            placeholder="Jane"
            {...register("firstName")}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Doe"
            {...register("lastName")}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Username
          </label>
          <input
            type="text"
            placeholder="jane_doe"
            {...register("username")}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
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

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Password
          </label>
          <input
            type="password"
            placeholder="Minimum 8 characters"
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

      {registerMutation.isError && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          Registration failed. Please check your details and try again.
        </p>
      )}

      <Button
        type="submit"
        className="mt-6 w-full"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Creating account..." : "Create account"}
      </Button>

      <p className="mt-4 text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-zinc-950 underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
