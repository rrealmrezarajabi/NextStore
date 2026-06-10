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
  address: unknown | null;
  items: OrderItem[];
};

export type CreateOrderDto = {
  addressId?: number;
};

export type UpdateOrderStatusDto = {
  status: OrderStatus;
};
