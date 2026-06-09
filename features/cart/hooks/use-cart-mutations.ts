import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCartItem,
  clearCart,
  removeCartItem,
  updateCartItem,
} from "../services/cart.service";
import type { AddCartItemPayload, UpdateCartItemPayload } from "../types";
import { cartKeys } from "./use-cart-queries";

export function useAddCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddCartItemPayload) => addCartItem(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
}

export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateCartItemPayload;
    }) => updateCartItem(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
}

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeCartItem(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
}

export function useClearCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCart(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
}
