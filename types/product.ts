import type { Category } from "./category";

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export interface CreateProductDTO {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProductDTO {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedProducts {
  data: Product[];
  meta: PaginatedMeta;
}
