"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../services/products.service";

type ProductsQueryParams = {
  categoryId?: number;
  title?: string;
  page?: number;
  limit?: number;
};

export const productQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productQueryKeys.all, "list"] as const,
  list: (params: ProductsQueryParams) =>
    [...productQueryKeys.lists(), params] as const,
  details: () => [...productQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...productQueryKeys.details(), id] as const,
};

export function useProducts({
  categoryId,
  title,
  page = 1,
  limit = 20,
}: ProductsQueryParams = {}) {
  return useQuery({
    queryKey: productQueryKeys.list({ categoryId, title, page, limit }),
    queryFn: () =>
      getProducts({ categoryId, title, page, limit, cacheMode: "no-store" }),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => getProduct(id),
    enabled: Number.isFinite(id),
  });
}
