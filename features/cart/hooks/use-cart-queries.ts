import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/cart.service";

export const cartKeys = {
  all: ["cart"] as const,
};

export function useCartQuery() {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: getCart,
  });
}
