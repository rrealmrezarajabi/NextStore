import { ProductsGrid } from "@/components/Products/ProductsGrid";
import { CategoriesSidebar } from "@/components/Products/CategoriesSidebar";
import { getProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";

// Define the type with Promise
interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Await the promise first
  const resolvedSearchParams = await searchParams;

  // Now safely access the property
  const categoryIdParam = resolvedSearchParams.categoryId;
  const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined;

  const products = await getProducts(categoryId);
  const categories = await getCategories();

  const selectedCategory = categories.find((c) => c.id === categoryId);
  const title = selectedCategory
    ? `Products in ${selectedCategory.name}`
    : "Products";

  const displayedProducts = products.slice(0, 20);

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Showing {products.length} items
        </p>

        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <ProductsGrid products={displayedProducts} />
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
