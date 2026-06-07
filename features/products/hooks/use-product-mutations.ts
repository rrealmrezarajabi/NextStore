"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductDTO }) =>
      updateProduct(id, data),
    onSuccess: (_product, { id }) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.detail(id) });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
}
