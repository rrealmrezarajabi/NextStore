"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getCategories,
  getCategoryById,
} from "../services/categories.service";

type CategoriesQueryParams = {
  name?: string;
  page?: number;
  limit?: number;
};

export const categoryQueryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryQueryKeys.all, "list"] as const,
  list: (params: CategoriesQueryParams) =>
    [...categoryQueryKeys.lists(), params] as const,
  allList: () => [...categoryQueryKeys.lists(), "all"] as const,
  details: () => [...categoryQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...categoryQueryKeys.details(), id] as const,
};

export function useCategories({
  name,
  page = 1,
  limit = 20,
}: CategoriesQueryParams = {}) {
  return useQuery({
    queryKey: categoryQueryKeys.list({ name, page, limit }),
    queryFn: () => getCategories({ name, page, limit, cacheMode: "no-store" }),
  });
}

export function useAllCategories() {
  return useQuery({
    queryKey: categoryQueryKeys.allList(),
    queryFn: getAllCategories,
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: categoryQueryKeys.detail(id),
    queryFn: () => getCategoryById(id),
    enabled: Number.isFinite(id),
  });
}
