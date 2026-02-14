import Image from "next/image";
import { Button } from "@/components/ui/button";
import { safeImageSrc } from "@/lib/utils";
import { User } from "@/lib/types/user";

export function UsersTable({ users }: { users: User[] }) {
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
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
                      <Image
                        src={safeImageSrc(user.avatar)}
                        alt={user.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-black">{user.name}</p>
                      <div className="text-xs text-zinc-500">ID {user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-700">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button size="xs" variant="outline" type="button">
                      Change
                    </Button>
                    <Button size="xs" variant="destructive" type="button">
                      Delete
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
