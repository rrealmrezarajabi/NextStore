import { notFound } from "next/navigation";
import {
  CreateProductDTO,
  UpdateProductDTO,
  PaginatedProducts,
  Product,
} from "../types";
import { apiClient } from "@/lib/api/axios";
import { BASE_URL } from "@/lib/api/base-url";

export async function getProducts({
  categoryId,
  title,
  page = 1,
  limit = 20,
  cacheMode = "revalidate",
}: {
  categoryId?: number;
  title?: string;
  page?: number;
  limit?: number;
  cacheMode?: "revalidate" | "no-store";
} = {}): Promise<PaginatedProducts> {
  const query = new URLSearchParams();

  if (categoryId) query.set("categoryId", categoryId.toString());
  if (title) query.set("title", title);
  query.set("page", page.toString());
  query.set("limit", limit.toString());

  const url = `${BASE_URL}/products?${query.toString()}`;

  const res =
    cacheMode === "no-store"
      ? await fetch(url, { cache: "no-store" })
      : await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json() as Promise<PaginatedProducts>;
}

export async function getProduct(id: number): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error(
      `Failed to fetch product: ${res.status} ${res.statusText} (${url})`,
    );
  }

  return (await res.json()) as Product;
}

export async function deleteProduct(id: number) {
  const { data } = await apiClient.delete(`/products/${id}`);
  return data ?? true;
}

export async function CreateProduct(
  productData: CreateProductDTO,
): Promise<Product> {
  const { data } = await apiClient.post<Product>("/products", productData);
  return data;
}

export async function updateProduct(
  id: number,
  productData: UpdateProductDTO,
): Promise<Product> {
  const { data } = await apiClient.patch<Product>(
    `/products/${id}`,
    productData,
  );
  return data;
}
