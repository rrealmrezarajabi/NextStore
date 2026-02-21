import type {
  Category,
  CreateCategoryDTO,
  PaginatedCategories,
  UpdateCategoryDTO,
} from "../../types/category";
import { BASE_URL } from "./base-url";

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
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create category (${res.status}): ${text}`);
  }

  return res.json() as Promise<Category>;
}

// Update an existing category
export async function updateCategory(
  id: number,
  data: UpdateCategoryDTO,
): Promise<Category> {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update category (${res.status}): ${text}`);
  }

  return res.json() as Promise<Category>;
}

// Delete a category by id
export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete category (${res.status}): ${text}`);
  }
}
