import { getProduct } from "@/lib/api/product";
import Image from "next/image";
import { safeImageSrc } from "@/lib/utils";
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const productId = Number(id);
  const product = await getProduct(productId);
  const cover = product.images?.[0] ?? "";

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            {cover ? (
              <Image
                src={safeImageSrc(cover)}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : null}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="mt-2 text-sm text-zinc-400">
              {product.category.name}
            </p>

            <p className="mt-4 text-xl font-semibold">${product.price}</p>
            <p className="mt-4 text-sm text-zinc-300">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
