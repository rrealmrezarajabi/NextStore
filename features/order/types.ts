import type { Address } from "@/features/addresses/types";
import type { User } from "@/features/users/types";

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "canceled";

export type OrderItem = {
  id: number;
  productId: number;
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
};

export type Order = {
  id: number;
  status: OrderStatus;
  total: number;
  user?: User;
  address: Address | null;
  items: OrderItem[];
};

export type PaginatedOrders = {
  data: Order[];
  meta: PaginationMeta;
};

export type CreateOrderDto = {
  addressId?: number;
};

export type UpdateOrderStatusDto = {
  status: OrderStatus;
};
