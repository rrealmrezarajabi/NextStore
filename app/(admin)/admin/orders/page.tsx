import { Suspense } from "react";
import { AdminOrdersPageClient } from "@/features/order/components/AdminOrdersPageClient";

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Loading orders...
        </div>
      }
    >
      <AdminOrdersPageClient />
    </Suspense>
  );
}
