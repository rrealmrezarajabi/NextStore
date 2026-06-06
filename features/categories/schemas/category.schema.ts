import { z } from "zod";
import { paginatedSchema } from "@/lib/schemas/pagination.schema";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().nullable().optional().transform((value) => value ?? undefined),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export const paginatedCategoriesSchema = paginatedSchema(categorySchema);
