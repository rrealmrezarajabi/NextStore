"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/shared/Pagination";
import { Searchbar } from "@/components/shared/Searchbar";
import { useProducts } from "../hooks/use-product-queries";
import { ProductTable } from "./ProductTable";

const LIMIT = 10;

export function AdminProductsPageClient() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() || undefined;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const productsQuery = useProducts({ title: search, page, limit: LIMIT });

  const products = productsQuery.data?.data ?? [];
  const meta = productsQuery.data?.meta;

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

      <Searchbar variant="dark" placeholder="Search products..." />

      {productsQuery.isLoading ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Loading products...
        </div>
      ) : products.length > 0 && meta ? (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <ProductTable products={products} />
          <Pagination
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
