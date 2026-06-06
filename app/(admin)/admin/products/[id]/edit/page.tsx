"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/shared/ImageUploader";
import { resolveImageUrl } from "@/features/files/services/files.service";
import { getAllCategories } from "@/features/categories/services/categories.service";
import { getProduct, updateProduct, deleteProduct } from "@/features/products/services/products.service";
import type { UpdateProductDTO } from "@/features/products/types";
import type { Category } from "@/features/categories/types";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<string[]>([""]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Omit<UpdateProductDTO, "images">>();

  useEffect(() => {
    Promise.all([getProduct(productId), getAllCategories()])
      .then(([product, cats]) => {
        setValue("title", product.title);
        setValue("price", product.price);
        setValue("description", product.description ?? "");
        setValue("categoryId", product.category?.id);
        setCategories(cats);
        setImages(
          product.images?.length
            ? product.images.map((img) => resolveImageUrl(img))
            : [""],
        );
        setLoaded(true);
      })
      .catch(console.error);
  }, [productId, setValue]);

  const addImage = () => setImages((prev) => [...prev, ""]);
  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));
  const updateImage = (index: number, url: string) =>
    setImages((prev) => prev.map((img, i) => (i === index ? url : img)));

  const onSubmit = async (data: Omit<UpdateProductDTO, "images">) => {
    try {
      await updateProduct(productId, {
        ...data,
        price: Number(data.price),
        categoryId: Number(data.categoryId),
        images: images.filter(Boolean),
      });
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteProduct(productId);
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-zinc-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Edit Product</h1>
          <p className="text-sm text-zinc-600">Update product details.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/products">Back to products</Link>
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-zinc-200 bg-white p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Title */}
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Wireless Headphones"
              {...register("title", { required: "Title is required" })}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Category
            </label>
            <select
              {...register("categoryId", { required: "Category is required" })}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Product description..."
              {...register("description")}
              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 resize-none"
            />
          </div>

          {/* Images */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wide text-zinc-500">
                Images
              </label>
              <button
                type="button"
                onClick={addImage}
                className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800 transition"
              >
                <Plus size={12} />
                Add image
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <ImageUploader
                    label={`Image ${index + 1}`}
                    value={img}
                    onChange={(url) => updateImage(index, url)}
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 size={10} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete Product
          </Button>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
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
