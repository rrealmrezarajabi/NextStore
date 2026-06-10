import { apiClient } from "@/lib/api/axios";
import type {
  CreateOrderDto,
  Order,
  PaginatedOrders,
  UpdateOrderStatusDto,
} from "../types";

type OrderListParams = {
  page?: number;
  limit?: number;
};

export async function createOrder(data: CreateOrderDto) {
  const res = await apiClient.post<Order>("/orders", data);
  return res.data;
}

export async function getMyOrders({
  page = 1,
  limit = 20,
}: OrderListParams = {}): Promise<PaginatedOrders> {
  const res = await apiClient.get<PaginatedOrders>("/orders/my", {
    params: { page, limit },
  });
  return res.data;
}

export async function getOrderById(id: number) {
  const res = await apiClient.get<Order>(`/orders/${id}`);
  return res.data;
}

export async function getAllOrders({
  page = 1,
  limit = 20,
}: OrderListParams = {}): Promise<PaginatedOrders> {
  const res = await apiClient.get<PaginatedOrders>("/orders", {
    params: { page, limit },
  });
  return res.data;
}

export async function updateOrderStatus(
  id: number,
  data: UpdateOrderStatusDto,
) {
  const res = await apiClient.patch<Order>(`/orders/${id}/status`, data);
  return res.data;
}
