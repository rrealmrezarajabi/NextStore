"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetSessionExpiredNotice } from "@/lib/api/session-expired";
import { clearAuthQueryData } from "../lib/auth-query-cache";
import { login, logout, register } from "../services/auth.service";
import { profileQueryKeys } from "./use-profile-queries";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      resetSessionExpiredNotice();
      toast.success("Signed in successfully");
      queryClient.setQueryData(profileQueryKeys.all, user);
      router.push(user.role === "admin" ? "/admin" : "/dashboard");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Sign in failed"));
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: ({ user }) => {
      resetSessionExpiredNotice();
      toast.success("Account created successfully");
      queryClient.setQueryData(profileQueryKeys.all, user);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not create account"));
    },
  });
}

type UseLogoutOptions = {
  redirectToLogin?: boolean;
};

export function useLogout({ redirectToLogin = false }: UseLogoutOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: profileQueryKeys.all });
      clearAuthQueryData(queryClient);
    },
    onSuccess: () => {
      toast.success("Signed out");

      if (redirectToLogin) {
        router.push("/login");
      }
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
      toast.error(getApiErrorMessage(error, "Could not sign out"));
    },
  });
}
