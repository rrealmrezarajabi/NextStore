import { notFound } from "next/navigation";
import { Product } from "../types/product";
import { BASE_URL } from "./api ";

export async function getProducts(categoryId?: number): Promise<Product[]> {
  let url = `${BASE_URL}/products`;

  if (categoryId) {
    url += `?categoryId=${categoryId}`;
  }

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();

  return data as Product[];
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
