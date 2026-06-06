import { z } from "zod";
import {
  categorySchema,
  createCategorySchema,
  paginatedCategoriesSchema,
  updateCategorySchema,
} from "./schemas/category.schema";

export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;
export type PaginatedCategories = z.infer<typeof paginatedCategoriesSchema>;

