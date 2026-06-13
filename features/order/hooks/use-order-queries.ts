"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getMyOrders,
  getOrderById,
  getAllOrders,
} from "../services/order.service";
import type { Order, PaginatedOrders } from "../types";

export const orderQueryKeys = {
  all: ["orders"] as const,
  my: ["orders", "my"] as const,
  detail: (id: number) => ["orders", id] as const,
  admin: (params?: OrderListParams) => ["orders", "admin", params] as const,
};

type OrderListParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export function useMyOrders(params?: Pick<OrderListParams, "page" | "limit">) {
  return useQuery<PaginatedOrders>({
    queryKey: [...orderQueryKeys.my, params],
    queryFn: () => getMyOrders(params),
    retry: false,
  });
}

export function useOrder(id: number) {
  return useQuery<Order>({
    queryKey: orderQueryKeys.detail(id),
    queryFn: () => getOrderById(id),
    enabled: !!id,
    retry: false,
  });
}

export function useAdminOrders(params?: OrderListParams) {
  return useQuery<PaginatedOrders>({
    queryKey: orderQueryKeys.admin(params),
    queryFn: () => getAllOrders(params),
    retry: false,
  });
}
