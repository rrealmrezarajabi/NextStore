"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { getUserById, updateUser } from "@/lib/api/user";

type UpdateUserDto = {
  name: string;
  email: string;
  avatar: string;
};

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserDto>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(userId);
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("avatar", user.avatar);
    };

    fetchUser();
  }, [userId, setValue]);

  const onSubmit = async (data: UpdateUserDto) => {
    try {
      await updateUser(userId, data);
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
            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              {...register("name", { required: "Name is required" })}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
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
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Avatar URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              {...register("avatar", { required: "Avatar URL is required" })}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.avatar && (
              <p className="mt-1 text-xs text-red-500">
                {errors.avatar.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/users">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
