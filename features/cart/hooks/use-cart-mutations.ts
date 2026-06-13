import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { toast } from "sonner";
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
      toast.success("Added to cart");
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not add item to cart"));
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
      toast.success("Cart updated");
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update cart"));
    },
  });
}

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeCartItem(id),

    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not remove item"));
    },
  });
}

export function useClearCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCart(),

    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not clear cart"));
    },
  });
}
