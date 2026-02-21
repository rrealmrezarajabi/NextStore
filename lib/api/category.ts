import type { Category } from "../../types/category";
import { BASE_URL } from "./base-url";

export interface PaginatedCategories {
  data: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export async function getCategories(limit = 100): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories?limit=${limit}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("failed to fetch categories");

  const json = (await res.json()) as PaginatedCategories | Category[];

  // Handle both paginated and plain-array responses
  if (Array.isArray(json)) return json;
  return json.data;
}
