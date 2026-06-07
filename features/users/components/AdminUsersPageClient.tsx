"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/shared/Pagination";
import { Searchbar } from "@/components/shared/Searchbar";
import { useUsers } from "../hooks/use-user-queries";
import { UsersTable } from "./UsersTable";

const LIMIT = 10;

export function AdminUsersPageClient() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() || undefined;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const usersQuery = useUsers({ search, page, limit: LIMIT });

  const users = usersQuery.data?.data ?? [];
  const meta = usersQuery.data?.meta;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Users</h1>
          <p className="text-sm text-zinc-600">
            Manage user accounts and roles.
          </p>
        </div>
        <Button asChild>
          <Link
            href="/admin/users/new"
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New User
          </Link>
        </Button>
      </div>

      <Searchbar variant="dark" placeholder="Search users..." />

      {usersQuery.isLoading ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Loading users...
        </div>
      ) : users.length > 0 && meta ? (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <UsersTable users={users} />
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            limit={meta.limit}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          {search ? `No users found for "${search}".` : "No users found."}
        </div>
      )}
    </div>
  );
}
