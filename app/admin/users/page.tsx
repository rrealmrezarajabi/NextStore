import { UsersTable } from "@/components/admin/UsersTable";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/lib/api/user";
import Link from "next/link";
import {Plus} from "lucide-react"
export default async function AdminUsersPage() {
  const users = await getUsers();

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

      {users.length > 0 ? (
        <UsersTable users={users} />
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          No users found.
        </div>
      )}
    </div>
  );
}
