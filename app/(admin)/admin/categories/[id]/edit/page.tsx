"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { resolveImageUrl } from "@/features/files/services/files.service";
import { useCategory } from "@/features/categories/hooks/use-category-queries";
import {
  useDeleteCategory,
  useUpdateCategory,
} from "@/features/categories/hooks/use-category-mutations";
import { createCategorySchema } from "@/features/categories/schemas/category.schema";
import type { CreateCategoryDTO } from "@/features/categories/types";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params.id);
  const categoryQuery = useCategory(categoryId);
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateCategoryDTO>({
    resolver: zodResolver(createCategorySchema),
  });
  const imageUrl = useWatch({ control, name: "image" });

  useEffect(() => {
    if (!categoryQuery.data) return;

    setValue("name", categoryQuery.data.name);
    setValue("image", categoryQuery.data.image ?? "");
  }, [categoryQuery.data, setValue]);

  const onSubmit = async (data: CreateCategoryDTO) => {
    try {
      await updateCategoryMutation.mutateAsync({ id: categoryId, data });
      router.push("/admin/categories");
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Edit category</h1>
          <p className="text-sm text-zinc-600">Update category details.</p>
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
            <label
              htmlFor="category-edit-name"
              className="text-xs uppercase tracking-wide text-zinc-500"
            >
              Name
            </label>
            <input
              id="category-edit-name"
              type="text"
              placeholder="e.g. Electronics"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={
                errors.name ? "category-edit-name-error" : undefined
              }
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.name && (
              <p
                id="category-edit-name-error"
                className="mt-1 text-xs text-red-500"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            {categoryQuery.isSuccess && (
              <ImageUploader
                label="Category Image"
                value={resolveImageUrl(imageUrl)}
                onChange={(url) => {
                  setValue("image", url);
                }}
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="destructive"
            disabled={deleteCategoryMutation.isPending}
            onClick={onDelete}
          >
            Delete Category
          </Button>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/categories")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateCategoryMutation.isPending}>
              {updateCategoryMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
