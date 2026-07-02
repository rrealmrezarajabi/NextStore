"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { resolveImageUrl } from "@/features/files/services/files.service";
import { updateProfileSchema } from "../schemas/profile.schema";
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
  } = useForm<UpdateProfileDto>({
    resolver: zodResolver(updateProfileSchema),
  });
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
          <label
            htmlFor="profile-first-name"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            First Name
          </label>
          <input
            id="profile-first-name"
            type="text"
            placeholder="Jane"
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
            aria-describedby={
              errors.firstName ? "profile-first-name-error" : undefined
            }
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.firstName && (
            <p
              id="profile-first-name-error"
              className="mt-1 text-xs text-red-500"
            >
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="profile-last-name"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            Last Name
          </label>
          <input
            id="profile-last-name"
            type="text"
            placeholder="Doe"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            aria-describedby={
              errors.lastName ? "profile-last-name-error" : undefined
            }
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.lastName && (
            <p
              id="profile-last-name-error"
              className="mt-1 text-xs text-red-500"
            >
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="profile-username"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            Username
          </label>
          <input
            id="profile-username"
            type="text"
            placeholder="jane_doe"
            {...register("username")}
            aria-invalid={!!errors.username}
            aria-describedby={
              errors.username ? "profile-username-error" : undefined
            }
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.username && (
            <p
              id="profile-username-error"
              className="mt-1 text-xs text-red-500"
            >
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="profile-email"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            placeholder="jane@example.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "profile-email-error" : undefined}
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.email && (
            <p id="profile-email-error" className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="profile-password"
            className="text-xs uppercase tracking-wide text-zinc-500"
          >
            New Password
          </label>
          <input
            id="profile-password"
            type="password"
            placeholder="Leave blank to keep current password"
            {...register("password", {
              setValueAs: (value) => value || undefined,
            })}
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? "profile-password-error" : undefined
            }
            className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          />
          {errors.password && (
            <p
              id="profile-password-error"
              className="mt-1 text-xs text-red-500"
            >
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
