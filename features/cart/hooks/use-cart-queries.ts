import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cart.service";

export const cartKeys = {
  all: ["cart"] as const,
};

type UseCartQueryOptions = {
  enabled?: boolean;
};

export function useCartQuery({ enabled = true }: UseCartQueryOptions = {}) {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: getCart,
    enabled,
  });
}
