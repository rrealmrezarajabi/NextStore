import { BASE_URL } from "@/lib/api/base-url";
import { Profile, UpdateProfileDto } from "../types";
import { apiClient } from "@/lib/api/axios";

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}

export async function updateProfile(data: UpdateProfileDto): Promise<Profile> {

    const res = await apiClient.patch<Profile>("/auth/profile", data);

    return res.data

}
