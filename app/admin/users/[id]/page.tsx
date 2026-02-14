import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/api/user";
import { safeImageSrc } from "@/lib/utils";

export default async function UserPage({ params }: { params: { id: string } }) {
 const {id} = await params
  const userId = Number(id);
  const user = await getUserById(userId);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">User details</h1>
          <p className="text-sm text-zinc-600">
            View profile and account info.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/users">Back to users</Link>
          </Button>
          <Button variant="outline" type="button">
            Edit
          </Button>
          <Button variant="destructive" type="button">
            Delete
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
            <Image
              src={safeImageSrc(user.avatar)}
              alt={user.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black">{user.name}</h2>
            <div className="mt-2 inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-800">
              {user.role}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              User ID
            </div>
            <div className="mt-1 text-sm font-medium text-zinc-900">
              {user.id}
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Avatar URL
            </div>
            <div className="mt-1 truncate text-sm text-zinc-700">
              {user.avatar || "—"}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-zinc-900">
            Account details
          </h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                Email
              </div>
              <div className="mt-1 text-sm text-zinc-700">{user.email}</div>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                Password
              </div>
              <div className="mt-1 text-sm text-zinc-700">
                {user.password || "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
