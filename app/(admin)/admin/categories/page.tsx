import { Suspense } from "react";
import { AdminCategoriesPageClient } from "@/features/categories/components/AdminCategoriesPageClient";

export default function AdminCategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Loading categories...
        </div>
      }
    >
      <AdminCategoriesPageClient />
    </Suspense>
  );
}
