import { notFound } from "next/navigation";
import { Product } from "../types/product";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 60 },
  });

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
