"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { resolveImageUrl } from "@/features/files/services/files.service";
import {
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "@/features/categories/services/categories.service";
import type { UpdateCategoryDTO } from "@/features/categories/types";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params.id);

  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCategoryDTO>();

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await getCategoryById(categoryId);
      setValue("name", category.name);
      setValue("image", category.image ?? "");
      setImageUrl(resolveImageUrl(category.image));
      setLoaded(true);
    };

    fetchCategory();
  }, [categoryId, setValue]);

  const onSubmit = async (data: UpdateCategoryDTO) => {
    try {
      await updateCategory(categoryId, data);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteCategory(categoryId);
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
            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Electronics"
              {...register("name", { required: "Name is required" })}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            {loaded && (
              <ImageUploader
                label="Category Image"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  setValue("image", url);
                }}
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="destructive" onClick={onDelete}>
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
