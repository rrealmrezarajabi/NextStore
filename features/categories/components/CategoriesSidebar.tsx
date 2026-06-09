import Link from "next/link";
import { Category } from "../types";

interface CategoriesSidebarProps {
  categories: Category[];
  activeCategoryId?: number;
}

export function CategoriesSidebar({
  categories,
  activeCategoryId,
}: CategoriesSidebarProps) {
  return (
    <aside className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 lg:p-4">
      <h2 className="mb-3 text-sm font-bold text-white lg:text-lg">
        Categories
      </h2>

      <ul className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
        <li className="shrink-0">
          <Link
            href="/products"
            className={`block whitespace-nowrap rounded px-3 py-2 text-sm transition-colors ${
              activeCategoryId === undefined
                ? "bg-zinc-700 font-medium text-white"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            All Categories
          </Link>
        </li>

        {categories.map((category) => (
          <li key={category.id} className="shrink-0">
            <Link
              href={`/products?categoryId=${category.id}`}
              className={`block whitespace-nowrap rounded px-3 py-2 text-sm transition-colors ${
                activeCategoryId === category.id
                  ? "bg-zinc-700 font-medium text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
