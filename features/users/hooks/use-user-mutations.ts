"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, updateUser } from "../services/users.service";
import type { UpdateUserDto } from "../types";
import { userQueryKeys } from "./use-user-queries";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDto }) =>
      updateUser(id, data),
    onSuccess: (_user, { id }) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(id) });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
}
