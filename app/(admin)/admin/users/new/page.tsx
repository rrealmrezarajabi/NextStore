"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { useCreateUser } from "@/features/users/hooks/use-user-mutations";
import { createUserSchema } from "@/features/users/schemas/user.schema";
import type { CreateUserDto } from "@/features/users/types";

const CreateUserPage = () => {
  const router = useRouter();
  const createUserMutation = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserDto) => {
    try {
      if (!data.avatar) delete data.avatar;
      await createUserMutation.mutateAsync(data);
      reset();
      router.push("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Create user</h1>
          <p className="text-sm text-zinc-600">Add a new user account.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/users">Back to users</Link>
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-zinc-200 bg-white p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="admin-user-create-first-name"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              First Name
            </label>
            <input
              id="admin-user-create-first-name"
              type="text"
              placeholder="Jane"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName
                  ? "admin-user-create-first-name-error"
                  : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.firstName && (
              <p
                id="admin-user-create-first-name-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-user-create-last-name"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              Last Name
            </label>
            <input
              id="admin-user-create-last-name"
              type="text"
              placeholder="Doe"
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
              aria-describedby={
                errors.lastName ? "admin-user-create-last-name-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.lastName && (
              <p
                id="admin-user-create-last-name-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-user-create-username"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              Username
            </label>
            <input
              id="admin-user-create-username"
              type="text"
              placeholder="jane_doe"
              {...register("username")}
              aria-invalid={!!errors.username}
              aria-describedby={
                errors.username ? "admin-user-create-username-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.username && (
              <p
                id="admin-user-create-username-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-user-create-email"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              Email
            </label>
            <input
              id="admin-user-create-email"
              type="email"
              placeholder="jane@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "admin-user-create-email-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.email && (
              <p
                id="admin-user-create-email-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-user-create-password"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              Password
            </label>
            <input
              id="admin-user-create-password"
              type="password"
              placeholder="Minimum 4 characters"
              {...register("password")}
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password ? "admin-user-create-password-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.password && (
              <p
                id="admin-user-create-password-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <ImageUploader
              label="Avatar"
              onChange={(url) => setValue("avatar", url)}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/users">Cancel</Link>
          </Button>
          <Button type="submit" disabled={createUserMutation.isPending}>
            {createUserMutation.isPending ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
