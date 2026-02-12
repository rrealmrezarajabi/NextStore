import Link from "next/link";
import Image from "next/image";
import { safeImageSrc } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types/product";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images?.[0] ?? "";

  return (
    <Link href={`/products/${product.id}`} className="block">
      <Card className="py-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-sm transition hover:border-zinc-700 hover:bg-zinc-900/30">
        <div className="relative aspect-4/3 w-full bg-zinc-900">
          {cover ? (
            <Image
              src={safeImageSrc(cover)}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : null}
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
              {product.title}
            </h3>
            <span className="shrink-0 rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-200">
              ${product.price}
            </span>
          </div>

          <p className="mt-2 text-xs text-zinc-400">{product.category.name}</p>

          <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
            {product.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
