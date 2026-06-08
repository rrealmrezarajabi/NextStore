"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile.services";

export const profileQueryKeys = {
  all: ["profile"] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: profileQueryKeys.all,
    queryFn: getProfile,
    retry:false // prevents more requests when we get 401
  });
}
