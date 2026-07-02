"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { resolveImageUrl } from "@/features/files/services/files.service";
import { useUser } from "@/features/users/hooks/use-user-queries";
import { useUpdateUser } from "@/features/users/hooks/use-user-mutations";
import { createUserSchema } from "@/features/users/schemas/user.schema";

type UpdateUserDto = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
};

const editUserSchema = createUserSchema.pick({
  firstName: true,
  lastName: true,
  username: true,
  email: true,
  avatar: true,
});

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);
  const userQuery = useUser(userId);
  const updateUserMutation = useUpdateUser();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(editUserSchema),
  });
  const avatarUrl = useWatch({ control, name: "avatar" });

  useEffect(() => {
    if (!userQuery.data) return;

    setValue("firstName", userQuery.data.firstName);
    setValue("lastName", userQuery.data.lastName);
    setValue("username", userQuery.data.username);
    setValue("email", userQuery.data.email);
    setValue("avatar", userQuery.data.avatar);
  }, [userQuery.data, setValue]);

  const onSubmit = async (data: UpdateUserDto) => {
    try {
      if (!data.avatar) delete data.avatar;
      await updateUserMutation.mutateAsync({ id: userId, data });
      router.push("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Edit user</h1>
          <p className="text-sm text-zinc-600">Update user account.</p>
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
              htmlFor="admin-user-edit-first-name"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              First Name
            </label>
            <input
              id="admin-user-edit-first-name"
              type="text"
              placeholder="Jane"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "admin-user-edit-first-name-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.firstName && (
              <p
                id="admin-user-edit-first-name-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-user-edit-last-name"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              Last Name
            </label>
            <input
              id="admin-user-edit-last-name"
              type="text"
              placeholder="Doe"
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
              aria-describedby={
                errors.lastName ? "admin-user-edit-last-name-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.lastName && (
              <p
                id="admin-user-edit-last-name-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-user-edit-username"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              Username
            </label>
            <input
              id="admin-user-edit-username"
              type="text"
              placeholder="jane_doe"
              {...register("username")}
              aria-invalid={!!errors.username}
              aria-describedby={
                errors.username ? "admin-user-edit-username-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.username && (
              <p
                id="admin-user-edit-username-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="admin-user-edit-email"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              Email
            </label>
            <input
              id="admin-user-edit-email"
              type="email"
              placeholder="jane@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "admin-user-edit-email-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.email && (
              <p
                id="admin-user-edit-email-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            {userQuery.isSuccess && (
              <ImageUploader
                label="Avatar"
                value={resolveImageUrl(avatarUrl)}
                onChange={(url) => {
                  setValue("avatar", url);
                }}
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/users">Cancel</Link>
          </Button>
          <Button type="submit" disabled={updateUserMutation.isPending}>
            {updateUserMutation.isPending ? "Updating..." : "Update User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
