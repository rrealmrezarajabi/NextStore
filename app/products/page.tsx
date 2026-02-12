import { ProductsGrid } from "@/components/Products/ProductsGrid";
import { getProducts } from "@/lib/api/product";

export default async function ProductsPage() {
  const products = await getProducts();
  const displayedProducts = products.slice(0, 20);

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Showing {products.length} items
        </p>

        <div className="mt-6">
          <ProductsGrid products={displayedProducts} />
        </div>
      </div>
    </main>
  );
}
