import { ProductsGrid } from "@/components/Products/ProductsGrid";
import { CategoriesSidebar } from "@/components/Products/CategoriesSidebar";
import { getProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";
import SearchBar from "@/components/Products/Searchbar";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const categoryId = params.categoryId ? Number(params.categoryId) : undefined;
  const search =
    typeof params.search === "string" ? params.search.trim() : undefined;

  const products = await getProducts({ categoryId, title: search });
  const categories = await getCategories();

  const title = search
    ? `Results for "${search}"`
    : categoryId
      ? `Products in ${categories.find((c) => c.id === categoryId)?.name || "Unknown"}`
      : "Products";

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Search + Title */}
        <div className="mb-8">
          <SearchBar />
        </div>

        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Showing {products.length} items
        </p>

        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <ProductsGrid products={products.slice(0, 20)} />
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
