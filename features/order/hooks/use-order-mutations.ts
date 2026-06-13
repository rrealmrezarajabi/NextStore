"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder, updateOrderStatus } from "../services/order.service";
import { orderQueryKeys } from "./use-order-queries";
import { UpdateOrderStatusDto } from "../types";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}

export function useUpdateOrderStatus(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrderStatusDto) => updateOrderStatus(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.detail(id),
      });
    },
  });
}
