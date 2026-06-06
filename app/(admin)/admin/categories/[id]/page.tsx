import { getCategoryById } from "@/features/categories/services/categories.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { safeImageSrc } from "@/lib/utils";

export default async function AdminCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(Number(id));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Category details</h1>
          <p className="text-sm text-zinc-600">View category information.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild>
            <Link href="/admin/categories">Back to categories</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/admin/categories/${category.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
            <Image
              src={safeImageSrc(category.image)}
              alt={category.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black">
              {category.name}
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Category ID
            </div>
            <div className="mt-1 text-sm font-medium text-zinc-900">
              #{category.id}
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Name
            </div>
            <div className="mt-1 text-sm text-zinc-700">{category.name}</div>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 sm:col-span-2">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Image URL
            </div>
            <div className="mt-1 truncate text-sm text-zinc-700">
              {category.image || "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
