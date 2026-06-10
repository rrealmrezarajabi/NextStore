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
  admin: ["orders", "admin"] as const,
};

export function useMyOrders() {
  return useQuery<PaginatedOrders>({
    queryKey: orderQueryKeys.my,
    queryFn: () => getMyOrders(),
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

export function useAdminOrders() {
  return useQuery<PaginatedOrders>({
    queryKey: orderQueryKeys.admin,
    queryFn: () => getAllOrders(),
    retry: false,
  });
}
