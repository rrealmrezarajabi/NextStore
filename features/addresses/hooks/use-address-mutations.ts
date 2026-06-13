import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { toast } from "sonner";
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
      toast.success("Address added");
      queryClient.invalidateQueries({
        queryKey: addressKeys.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not add address"));
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

    onSuccess: (_address, { payload }) => {
      toast.success(
        payload.isDefault ? "Default address updated" : "Address updated",
      );
      queryClient.invalidateQueries({
        queryKey: addressKeys.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update address"));
    },
  });
}

export function useDeleteAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAddress(id),

    onSuccess: () => {
      toast.success("Address deleted");
      queryClient.invalidateQueries({
        queryKey: addressKeys.all,
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not delete address"));
    },
  });
}
