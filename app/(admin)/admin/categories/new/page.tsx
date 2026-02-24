"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/lib/api/category";
import type { CreateCategoryDTO } from "@/types/category";
import { ImageUploader } from "@/components/shared/ImageUploader";

export default function CreateCategoryPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryDTO>();

  const onSubmit = async (data: CreateCategoryDTO) => {
    try {
      await createCategory(data);
      reset();
      router.push("/admin/categories");
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Create Category</h1>
          <p className="text-sm text-zinc-600">Add a new product category.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/categories">Back to categories</Link>
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-zinc-200 bg-white p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Electronics"
              {...register("name", { required: "Name is required" })}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <ImageUploader
              label="Category Image"
              onChange={(url) => setValue("image", url)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/categories")}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Category"}
          </Button>
        </div>
      </form>
    </div>
  );
}
