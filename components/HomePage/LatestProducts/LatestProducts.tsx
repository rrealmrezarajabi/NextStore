import Link from "next/link";
import ProductsCarousel from "./ProductsCarousel";
import { getProducts } from "@/lib/api/product";

async function getLatest() {
  const { data } = await getProducts({ limit: 20, cacheMode: "revalidate" });

  return [...data].sort((a, b) => b.id - a.id).slice(0, 10);
}

export default async function LatestProducts() {
  const products = await getLatest();

  return (
    <section className="relative bg-zinc-950 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-white/60">Just dropped</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Latest Products
            </h2>
          </div>
          <Link href={"/products"}>
            {" "}
            <div className="hidden h-10 items-center justify-center rounded-lg border border-white/15 bg-white/4 px-4 text-sm font-medium text-white/80 transition hover:bg-white/8 sm:inline-flex">
              {" "}
              View All
            </div>
          </Link>
        </div>

        <ProductsCarousel products={products} />

        <div className="mt-8 sm:hidden">
          <Link href={"/products"}>
            {" "}
            <div className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-white/15 bg-white/4 px-4 text-sm font-medium text-white/80 transition hover:bg-white/8">
              {" "}
              View All
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
