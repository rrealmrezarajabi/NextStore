import { Suspense } from "react";
import { AdminProductsPageClient } from "@/features/products/components/AdminProductsPageClient";

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Loading products...
        </div>
      }
    >
      <AdminProductsPageClient />
    </Suspense>
  );
}
