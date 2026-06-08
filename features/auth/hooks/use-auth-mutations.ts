"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, logout, register } from "../services/auth.service";
import { profileQueryKeys } from "./use-profile-queries";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(profileQueryKeys.all, user);
      router.push("/dashboard");
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(profileQueryKeys.all, user);
      router.push("/dashboard");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: profileQueryKeys.all });
      router.push("/login");
    },
  });
}
