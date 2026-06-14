import type { Order, OrderStatus } from "@/features/order/types";

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  delivered: "Delivered",
  canceled: "Canceled",
};

export const orderStatusColors: Record<OrderStatus, string> = {
  pending: "#f59e0b",
  paid: "#10b981",
  shipped: "#3b82f6",
  delivered: "#111827",
  canceled: "#ef4444",
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function buildOrderStatusData(orders: Order[]) {
  const counts = orders.reduce(
    (acc, order) => {
      acc[order.status] += 1;
      return acc;
    },
    {
      pending: 0,
      paid: 0,
      shipped: 0,
      delivered: 0,
      canceled: 0,
    } satisfies Record<OrderStatus, number>,
  );

  return Object.entries(counts)
    .map(([status, value]) => ({
      status: status as OrderStatus,
      name: orderStatusLabels[status as OrderStatus],
      value,
      fill: orderStatusColors[status as OrderStatus],
    }))
    .filter((item) => item.value > 0);
}

export function getOrderItemsCount(orders: Order[]) {
  return orders.reduce(
    (sum, order) =>
      sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0,
  );
}

export function getOrdersTotal(orders: Order[]) {
  return orders.reduce((sum, order) => sum + order.total, 0);
}
