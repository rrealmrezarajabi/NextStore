import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductTable } from "@/components/admin/ProductTable";
import { AdminProductsToolbar } from "@/components/admin/AdminProductsToolbar";
import { AdminProductsPagination } from "@/components/admin/AdminProductsPagination";
import { getProducts } from "@/lib/api/product";
import { Plus } from "lucide-react";

const LIMIT = 10;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search =
    typeof params.search === "string" ? params.search.trim() : undefined;
  const page = params.page ? Math.max(1, Number(params.page)) : 1;

  const { data: products, meta } = await getProducts({
    title: search,
    page,
    limit: LIMIT,
    cacheMode: "no-store",
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Products</h1>
          <p className="text-sm text-zinc-600">
            Manage your catalog and update listings.
          </p>
        </div>
        <Button asChild>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Product
          </Link>
        </Button>
      </div>

      <AdminProductsToolbar />

      {products.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <ProductTable products={products} />
          <AdminProductsPagination
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            limit={meta.limit}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          {search ? `No products found for "${search}".` : "No products found."}
        </div>
      )}
    </div>
  );
}
