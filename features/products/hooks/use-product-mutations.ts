"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { toast } from "sonner";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/products.service";
import type { UpdateProductDTO } from "../types";
import { productQueryKeys } from "./use-product-queries";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created");
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not create product"));
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductDTO }) =>
      updateProduct(id, data),
    onSuccess: (_product, { id }) => {
      toast.success("Product updated");
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(id) });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update product"));
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not delete product"));
    },
  });
}
