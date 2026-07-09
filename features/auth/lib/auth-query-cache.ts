import type { QueryClient, QueryKey } from "@tanstack/react-query";
import { addressKeys } from "@/features/addresses/hooks/use-address-queries";
import { cartKeys } from "@/features/cart/hooks/use-cart-queries";
import { orderQueryKeys } from "@/features/order/hooks/use-order-queries";
import { userQueryKeys } from "@/features/users/hooks/use-user-queries";
import { profileQueryKeys } from "../hooks/use-profile-queries";

const AUTH_SCOPED_QUERY_KEYS: QueryKey[] = [
  cartKeys.all,
  orderQueryKeys.all,
  addressKeys.all,
  userQueryKeys.all,
];

export function clearAuthQueryData(queryClient: QueryClient) {
  queryClient.setQueryData(profileQueryKeys.all, null);

  for (const queryKey of AUTH_SCOPED_QUERY_KEYS) {
    queryClient.removeQueries({ queryKey });
  }
}
