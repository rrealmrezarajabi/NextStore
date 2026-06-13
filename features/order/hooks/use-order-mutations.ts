"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { toast } from "sonner";
import { createOrder, updateOrderStatus } from "../services/order.service";
import { orderQueryKeys } from "./use-order-queries";
import { UpdateOrderStatusDto } from "../types";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order placed successfully");

      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to place order"));
    },
  });
}

export function useUpdateOrderStatus(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrderStatusDto) => updateOrderStatus(id, data),

    onSuccess: (_order, data) => {
      toast.success(`Order marked as ${data.status}`);
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.detail(id),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update order status"));
    },
  });
}
