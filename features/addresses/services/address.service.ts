import { apiClient } from "@/lib/api/axios";
import type {
  Address,
  CreateAddressPayload,
  UpdateAddressPayload,
} from "../types";

export async function getAddresses(): Promise<Address[]> {
  const res = await apiClient.get<Address[]>("/addresses");

  return res.data;
}

export async function createAddress(
  payload: CreateAddressPayload,
): Promise<Address> {
  const res = await apiClient.post<Address>("/addresses", payload);

  return res.data;
}

export async function updateAddress(
  id: number,
  payload: UpdateAddressPayload,
): Promise<Address> {
  const res = await apiClient.patch<Address>(`/addresses/${id}`, payload);

  return res.data;
}

export async function deleteAddress(id: number): Promise<void> {
  const res = await apiClient.delete(`/addresses/${id}`);

  return res.data;
}
