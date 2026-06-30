"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreateProductDTO } from "@/features/products/types";

type ProductFormValues = Omit<CreateProductDTO, "images">;

interface Category {
  id: number;
  name: string;
}

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  categories: Category[];
}

export function ProductFormFields({
  register,
  errors,
  categories,
}: ProductFormFieldsProps) {
  return (
    <>
      <div className="sm:col-span-2">
        <label
          htmlFor="title"
          className="text-xs uppercase tracking-wide text-zinc-500"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Wireless Headphones"
          {...register("title")}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
        />
        {errors.title && (
          <p id="title-error" className="mt-1 text-xs text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="text-xs uppercase tracking-wide text-zinc-500"
        >
          Price ($)
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          {...register("price", { valueAsNumber: true })}
          aria-invalid={!!errors.price}
          aria-describedby={errors.price ? "price-error" : undefined}
          className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
        />
        {errors.price && (
          <p id="price-error" className="mt-1 text-xs text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="categoryId"
          className="text-xs uppercase tracking-wide text-zinc-500"
        >
          Category
        </label>
        <select
          id="categoryId"
          {...register("categoryId", { valueAsNumber: true })}
          aria-invalid={!!errors.categoryId}
          aria-describedby={errors.categoryId ? "categoryId-error" : undefined}
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
          <p id="categoryId-error" className="mt-1 text-xs text-red-500">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="description"
          className="text-xs uppercase tracking-wide text-zinc-500"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Product description..."
          {...register("description")}
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 resize-none"
        />
        {errors.description && (
          <p id="description-error" className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>
    </>
  );
}
