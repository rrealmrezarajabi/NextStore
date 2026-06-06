import type {
  Category,
  CreateCategoryDTO,
  PaginatedCategories,
  UpdateCategoryDTO,
} from "../types";
import { apiClient } from "@/lib/api/axios";
import { BASE_URL } from "@/lib/api/base-url";

// Fetch paginated categories with optional name search
export async function getCategories({
  name,
  page = 1,
  limit = 20,
  cacheMode = "revalidate",
}: {
  name?: string;
  page?: number;
  limit?: number;
  cacheMode?: "revalidate" | "no-store";
} = {}): Promise<PaginatedCategories> {
  const query = new URLSearchParams();
  if (name) query.set("name", name);
  query.set("page", page.toString());
  query.set("limit", limit.toString());

  const url = `${BASE_URL}/categories?${query.toString()}`;

  const res =
    cacheMode === "no-store"
      ? await fetch(url, { cache: "no-store" })
      : await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json() as Promise<PaginatedCategories>;
}

// Fetch all categories as a flat array (for selects / dropdowns)
export async function getAllCategories(): Promise<Category[]> {
  const { data } = await getCategories({ limit: 100 });
  return data;
}

// Fetch a single category by id
export async function getCategoryById(id: number): Promise<Category> {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch category ${id}`);

  return res.json() as Promise<Category>;
}

// Create a new category
export async function createCategory(
  data: CreateCategoryDTO,
): Promise<Category> {
  const response = await apiClient.post<Category>("/categories", data);
  return response.data;
}

// Update an existing category
export async function updateCategory(
  id: number,
  data: UpdateCategoryDTO,
): Promise<Category> {
  const response = await apiClient.patch<Category>(`/categories/${id}`, data);
  return response.data;
}

// Delete a category by id
export async function deleteCategory(id: number): Promise<void> {
  await apiClient.delete(`/categories/${id}`);
}
