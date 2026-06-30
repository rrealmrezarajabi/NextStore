"use client";

import { useParams, notFound } from "next/navigation";
import { useProduct } from "@/features/products/hooks/use-product-queries";
import { ProductForm } from "@/features/products/components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const productId = Number(params.id);

  if (!Number.isFinite(productId)) {
    notFound();
  }

  const productQuery = useProduct(productId);

  if (productQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-zinc-500">
        Loading product...
      </div>
    );
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-red-500">
        Could not load product.
      </div>
    );
  }

  return (
    <ProductForm
      mode="edit"
      productId={productId}
      product={productQuery.data}
    />
  );
}
