export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]
        bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]
        bg-size-[72px_72px]"
      />

      <div
        className="pointer-events-none absolute inset-0
        bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_60%,rgba(0,0,0,0.9)_100%)]"
      />

      <div className="pointer-events-none absolute -right-10 top-12 h-60 w-60 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute left-28 top-48 h-28 w-28 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-white/6" />

      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-sm text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            Modern eCommerce Experience
          </p>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Build your next
            <span className="block bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
              shopping experience
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
            NextStore helps you showcase products beautifully, manage your store
            effortlessly, and deliver a smooth checkout experience.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-7 text-sm font-medium text-zinc-950 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              View Products
            </a>

            <a
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/15 bg-white/4 px-7 text-sm font-medium text-white/80 transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              About NextStore
            </a>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3 text-white/50">
            <div className="h-10 w-px bg-white/25" />
            <span className="text-sm">Explore the platform</span>
          </div>
        </div>
      </div>
    </section>
  );
}
