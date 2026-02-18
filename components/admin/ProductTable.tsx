"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { safeImageSrc } from "@/lib/utils";
import { Product } from "@/lib/types/product";
import { deleteProduct } from "@/lib/api/product";
export function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();

  async function onDelete(id: number) {
    try {
      await deleteProduct(id);
      router.refresh();
    } catch (error) {
      if (error instanceof Error && error.message.includes("(404")) {
        router.refresh();
        return;
      }
      console.error("Failed to delete product", error);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
          <tr>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {products.map((product) => {
            const cover = product.images?.[0];

            return (
              <tr key={product.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
                      <Image
                        src={safeImageSrc(cover)}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="font-medium text-black hover:underline"
                      >
                        {product.title}
                      </Link>
                      <div className="text-xs text-zinc-500">
                        ID {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-700">
                  {product.category?.name ?? "Uncategorized"}
                </td>
                <td className="px-4 py-3 text-zinc-700">${product.price}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="xs"
                      variant="outline"
                      type="button"
                      className="cursor-pointer"
                    >
                      Edit Product
                    </Button>
                    <Button
                      className="cursor-pointer"
                      onClick={() => onDelete(product.id)}
                      size="xs"
                      variant="destructive"
                      type="button"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
