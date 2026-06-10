"use client";

import Link from "next/link";
import { useMyOrders } from "../hooks/use-order-queries";

export function OrdersList() {
  const { data: ordersPage, isLoading, isError } = useMyOrders();

  if (isLoading) return <p>Loading orders...</p>;

  if (isError) return <p>Failed to load orders.</p>;

  const orders = ordersPage?.data ?? [];

  if (orders.length === 0) {
    return <p>You have no orders yet.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-muted-foreground">
                Status: {order.status}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">${order.total}</p>

              <Link
                href={`/dashboard/orders/${order.id}`}
                className="text-sm underline"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
