import { notFound } from "next/navigation";
import {
  CreateProductDTO,
  PaginatedProducts,
  Product,
} from "../../types/product";
import { BASE_URL } from "./base-url";

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
  const url = `${BASE_URL}/products/${id}`;

  const res = await fetch(url, { method: "DELETE", cache: "no-store" });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to delete product (${res.status} ${res.statusText}): ${text}`,
    );
  }

  if (res.status === 204) return true;

  return res.json();
}

export async function CreateProduct(
  productData: CreateProductDTO,
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) throw new Error("failed to create product");

  const data = res.json();

  return data;
}
