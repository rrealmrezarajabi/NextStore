import type { Product } from "@/features/products/types";

export function buildProductCategoryData(products: Product[]) {
  const counts = products.reduce<Record<string, number>>((acc, product) => {
    const categoryName = product.category?.name ?? "Uncategorized";
    acc[categoryName] = (acc[categoryName] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([name, products]) => ({ name, products }))
    .sort((a, b) => b.products - a.products)
    .slice(0, 6);
}
