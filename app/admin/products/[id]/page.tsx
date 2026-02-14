import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/api/product";
import { safeImageSrc } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const productId = Number(id);
  const product = await getProduct(productId);
  const cover = product.images?.[0];
  const categoryName = product.category?.name ?? "Uncategorized";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-black">Product details</h1>
          <p className="text-sm text-zinc-600">
            View listing info and catalog details.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild>
            <Link href="/admin/products">Back to products</Link>
          </Button>

          <Button variant="outline" type="button">
            Edit
          </Button>
          <Button variant="destructive" type="button">
            Delete
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
            <Image
              src={safeImageSrc(cover)}
              alt={product.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black">
              {product.title}
            </h2>
            <div className="mt-2 inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-800">
              {categoryName}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Product ID
            </div>
            <div className="mt-1 text-sm font-medium text-zinc-900">
              {product.id}
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Slug
            </div>
            <div className="mt-1 truncate text-sm text-zinc-700">
              {product.slug}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-zinc-900">
            Listing details
          </h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                Price
              </div>
              <div className="mt-1 text-sm text-zinc-700">${product.price}</div>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                Category
              </div>
              <div className="mt-1 text-sm text-zinc-700">{categoryName}</div>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4 sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                Description
              </div>
              <div className="mt-1 text-sm text-zinc-700">
                {product.description || "—"}
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4 sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                Images
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.images?.length ? (
                  product.images.map((image, index) => (
                    <span
                      key={`${image}-${index}`}
                      className="max-w-full truncate rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700"
                    >
                      {image}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-600">—</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
