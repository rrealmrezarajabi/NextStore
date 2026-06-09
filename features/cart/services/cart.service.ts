import { apiClient } from "@/lib/api/axios";
import type { AddCartItemPayload, Cart, UpdateCartItemPayload } from "../types";

export async function getCart(): Promise<Cart> {
  const res = await apiClient.get<Cart>("/cart");

  return res.data;
}

export async function addCartItem(payload: AddCartItemPayload): Promise<Cart> {
  const res = await apiClient.post<Cart>("/cart/items", payload);

  return res.data;
}

export async function updateCartItem(
  id: number,
  payload: UpdateCartItemPayload,
): Promise<Cart> {
  const res = await apiClient.patch<Cart>(`/cart/items/${id}`, payload);

  return res.data;
}

export async function removeCartItem(id: number): Promise<Cart> {
  const res = await apiClient.delete<Cart>(`/cart/items/${id}`);

  return res.data;
}

export async function clearCart(): Promise<Cart> {
  const res = await apiClient.delete<Cart>("/cart");

  return res.data;
}
