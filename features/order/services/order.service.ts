import { apiClient } from "@/lib/api/axios";
import type { CreateOrderDto, Order, UpdateOrderStatusDto } from "../types";

export async function createOrder(data: CreateOrderDto) {
  const res = await apiClient.post<Order>("/orders", data);
  return res.data;
}

export async function getMyOrders() {
  const res = await apiClient.get<Order[]>("/orders/my");
  return res.data;
}

export async function getOrderById(id: number) {
  const res = await apiClient.get<Order>(`/orders/${id}`);
  return res.data;
}

export async function getAllOrders() {
  const res = await apiClient.get<Order[]>("/orders");
  return res.data;
}

export async function updateOrderStatus(
  id: number,
  data: UpdateOrderStatusDto,
) {
  const res = await apiClient.patch<Order>(`/orders/${id}/status`, data);
  return res.data;
}
