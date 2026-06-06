"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../services/categories.service";

export function useDeleteCategory() {
  return useMutation({
    mutationFn: deleteCategory,
  });
}

