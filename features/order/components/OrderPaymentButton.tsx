"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateOrderStatus } from "../hooks/use-order-mutations";

type OrderPaymentButtonProps = {
  orderId: number;
  status: string;
};

export function OrderPaymentButton({
  orderId,
  status,
}: OrderPaymentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const payOrder = useUpdateOrderStatus(orderId);
  const canPay = status === "pending";

  if (!canPay && !isOpen) return null;

  async function handlePay() {
    await payOrder.mutateAsync({ status: "paid" });
    setIsOpen(true);
  }

  return (
    <>
      {canPay ? (
        <Button
          type="button"
          disabled={payOrder.isPending}
          onClick={handlePay}
          className="mt-6 w-full bg-white text-zinc-950 hover:bg-zinc-200"
        >
          <CreditCard className="size-4" />
          {payOrder.isPending ? "Processing..." : "Pay order"}
        </Button>
      ) : null}

      {canPay && payOrder.isError ? (
        <p className="mt-3 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-100">
          Payment failed. Please try again.
        </p>
      ) : null}

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-success-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-7" />
            </div>
            <h2
              id="payment-success-title"
              className="mt-4 text-lg font-semibold text-zinc-950"
            >
              Payment successful
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Your order status has been updated to paid.
            </p>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-zinc-950 hover:bg-zinc-800"
            >
              <X className="size-4" />
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
