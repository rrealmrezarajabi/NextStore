import { UsersTable } from "@/components/admin/UsersTable";
import { Searchbar } from "@/components/shared/Searchbar";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/lib/api/user";
import Link from "next/link";
import { Plus } from "lucide-react";

const LIMIT = 10;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search =
    typeof params.search === "string" ? params.search.trim() : undefined;
  const page = params.page ? Math.max(1, Number(params.page)) : 1;

  const { data: users, meta } = await getUsers({ search, page, limit: LIMIT });

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

      {users.length > 0 ? (
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
