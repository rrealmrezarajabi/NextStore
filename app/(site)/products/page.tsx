import { ProductsGrid } from "@/components/Products/ProductsGrid";
import { CategoriesSidebar } from "@/components/Products/CategoriesSidebar";
import { getProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";
import { Searchbar } from "@/components/shared/Searchbar";
import { Pagination } from "@/components/shared/Pagination";

const LIMIT = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const categoryId = params.categoryId ? Number(params.categoryId) : undefined;
  const search =
    typeof params.search === "string" ? params.search.trim() : undefined;
  const page = params.page ? Math.max(1, Number(params.page)) : 1;

  const [{ data: products, meta }, categories] = await Promise.all([
    getProducts({ categoryId, title: search, page, limit: LIMIT }),
    getCategories(),
  ]);

  const title = search
    ? `Results for "${search}"`
    : categoryId
      ? `Products in ${categories.find((c) => c.id === categoryId)?.name || "Unknown"}`
      : "Products";

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Showing {meta.total} items
            </p>
          </div>
          <div className="mb-4">
            <Searchbar placeholder="Search products..." variant="light" />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse lg:flex-row gap-6">
          <div className="flex-1">
            <ProductsGrid products={products} />

            {meta.totalPages > 1 && (
              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900">
                <Pagination
                  page={meta.page}
                  totalPages={meta.totalPages}
                  total={meta.total}
                  limit={meta.limit}
                  variant="dark"
                />
              </div>
            )}
          </div>

          <div className="w-full lg:w-64">
            <CategoriesSidebar
              categories={categories}
              activeCategoryId={categoryId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
