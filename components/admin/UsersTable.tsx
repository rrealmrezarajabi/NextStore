"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { safeImageSrc } from "@/lib/utils";
import { User } from "@/types/user";
import Link from "next/link";
import { UserPen, UserRoundX } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/lib/api/user";

export function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();

  async function handleDelete(userId: number) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(userId);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/users/${user.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
                        <Image
                          src={safeImageSrc(user.avatar)}
                          alt={`${user.firstName} ${user.lastName}`}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-black">
                          {user.firstName} {user.lastName}
                        </p>
                        <div className="text-xs text-black">
                          @{user.username}
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-700">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/users/${user.id}/edit`}>
                      <Button
                        size="xs"
                        variant="outline"
                        type="button"
                        className="cursor-pointer"
                      >
                        Edit
                        <UserPen />
                      </Button>
                    </Link>

                    <Button
                      size="xs"
                      variant="destructive"
                      type="button"
                      className="cursor-pointer"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                      <UserRoundX />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
