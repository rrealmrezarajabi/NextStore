"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { resolveImageUrl } from "@/features/files/services/files.service";
import { useProfile } from "../hooks/use-profile-queries";
import { useUpdateProfile } from "../hooks/use-profile-mutations";
import type { UpdateProfileDto } from "../types";

export function ProfileForm() {
  const profileQuery = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateProfileDto>();
  const avatarUrl = useWatch({ control, name: "avatar" });

  useEffect(() => {
    if (!profileQuery.data) return;

    reset({
      firstName: profileQuery.data.firstName,
      lastName: profileQuery.data.lastName,
      username: profileQuery.data.username,
      email: profileQuery.data.email,
      avatar: profileQuery.data.avatar,
      password: "",
    });
  }, [profileQuery.data, reset]);

  const onSubmit = async (data: UpdateProfileDto) => {
    const payload: UpdateProfileDto = { ...data };

    if (!payload.avatar) delete payload.avatar;
    if (!payload.password) delete payload.password;

    await updateProfileMutation.mutateAsync(payload);
  };

  if (profileQuery.isLoading) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
        Loading profile...
      </div>
    );
  }

  if (profileQuery.isError) {
    return (
      <div className="rounded-xl border border-dashed border-red-200 bg-white p-6 text-sm text-red-600">
        Failed to load profile.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-zinc-200 bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            First Name
          </label>
          <input
            type="text"
            placeholder="Jane"
            {...register("firstName", { required: "First name is required" })}
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
            {...register("lastName", { required: "Last name is required" })}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Username
          </label>
          <input
            type="text"
            placeholder="jane_doe"
            {...register("username", { required: "Username is required" })}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Email
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            {...register("email", { required: "Email is required" })}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            New Password
          </label>
          <input
            type="password"
            placeholder="Leave blank to keep current password"
            {...register("password", {
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <ImageUploader
            key={avatarUrl ?? "empty-avatar"}
            label="Avatar"
            value={resolveImageUrl(avatarUrl)}
            onChange={(url) => setValue("avatar", url)}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Button type="submit" disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
