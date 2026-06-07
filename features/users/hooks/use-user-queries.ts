"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserById, getUsers } from "../services/users.service";

type UsersQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export const userQueryKeys = {
  all: ["users"] as const,
  lists: () => [...userQueryKeys.all, "list"] as const,
  list: (params: UsersQueryParams) =>
    [...userQueryKeys.lists(), params] as const,
  details: () => [...userQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...userQueryKeys.details(), id] as const,
};

export function useUsers({
  search,
  page = 1,
  limit = 10,
}: UsersQueryParams = {}) {
  return useQuery({
    queryKey: userQueryKeys.list({ search, page, limit }),
    queryFn: () => getUsers({ search, page, limit }),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: Number.isFinite(id),
  });
}
