"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order, OrderStatus } from "../types";
import { formatOrderNumber } from "@/utils/formatOrderNumber";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  shipped: "bg-blue-50 text-blue-700 ring-blue-200",
  delivered: "bg-zinc-100 text-zinc-800 ring-zinc-200",
  canceled: "bg-red-50 text-red-700 ring-red-200",
};

export function AdminOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
          <tr>
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Items</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="w-0 whitespace-nowrap px-4 py-3 text-right font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {orders.map((order) => {
            const itemsCount = order.items.reduce(
              (total, item) => total + item.quantity,
              0,
            );
            const customerName =
              order.address?.fullName ||
              order.user?.name ||
              [order.user?.firstName, order.user?.lastName]
                .filter(Boolean)
                .join(" ") ||
              order.user?.username ||
              "Unknown customer";

            return (
              <tr key={order.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-black hover:underline"
                  >
                    {formatOrderNumber(order.id)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-700">
                  {customerName || "Unknown customer"}
                </td>
                <td className="px-4 py-3 text-zinc-700">
                  {itemsCount} {itemsCount === 1 ? "item" : "items"}
                </td>
                <td className="px-4 py-3 font-medium text-zinc-900">
                  ${order.total}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize ring-1 ring-inset ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <Button
                      size="xs"
                      variant="outline"
                      type="button"
                      className="cursor-pointer"
                      asChild
                    >
                      <Link href={`/admin/orders/${order.id}`}>
                        View
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
