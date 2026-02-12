import Link from "next/link";
import { Category } from "@/lib/types/category";

interface CategoriesSidebarProps {
  categories: Category[];
  activeCategoryId?: number;
}

export function CategoriesSidebar({
  categories,
  activeCategoryId,
}: CategoriesSidebarProps) {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
      <h2 className="text-lg font-bold mb-4 text-white">Categories</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/products"
            className={`block px-3 py-2 rounded text-sm transition-colors ${
              activeCategoryId === undefined
                ? "bg-zinc-700 text-white font-medium"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            All Categories
          </Link>
        </li>

        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/products?categoryId=${category.id}`}
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                activeCategoryId === category.id
                  ? "bg-zinc-700 text-white font-medium"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
