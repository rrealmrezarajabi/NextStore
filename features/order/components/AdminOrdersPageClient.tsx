"use client";

import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/shared/Pagination";
import { Searchbar } from "@/components/shared/Searchbar";
import { useAdminOrders } from "../hooks/use-order-queries";
import { AdminOrdersTable } from "./AdminOrdersTable";

const LIMIT = 10;

export function AdminOrdersPageClient() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() || undefined;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const ordersQuery = useAdminOrders({ search, page, limit: LIMIT });

  const orders = ordersQuery.data?.data ?? [];
  const meta = ordersQuery.data?.meta;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-black">Orders</h1>
        <p className="text-sm text-zinc-600">
          Review customer orders, totals, and fulfillment status.
        </p>
      </div>

      <Searchbar variant="dark" placeholder="Search orders..." />

      {ordersQuery.isLoading ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Loading orders...
        </div>
      ) : orders.length > 0 && meta ? (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <AdminOrdersTable orders={orders} />
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            limit={meta.limit}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          {search ? `No orders found for "${search}".` : "No orders found."}
        </div>
      )}
    </div>
  );
}
