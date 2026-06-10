"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { safeImageSrc } from "@/lib/utils";
import { useOrder } from "../hooks/use-order-queries";

type OrderDetailsPageClientProps = {
  orderId: number;
};

export function OrderDetailsPageClient({
  orderId,
}: OrderDetailsPageClientProps) {
  const { data: order, isLoading, isError } = useOrder(orderId);

  if (!Number.isFinite(orderId)) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h1 className="text-xl font-bold">Invalid order</h1>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="h-8 w-44 animate-pulse rounded bg-zinc-200" />
        <div className="h-80 animate-pulse rounded-2xl bg-zinc-100" />
      </section>
    );
  }

  if (isError || !order) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h1 className="text-xl font-bold">Order not found</h1>
        <p className="mt-2 text-sm text-red-700">
          This order may not exist, or you may not have access to it.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-zinc-500">Order details</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-950">
            Order #{order.id}
          </h1>
        </div>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/dashboard/orders">
            <ArrowLeft className="size-4" />
            Back to orders
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <PackageCheck className="size-5 text-zinc-950" />
              <h2 className="font-semibold text-zinc-950">Items</h2>
            </div>
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium capitalize text-zinc-800">
              {order.status}
            </span>
          </div>

          <div className="divide-y divide-zinc-100">
            {order.items.map((item) => (
              <article
                key={item.id}
                className="grid gap-4 px-5 py-5 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:items-center"
              >
                <div className="relative size-16 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                  <Image
                    src={safeImageSrc(item.productImage)}
                    alt={item.productTitle}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="line-clamp-2 font-semibold text-zinc-950">
                    {item.productTitle}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {item.quantity} × ${item.unitPrice}
                  </p>
                </div>
                <p className="font-semibold text-zinc-950">
                  ${item.subtotal}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-950 p-5 text-white shadow-sm">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4 text-zinc-300">
                <span>Status</span>
                <span className="font-medium capitalize text-white">
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between gap-4 border-t border-zinc-800 pt-4">
                <span className="text-zinc-300">Total</span>
                <span className="text-xl font-bold">${order.total}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-zinc-950" />
              <h2 className="font-semibold text-zinc-950">Delivery address</h2>
            </div>
            {order.address ? (
              <div className="mt-4 space-y-1 text-sm text-zinc-600">
                <p className="font-medium text-zinc-900">
                  {order.address.fullName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.province}
                </p>
                <p>Postal code: {order.address.postalCode}</p>
                <p>Phone: {order.address.phone}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-500">
                No delivery address was attached to this order.
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
