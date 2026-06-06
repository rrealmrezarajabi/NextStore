"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../services/products.service";

export function useDeleteProduct() {
  return useMutation({
    mutationFn: deleteProduct,
  });
}

