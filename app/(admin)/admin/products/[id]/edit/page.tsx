"use client";

import { useParams } from "next/navigation";
import { useAllCategories } from "@/features/categories/hooks/use-category-queries";
import { useProduct } from "@/features/products/hooks/use-product-queries";
import { ProductForm } from "@/features/products/components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const productId = Number(params.id);

  const productQuery = useProduct(productId);
  const categoriesQuery = useAllCategories();

  if (productQuery.isLoading || categoriesQuery.isLoading) {
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
