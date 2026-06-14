"use client";

import Link from "next/link";
import {
  CreditCard,
  MapPin,
  PackageCheck,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useProfile } from "@/features/auth/hooks/use-profile-queries";
import { useCartQuery } from "@/features/cart/hooks/use-cart-queries";
import { useAddressesQuery } from "@/features/addresses/hooks/use-address-queries";
import { useMyOrders } from "@/features/order/hooks/use-order-queries";
import {
  buildOrderStatusData,
  formatCurrency,
  formatNumber,
  getOrderItemsCount,
  getOrdersTotal,
  orderStatusLabels,
} from "../lib/dashboard-utils";
import { DashboardStatCard } from "./DashboardStatCard";
import { OrderStatusChart } from "./OrderStatusChart";

const quickActions = [
  { href: "/dashboard/profile", label: "Edit Profile", icon: UserRound },
  { href: "/dashboard/cart", label: "View Cart", icon: ShoppingCart },
  { href: "/dashboard/orders", label: "My Orders", icon: PackageCheck },
  { href: "/dashboard/addresses", label: "Addresses", icon: MapPin },
];

export function UserDashboard() {
  const profileQuery = useProfile();
  const cartQuery = useCartQuery();
  const addressesQuery = useAddressesQuery();
  const ordersQuery = useMyOrders({ page: 1, limit: 20 });

  const user = profileQuery.data;
  const cart = cartQuery.data;
  const addresses = addressesQuery.data ?? [];
  const orders = ordersQuery.data?.data ?? [];
  const orderTotal = ordersQuery.data?.meta.total ?? 0;
  const orderStatusData = buildOrderStatusData(orders);

  const isLoading =
    profileQuery.isLoading ||
    cartQuery.isLoading ||
    addressesQuery.isLoading ||
    ordersQuery.isLoading;

  const hasError =
    profileQuery.isError ||
    cartQuery.isError ||
    addressesQuery.isError ||
    ordersQuery.isError;

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
      <section className="rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Welcome back</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-black">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Track your cart, orders, and saved delivery addresses from one
              place.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-black px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Continue Shopping
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Cart Items"
          value={formatNumber(cart?.totalItems ?? 0)}
          description={formatCurrency(cart?.total ?? 0)}
          icon={ShoppingCart}
        />
        <DashboardStatCard
          title="Orders"
          value={formatNumber(orderTotal)}
          description={`${getOrderItemsCount(orders)} items in loaded orders`}
          icon={PackageCheck}
        />
        <DashboardStatCard
          title="Loaded Spend"
          value={formatCurrency(getOrdersTotal(orders))}
          description={`Calculated from latest ${orders.length} loaded orders.`}
          icon={CreditCard}
        />
        <DashboardStatCard
          title="Addresses"
          value={formatNumber(addresses.length)}
          description="Saved delivery destinations."
          icon={MapPin}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-black">
              Order Status
            </h2>
            <p className="text-sm text-zinc-500">
              Distribution from your latest loaded orders.
            </p>
          </div>
          <OrderStatusChart data={orderStatusData} />
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <h2 className="text-base font-semibold text-black">Quick Actions</h2>
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
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-100 p-5">
            <h2 className="text-base font-semibold text-black">
              Recent Orders
            </h2>
            <p className="text-sm text-zinc-500">
              Your latest purchases and their current status.
            </p>
          </div>
          <div className="divide-y divide-zinc-100">
            {orders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between gap-4 p-4 transition hover:bg-zinc-50"
              >
                <div>
                  <p className="text-sm font-semibold text-black">
                    Order #{order.id}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {order.items.length} products
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-black">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {orderStatusLabels[order.status]}
                  </p>
                </div>
              </Link>
            ))}
            {orders.length === 0 ? (
              <div className="p-5 text-sm text-zinc-500">
                You have no orders yet.
              </div>
            ) : null}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white">
          <div className="border-b border-zinc-100 p-5">
            <h2 className="text-base font-semibold text-black">Cart Preview</h2>
            <p className="text-sm text-zinc-500">
              Items currently waiting in your cart.
            </p>
          </div>
          <div className="divide-y divide-zinc-100">
            {(cart?.items ?? []).slice(0, 4).map((item) => (
              <div key={item.id} className="flex justify-between gap-3 p-4">
                <div>
                  <p className="text-sm font-medium text-black">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-black">
                  {formatCurrency(item.subtotal)}
                </p>
              </div>
            ))}
            {(cart?.items ?? []).length === 0 ? (
              <div className="p-5 text-sm text-zinc-500">
                Your cart is empty.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
