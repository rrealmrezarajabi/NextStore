import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../services/address.service";
import type { CreateAddressPayload, UpdateAddressPayload } from "../types";
import { addressKeys } from "./use-address-queries";

export function useCreateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => createAddress(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressKeys.all,
      });
    },
  });
}

export function useUpdateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateAddressPayload;
    }) => updateAddress(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressKeys.all,
      });
    },
  });
}

export function useDeleteAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAddress(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: addressKeys.all,
      });
    },
  });
}
