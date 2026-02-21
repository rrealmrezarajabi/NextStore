import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoriesTable } from "@/components/admin/CategoriesTable";
import { Searchbar } from "@/components/shared/Searchbar";
import { Pagination } from "@/components/shared/Pagination";
import { getCategories } from "@/lib/api/category";
import { Plus } from "lucide-react";

const LIMIT = 10;

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search =
    typeof params.search === "string" ? params.search.trim() : undefined;
  const page = params.page ? Math.max(1, Number(params.page)) : 1;

  const { data: categories, meta } = await getCategories({
    name: search,
    page,
    limit: LIMIT,
    cacheMode: "no-store",
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Categories</h1>
          <p className="text-sm text-zinc-600">Manage product categories.</p>
        </div>
        <Button asChild>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Category
          </Link>
        </Button>
      </div>

      <Searchbar variant="dark" placeholder="Search categories..." />

      {categories.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <CategoriesTable categories={categories} />
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            limit={meta.limit}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          {search
            ? `No categories found for "${search}".`
            : "No categories found."}
        </div>
      )}
    </div>
  );
}
