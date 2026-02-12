"use client";

import Image from "next/image";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { safeImageSrc } from "@/lib/utils";
type ApiProduct = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export default function ProductsCarousel({
  products,
}: {
  products: ApiProduct[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollByCards(dir: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85);
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center">
        <button
          type="button"
          onClick={() => scrollByCards("left")}
          className="pointer-events-auto ml-2 hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur transition hover:bg-black/55 sm:flex"
          aria-label="Scroll left"
        >
          ‹
        </button>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center">
        <button
          type="button"
          onClick={() => scrollByCards("right")}
          className="pointer-events-auto mr-2 hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur transition hover:bg-black/55 sm:flex"
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   snap-x snap-mandatory"
      >
        {products.map((p) => (
          <a key={p.id} href={`/products/${p.id}`} className="snap-start">
            <Card className="w-65 overflow-hidden border-white/10 bg-white/3 py-0 transition hover:-translate-y-1 hover:bg-white/5">
              <CardContent className="p-0">
                <div className="relative h-42.5 w-full bg-zinc-900/50">
                  <Image
                    src={safeImageSrc(p.images?.[0])}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="260px"
                    priority={false}
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-4">
                  <p className="line-clamp-1 text-sm font-semibold text-white">
                    {p.title}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="rounded-full border border-white/10 bg-black/40 px-5 py-1 text-xs text-white/85 backdrop-blur">
                      ${p.price}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-xs text-white/70 hover:bg-white/6 hover:text-white"
                    >
                      Details →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
