"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/profile.services";
import { profileQueryKeys } from "./use-profile-queries";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
    },
  });
}
