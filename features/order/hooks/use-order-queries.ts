"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getMyOrders,
  getOrderById,
  getAllOrders,
} from "../services/order.service";

export const orderQueryKeys = {
  all: ["orders"] as const,
  my: ["orders", "my"] as const,
  detail: (id: number) => ["orders", id] as const,
  admin: ["orders", "admin"] as const,
};

export function useMyOrders() {
  return useQuery({
    queryKey: orderQueryKeys.my,
    queryFn: getMyOrders,
    retry: false,
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: orderQueryKeys.detail(id),
    queryFn: () => getOrderById(id),
    enabled: !!id,
    retry: false,
  });
}

export function useAdminOrders() {
  return useQuery({
    queryKey: orderQueryKeys.admin,
    queryFn: getAllOrders,
    retry: false,
  });
}
