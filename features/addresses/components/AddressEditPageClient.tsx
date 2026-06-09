"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddressForm } from "./AddressForm";
import { useAddressesQuery } from "../hooks/use-address-queries";

type AddressEditPageClientProps = {
  addressId: number;
};

export function AddressEditPageClient({
  addressId,
}: AddressEditPageClientProps) {
  const addressesQuery = useAddressesQuery();
  const isInvalidAddressId = !Number.isFinite(addressId) || addressId <= 0;
  const address = addressesQuery.data?.find((item) => item.id === addressId);

  if (isInvalidAddressId) {
    return (
      <section className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
        <h1 className="text-lg font-semibold">Invalid address</h1>
        <p className="mt-2 text-sm text-red-700">
          Please choose an address from your saved address list.
        </p>
        <Button asChild className="mt-5">
          <Link href="/dashboard/addresses">Back to addresses</Link>
        </Button>
      </section>
    );
  }

  if (addressesQuery.isLoading) {
    return (
      <section className="space-y-6">
        <div>
          <p className="text-sm font-medium text-zinc-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-950">
            Edit address
          </h1>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-5 w-40 animate-pulse rounded bg-zinc-200" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="h-10 animate-pulse rounded bg-zinc-100" />
            <div className="h-10 animate-pulse rounded bg-zinc-100" />
            <div className="h-10 animate-pulse rounded bg-zinc-100" />
            <div className="h-10 animate-pulse rounded bg-zinc-100" />
          </div>
        </div>
      </section>
    );
  }

  if (addressesQuery.isError || !address) {
    return (
      <section className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
        <h1 className="text-lg font-semibold">Address not found</h1>
        <p className="mt-2 text-sm text-red-700">
          This address could not be loaded. Please go back and try another one.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-zinc-500">Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold text-zinc-950">Edit address</h1>
      </div>
      <AddressForm mode="edit" address={address} />
    </section>
  );
}
