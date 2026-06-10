"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddressesQuery } from "@/features/addresses/hooks/use-address-queries";
import { useCartQuery } from "@/features/cart/hooks/use-cart-queries";
import { useCreateOrder } from "../hooks/use-order-mutations";

export function CheckoutPageClient() {
  const router = useRouter();
  const cartQuery = useCartQuery();
  const addressesQuery = useAddressesQuery();
  const createOrder = useCreateOrder();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  const addresses = useMemo(
    () => addressesQuery.data ?? [],
    [addressesQuery.data],
  );
  const defaultAddressId = useMemo(() => {
    if (addresses.length === 0) return null;

    const defaultAddress = addresses.find((address) => address.isDefault);
    return defaultAddress?.id ?? addresses[0].id;
  }, [addresses]);
  const activeAddressId = selectedAddressId ?? defaultAddressId;
  const cart = cartQuery.data;
  const isLoading = cartQuery.isLoading || addressesQuery.isLoading;
  const isError = cartQuery.isError || addressesQuery.isError;

  async function handleSubmit() {
    if (!activeAddressId) return;

    const order = await createOrder.mutateAsync({
      addressId: activeAddressId,
    });

    router.push(`/dashboard/orders/${order.id}`);
  }

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="h-8 w-44 animate-pulse rounded bg-zinc-200" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="h-72 animate-pulse rounded-2xl bg-zinc-100" />
          <div className="h-56 animate-pulse rounded-2xl bg-zinc-100" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h1 className="text-xl font-bold">Checkout is unavailable</h1>
        <p className="mt-2 text-sm text-red-700">
          Please refresh the page or try again in a moment.
        </p>
      </section>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <section className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
        <h1 className="text-xl font-semibold text-zinc-950">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Add items to your cart before placing an order.
        </p>
        <Button asChild className="mt-6 bg-zinc-950 hover:bg-zinc-800">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-zinc-500">Checkout</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-950">
            Choose delivery address
          </h1>
        </div>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/dashboard/cart">
            <ArrowLeft className="size-4" />
            Back to cart
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-zinc-100 pb-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-zinc-950" />
              <h2 className="font-semibold text-zinc-950">
                Delivery address
              </h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/addresses">
                <Plus className="size-4" />
                Add address
              </Link>
            </Button>
          </div>

          {addresses.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center px-4 py-10 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-zinc-950 text-white">
                <MapPin className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-950">
                No saved addresses
              </h3>
              <p className="mt-2 max-w-sm text-sm text-zinc-500">
                Add an address first, then come back to place your order.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-3">
              {addresses.map((address) => {
                const isSelected = activeAddressId === address.id;

                return (
                  <label
                    key={address.id}
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      isSelected
                        ? "border-zinc-950 bg-zinc-50"
                        : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="addressId"
                        value={address.id}
                        checked={isSelected}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mt-1 size-4 accent-zinc-950"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-zinc-950">
                            {address.label || "Delivery address"}
                          </span>
                          {address.isDefault ? (
                            <span className="rounded-full bg-zinc-950 px-2 py-1 text-xs font-medium text-white">
                              Default
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-zinc-700">
                          {address.fullName}
                        </p>
                        <p className="mt-2 text-sm text-zinc-500">
                          {address.street}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">
                          {address.city}, {address.province} ·{" "}
                          {address.postalCode}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">
                          {address.phone}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-zinc-200 bg-zinc-950 p-5 text-white shadow-sm">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4 text-zinc-300">
              <span>Total items</span>
              <span className="font-medium text-white">{cart.totalItems}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-zinc-800 pt-4">
              <span className="text-zinc-300">Total</span>
              <span className="text-xl font-bold">${cart.total}</span>
            </div>
          </div>

          {createOrder.isError ? (
            <p className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-100">
              Failed to place order. Please check your cart and address.
            </p>
          ) : null}

          <Button
            type="button"
            disabled={
              createOrder.isPending ||
              addresses.length === 0 ||
              !activeAddressId
            }
            onClick={handleSubmit}
            className="mt-6 w-full bg-white text-zinc-950 hover:bg-zinc-200"
          >
            <CheckCircle2 className="size-4" />
            {createOrder.isPending ? "Placing order..." : "Place order"}
          </Button>
        </aside>
      </div>
    </section>
  );
}
