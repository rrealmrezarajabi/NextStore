"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../services/users.service";

export function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
  });
}

