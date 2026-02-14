import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductTable } from "@/components/admin/ProductTable";
import { getProducts } from "@/lib/api/product";
import {Plus} from "lucide-react"
export default async function AdminProductsPage() {
  const products = await getProducts({});

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

      {products.length > 0 ? (
        <ProductTable products={products} />
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          No products found.
        </div>
      )}
    </div>
  );
}
