import { Suspense } from "react";
import { AdminUsersPageClient } from "@/features/users/components/AdminUsersPageClient";

export default function AdminUsersPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Loading users...
        </div>
      }
    >
      <AdminUsersPageClient />
    </Suspense>
  );
}
