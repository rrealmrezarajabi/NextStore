import { apiClient, type ApiRequestConfig } from "@/lib/api/axios";
import type { Profile, UpdateProfileDto } from "../types";

type GetProfileOptions = {
  suppressSessionExpiredRedirect?: boolean;
};

export async function getProfile({
  suppressSessionExpiredRedirect = false,
}: GetProfileOptions = {}): Promise<Profile> {
  const config: ApiRequestConfig = {
    _suppressSessionExpiredRedirect: suppressSessionExpiredRedirect,
  };

  const res = await apiClient.get<Profile>("/auth/profile", config);
  return res.data;
}

export async function updateProfile(data: UpdateProfileDto): Promise<Profile> {
  const res = await apiClient.patch<Profile>("/auth/profile", data);
  return res.data;
}
