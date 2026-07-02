"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login, logout, register } from "../services/auth.service";
import { profileQueryKeys } from "./use-profile-queries";
import { cartKeys } from "@/features/cart/hooks/use-cart-queries";
import { orderQueryKeys } from "@/features/order/hooks/use-order-queries";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      toast.success("Signed in successfully");
      queryClient.setQueryData(profileQueryKeys.all, user);
      router.push("/dashboard");
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
      toast.success("Account created successfully");
      queryClient.setQueryData(profileQueryKeys.all, user);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not create account"));
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Signed out");
      queryClient.removeQueries({ queryKey: profileQueryKeys.all });
      queryClient.removeQueries({ queryKey: cartKeys.all });
      queryClient.removeQueries({ queryKey: orderQueryKeys.all });
      router.push("/login");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not sign out"));
    },
  });
}
