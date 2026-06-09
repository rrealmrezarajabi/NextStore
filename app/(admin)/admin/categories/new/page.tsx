"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useCreateCategory } from "@/features/categories/hooks/use-category-mutations";
import { createCategorySchema } from "@/features/categories/schemas/category.schema";
import type { CreateCategoryDTO } from "@/features/categories/types";
import { ImageUploader } from "@/components/shared/ImageUploader";

export default function CreateCategoryPage() {
  const router = useRouter();
  const createCategoryMutation = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCategoryDTO>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit = async (data: CreateCategoryDTO) => {
    try {
      await createCategoryMutation.mutateAsync(data);
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
              {...register("name")}
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

          <Button type="submit" disabled={createCategoryMutation.isPending}>
            {createCategoryMutation.isPending
              ? "Creating..."
              : "Create Category"}
          </Button>
        </div>
      </form>
    </div>
  );
}
