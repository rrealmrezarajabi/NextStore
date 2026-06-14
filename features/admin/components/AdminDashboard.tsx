"use client";

import Link from "next/link";
import {
  Boxes,
  FolderTree,
  Plus,
  ReceiptText,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useAdminOrders } from "@/features/order/hooks/use-order-queries";
import { useProducts } from "@/features/products/hooks/use-product-queries";
import { useCategories } from "@/features/categories/hooks/use-category-queries";
import { useUsers } from "@/features/users/hooks/use-user-queries";
import {
  buildOrderStatusData,
  formatCurrency,
  formatNumber,
  getOrdersTotal,
  orderStatusLabels,
} from "@/features/dashboard/lib/dashboard-utils";
import { buildProductCategoryData } from "../lib/admin-dashboard-utils";
import { DashboardStatCard } from "@/features/dashboard/components/DashboardStatCard";
import { OrderStatusChart } from "@/features/dashboard/components/OrderStatusChart";
import { ProductCategoryChart } from "./ProductCategoryChart";

const QUERY_LIMIT = 100;

const quickActions = [
  { href: "/admin/products/new", label: "Add Product", icon: Plus },
  { href: "/admin/categories/new", label: "Add Category", icon: FolderTree },
  { href: "/admin/orders", label: "Manage Orders", icon: ReceiptText },
  { href: "/admin/users", label: "Manage Users", icon: Users },
];

export function AdminDashboard() {
  const ordersQuery = useAdminOrders({ page: 1, limit: QUERY_LIMIT });
  const productsQuery = useProducts({ page: 1, limit: QUERY_LIMIT });
  const categoriesQuery = useCategories({ page: 1, limit: QUERY_LIMIT });
  const usersQuery = useUsers({ page: 1, limit: 5 });

  const orders = ordersQuery.data?.data ?? [];
  const products = productsQuery.data?.data ?? [];
  const users = usersQuery.data?.data ?? [];

  const isLoading =
    ordersQuery.isLoading ||
    productsQuery.isLoading ||
    categoriesQuery.isLoading ||
    usersQuery.isLoading;

  const hasError =
    ordersQuery.isError ||
    productsQuery.isError ||
    categoriesQuery.isError ||
    usersQuery.isError;

  const orderTotal = ordersQuery.data?.meta.total ?? 0;
  const productTotal = productsQuery.data?.meta.total ?? 0;
  const categoryTotal = categoriesQuery.data?.meta.total ?? 0;
  const userTotal = usersQuery.data?.meta.total ?? 0;
  const statusData = buildOrderStatusData(orders);
  const categoryData = buildProductCategoryData(products);
  const trackedRevenue = getOrdersTotal(orders);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
        Loading dashboard...
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Could not load dashboard data.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Store activity, catalog health, and order flow at a glance.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-black px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardStatCard
          title="Products"
          value={formatNumber(productTotal)}
          description="Total products available in the catalog."
          icon={Boxes}
        />
        <DashboardStatCard
          title="Orders"
          value={formatNumber(orderTotal)}
          description="Orders across all customer accounts."
          icon={ShoppingBag}
        />
        <DashboardStatCard
          title="Users"
          value={formatNumber(userTotal)}
          description="Registered customer and admin accounts."
          icon={Users}
        />
        <DashboardStatCard
          title="Categories"
          value={formatNumber(categoryTotal)}
          description="Active product groups in the store."
          icon={FolderTree}
        />
        <DashboardStatCard
          title="Tracked Revenue"
          value={formatCurrency(trackedRevenue)}
          description={`Calculated from the latest ${orders.length} loaded orders.`}
          icon={ReceiptText}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-black">
              Product Mix
            </h2>
            <p className="text-sm text-zinc-500">
              Top categories by product count.
            </p>
          </div>
          <ProductCategoryChart data={categoryData} />
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-black">
              Order Status
            </h2>
            <p className="text-sm text-zinc-500">
              Distribution from loaded orders.
            </p>
          </div>
          <OrderStatusChart data={statusData} />
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-100 p-5">
            <h2 className="text-base font-semibold text-black">
              Recent Orders
            </h2>
            <p className="text-sm text-zinc-500">
              Latest orders loaded from the admin list.
            </p>
          </div>
          <div className="divide-y divide-zinc-100">
            {orders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between gap-4 p-4 transition hover:bg-zinc-50"
              >
                <div>
                  <p className="text-sm font-semibold text-black">
                    Order #{order.id}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {order.user
                      ? `${order.user.firstName} ${order.user.lastName}`
                      : "Guest customer"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-black">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-xs capitalize text-zinc-500">
                    {orderStatusLabels[order.status]}
                  </p>
                </div>
              </Link>
            ))}
            {orders.length === 0 ? (
              <div className="p-5 text-sm text-zinc-500">
                No orders have been created yet.
              </div>
            ) : null}
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="text-base font-semibold text-black">
              Quick Actions
            </h2>
            <div className="mt-4 grid gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="text-base font-semibold text-black">
              Recent Users
            </h2>
            <div className="mt-4 space-y-3">
              {users.map((user) => (
                <Link
                  key={user.id}
                  href={`/admin/users/${user.id}`}
                  className="block rounded-lg px-2 py-1 transition hover:bg-zinc-50"
                >
                  <p className="text-sm font-medium text-black">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-zinc-500">@{user.username}</p>
                </Link>
              ))}
              {users.length === 0 ? (
                <p className="text-sm text-zinc-500">No users found.</p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
