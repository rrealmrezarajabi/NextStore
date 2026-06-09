import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../services/address.service";

export const addressKeys = {
  all: ["addresses"] as const,
};

export function useAddressesQuery() {
  return useQuery({
    queryKey: addressKeys.all,
    queryFn: getAddresses,
  });
}
