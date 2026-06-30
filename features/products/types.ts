import { z } from "zod";
import {
  createProductSchema,
  paginatedProductsSchema,
  productSchema,
  updateProductSchema,
} from "./schemas/product-schema/product.schema";


export type Product = z.infer<typeof productSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type PaginatedProducts = z.infer<typeof paginatedProductsSchema>;
