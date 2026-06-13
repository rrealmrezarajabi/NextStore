"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { toast } from "sonner";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../services/categories.service";
import type { UpdateCategoryDTO } from "../types";
import { categoryQueryKeys } from "./use-category-queries";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not create category"));
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryDTO }) =>
      updateCategory(id, data),
    onSuccess: (_category, { id }) => {
      toast.success("Category updated");
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(id) });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update category"));
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not delete category"));
    },
  });
}
