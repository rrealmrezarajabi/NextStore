import ProductsCarousel from "./ProductsCarousel";

type ApiProduct = {
  id: number;
  title: string;
  price: number;
  images: string[];
  creationAt?: string;
};

async function getLatest() {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=20",
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = (await res.json()) as ApiProduct[];

  const sorted = [...data].sort((a, b) => {
    const da = new Date(a.creationAt ?? 0).getTime();
    const db = new Date(b.creationAt ?? 0).getTime();
    return db - da;
  });

  return sorted.slice(0, 10);
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

          <a
            href="/products"
            className="hidden h-10 items-center justify-center rounded-lg border border-white/15 bg-white/4 px-4 text-sm font-medium text-white/80 transition hover:bg-white/8 sm:inline-flex"
          >
            View all
          </a>
        </div>

        <ProductsCarousel products={products} />

        <div className="mt-8 sm:hidden">
          <a
            href="/products"
            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-white/15 bg-white/4 px-4 text-sm font-medium text-white/80 transition hover:bg-white/8"
          >
            View all products
          </a>
        </div>
      </div>
    </section>
  );
}
