"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { toast } from "sonner";
import { createUser, deleteUser, updateUser } from "../services/users.service";
import type { UpdateUserDto } from "../types";
import { userQueryKeys } from "./use-user-queries";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created");
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not create user"));
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDto }) =>
      updateUser(id, data),
    onSuccess: (_user, { id }) => {
      toast.success("User updated");
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(id) });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update user"));
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not delete user"));
    },
  });
}
