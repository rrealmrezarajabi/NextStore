import { apiClient } from "@/lib/api/axios";
import type { Profile, UpdateProfileDto } from "../types";

export async function getProfile(): Promise<Profile> {
  const res = await apiClient.get<Profile>("/auth/profile");
  return res.data;
}

export async function updateProfile(data: UpdateProfileDto): Promise<Profile> {
  const res = await apiClient.patch<Profile>("/auth/profile", data);
  return res.data;
}
