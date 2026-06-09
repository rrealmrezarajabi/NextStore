"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addressSchema } from "../schemas/address.schema";
import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "../hooks/use-address-mutations";
import type {
  Address,
  CreateAddressPayload,
  UpdateAddressPayload,
} from "../types";

type AddressFormValues = CreateAddressPayload;

type AddressFormProps = {
  address?: Address;
  mode?: "create" | "edit";
};

const inputClassName =
  "mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300";

export function AddressForm({ address, mode = "create" }: AddressFormProps) {
  const router = useRouter();
  const createAddress = useCreateAddressMutation();
  const updateAddress = useUpdateAddressMutation();
  const isEditing = mode === "edit";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "",
      fullName: "",
      phone: "",
      province: "",
      city: "",
      street: "",
      postalCode: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (!address) return;

    reset({
      label: address.label ?? "",
      fullName: address.fullName,
      phone: address.phone,
      province: address.province,
      city: address.city,
      street: address.street,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
  }, [address, reset]);

  const isPending = createAddress.isPending || updateAddress.isPending;

  const onSubmit = async (data: AddressFormValues) => {
    const payload = {
      ...data,
      label: data.label?.trim() || undefined,
      isDefault: Boolean(data.isDefault),
    };

    if (isEditing && address) {
      await updateAddress.mutateAsync({
        id: address.id,
        payload: payload as UpdateAddressPayload,
      });
    } else {
      await createAddress.mutateAsync(payload);
      reset();
    }

    router.push("/dashboard/addresses");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-zinc-100 pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">
            {isEditing ? "Edit address" : "Add new address"}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {isEditing
              ? "Update the delivery details for this saved address."
              : "Save a delivery address for faster checkout."}
          </p>
        </div>

        {isEditing ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/addresses")}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Label
          </label>
          <input
            type="text"
            placeholder="Home, Office, Parents"
            {...register("label")}
            className={inputClassName}
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Jane Doe"
            {...register("fullName")}
            className={inputClassName}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Phone
          </label>
          <input
            type="tel"
            placeholder="09123456789"
            {...register("phone")}
            className={inputClassName}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Postal Code
          </label>
          <input
            type="text"
            placeholder="1234567890"
            {...register("postalCode")}
            className={inputClassName}
          />
          {errors.postalCode && (
            <p className="mt-1 text-xs text-red-500">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Province
          </label>
          <input
            type="text"
            placeholder="Tehran"
            {...register("province")}
            className={inputClassName}
          />
          {errors.province && (
            <p className="mt-1 text-xs text-red-500">
              {errors.province.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            City
          </label>
          <input
            type="text"
            placeholder="Tehran"
            {...register("city")}
            className={inputClassName}
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wide text-zinc-500">
            Street Address
          </label>
          <textarea
            rows={3}
            placeholder="Street, alley, building, unit"
            {...register("street")}
            className={inputClassName}
          />
          {errors.street && (
            <p className="mt-1 text-xs text-red-500">{errors.street.message}</p>
          )}
        </div>

        <label className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm font-medium text-zinc-800 sm:col-span-2">
          <input
            type="checkbox"
            {...register("isDefault")}
            className="size-4 rounded border-zinc-300 accent-zinc-950"
          />
          Set as default delivery address
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isPending}>
          <Save className="size-4" />
          {isPending
            ? "Saving..."
            : isEditing
              ? "Save address"
              : "Create address"}
        </Button>
      </div>
    </form>
  );
}
