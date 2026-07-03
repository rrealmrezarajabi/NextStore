"use client";

import { Button } from "@/components/ui/button";
import { useRegister } from "@/features/auth/hooks/use-auth-mutations";
import { registerSchema } from "@/features/auth/schemas/register-schema/register.schema";
import type { RegisterDTO } from "@/features/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
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
      <Link
        href="/"
        className="mb-6 flex items-center gap-2 text-zinc-950 transition hover:text-zinc-700"
        aria-label="Go to NextStore home page"
      >
        <Image src="/logo.png" width={36} height={36} alt="" priority />
        <span className="text-lg font-semibold">NextStore</span>
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-zinc-950">Create account</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Join NextStore and start shopping.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="register-first-name"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            First Name
          </label>
          <input
            id="register-first-name"
            type="text"
            placeholder="Jane"
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
            aria-describedby={
              errors.firstName ? "register-first-name-error" : undefined
            }
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.firstName && (
            <p
              id="register-first-name-error"
              className="mt-1 text-xs text-red-500"
            >
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="register-last-name"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            Last Name
          </label>
          <input
            id="register-last-name"
            type="text"
            placeholder="Doe"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            aria-describedby={
              errors.lastName ? "register-last-name-error" : undefined
            }
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.lastName && (
            <p
              id="register-last-name-error"
              className="mt-1 text-xs text-red-500"
            >
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="register-username"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            Username
          </label>
          <input
            id="register-username"
            type="text"
            placeholder="jane_doe"
            {...register("username")}
            aria-invalid={!!errors.username}
            aria-describedby={
              errors.username ? "register-username-error" : undefined
            }
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.username && (
            <p
              id="register-username-error"
              className="mt-1 text-xs text-red-500"
            >
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="register-email"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            Email
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="jane@example.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "register-email-error" : undefined}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.email && (
            <p id="register-email-error" className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="register-password"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            Password
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="Minimum 8 characters"
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? "register-password-error" : undefined
            }
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.password && (
            <p
              id="register-password-error"
              className="mt-1 text-xs text-red-500"
            >
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
