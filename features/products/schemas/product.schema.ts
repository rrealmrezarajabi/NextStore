import { z } from "zod";
import { categorySchema } from "@/features/categories/schemas/category.schema";
import { paginatedSchema } from "@/lib/schemas/pagination.schema";

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string().optional(),
  price: z.number(),
  description: z.string(),
  category: categorySchema,
  images: z.array(z.string()),
});

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().int().min(0),
  description: z.string().min(1, "Description is required"),
  categoryId: z.number().int(),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

export const updateProductSchema = createProductSchema.partial();

export const paginatedProductsSchema = paginatedSchema(productSchema);

