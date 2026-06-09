"use client";

import Link from "next/link";
import { MapPin, Pencil, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddressesQuery } from "../hooks/use-address-queries";
import {
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from "../hooks/use-address-mutations";

export function AddressesList() {
  const addressesQuery = useAddressesQuery();
  const deleteAddress = useDeleteAddressMutation();
  const updateAddress = useUpdateAddressMutation();

  if (addressesQuery.isLoading) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="h-5 w-40 animate-pulse rounded bg-zinc-200" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="h-36 animate-pulse rounded-xl bg-zinc-100" />
          <div className="h-36 animate-pulse rounded-xl bg-zinc-100" />
        </div>
      </div>
    );
  }

  if (addressesQuery.isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Failed to load addresses. Please refresh the page.
      </div>
    );
  }

  const addresses = addressesQuery.data ?? [];

  if (addresses.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center shadow-sm">
        <div className="flex size-12 items-center justify-center rounded-full bg-zinc-950 text-white">
          <MapPin className="size-5" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-zinc-950">
          No saved addresses
        </h2>
        <p className="mt-2 max-w-sm text-sm text-zinc-500">
          Add your first delivery address so checkout is ready when you are.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {addresses.map((address) => {
        const isPending = deleteAddress.isPending || updateAddress.isPending;

        return (
          <article
            key={address.id}
            className="flex min-h-56 flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-base font-semibold text-zinc-950">
                    {address.label || "Delivery address"}
                  </h2>
                  {address.isDefault ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-950 px-2 py-1 text-xs font-medium text-white">
                      <Star className="size-3 fill-current" />
                      Default
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-medium text-zinc-700">
                  {address.fullName}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Button asChild variant="ghost" size="icon-sm">
                  <Link
                    href={`/dashboard/addresses/${address.id}`}
                    aria-label={`Edit ${address.label || "address"}`}
                  >
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={deleteAddress.isPending}
                  aria-label={`Delete ${address.label || "address"}`}
                  onClick={() => deleteAddress.mutate(address.id)}
                  className="text-zinc-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-zinc-600">
              <p className="line-clamp-2">{address.street}</p>
              <p>
                {address.city}, {address.province}
              </p>
              <p>Postal code: {address.postalCode}</p>
              <p>Phone: {address.phone}</p>
            </div>

            <div className="mt-auto pt-5">
              <Button
                type="button"
                variant={address.isDefault ? "secondary" : "outline"}
                size="sm"
                disabled={address.isDefault || isPending}
                onClick={() =>
                  updateAddress.mutate({
                    id: address.id,
                    payload: { isDefault: true },
                  })
                }
                className="w-full"
              >
                <Star className="size-4" />
                {address.isDefault ? "Default address" : "Make default"}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function AddressesHeader() {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h1 className="mt-1 text-2xl font-bold text-zinc-950">Addresses</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Manage where your orders should be delivered.
        </p>
      </div>
    </div>
  );
}
