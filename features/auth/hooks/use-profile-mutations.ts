"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error-message";
import { toast } from "sonner";
import { updateProfile } from "../services/profile.services";
import { profileQueryKeys } from "./use-profile-queries";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update profile"));
    },
  });
}
