import { Product } from "@/lib/types/product";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
