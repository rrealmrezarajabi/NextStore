"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { safeImageSrc } from "@/lib/utils";
import { Category } from "../types";
import { useDeleteCategory } from "../hooks/use-category-mutations";
import { Trash2, SquarePen } from "lucide-react";

export function CategoriesTable({ categories }: { categories: Category[] }) {
  const deleteCategoryMutation = useDeleteCategory();

  async function onDelete(id: number) {
    try {
      await deleteCategoryMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
          <tr>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-zinc-50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
                    <Image
                      src={safeImageSrc(category.image)}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <Link
                    href={`/admin/categories/${category.id}`}
                    className="font-medium text-black hover:underline"
                  >
                    {category.name}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-3 text-zinc-500">#{category.id}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link href={`/admin/categories/${category.id}/edit`}>
                    <Button
                      size="xs"
                      variant="outline"
                      type="button"
                      className="cursor-pointer"
                    >
                      Edit
                      <SquarePen />
                    </Button>
                  </Link>
                  <Button
                    className="cursor-pointer"
                    disabled={deleteCategoryMutation.isPending}
                    onClick={() => onDelete(category.id)}
                    size="xs"
                    variant="destructive"
                    type="button"
                  >
                    Delete
                    <Trash2 />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
