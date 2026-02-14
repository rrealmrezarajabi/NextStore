import { notFound } from "next/navigation";
import { Product } from "../types/product";
import { BASE_URL } from "./base-url";

export async function getProducts({
  categoryId,
  title,
}: {
  categoryId?: number;
  title?: string;
}) {
  let url = `${BASE_URL}/products`;

  const query = new URLSearchParams();

  if (categoryId) query.set("categoryId", categoryId.toString());
  if (title) query.set("title", title);

  if (query.size > 0) {
    url += `?${query.toString()}`;
  }

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) throw new Error("Failed to fetch products");

  return (await res.json()) as Product[];
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
