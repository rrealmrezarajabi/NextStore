import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Code2,
  Database,
  FileCheck2,
  Github,
  Layers3,
  LockKeyhole,
  Paintbrush,
  ShoppingBag,
  Sparkles,
  Waypoints,
} from "lucide-react";

const projectHighlights = [
  {
    title: "Storefront Experience",
    description:
      "A public ecommerce flow with product listing, product details, search, category filtering, and pagination.",
    icon: ShoppingBag,
  },
  {
    title: "Dashboard Workflows",
    description:
      "Customer dashboard features for profile management, addresses, cart, checkout, order history, and order details.",
    icon: Layers3,
  },
  {
    title: "Admin Panel",
    description:
      "Admin pages for managing products, categories, users, orders, and order status updates.",
    icon: LockKeyhole,
  },
  {
    title: "API Integration",
    description:
      "Typed service layers, React Query hooks, form validation, and an Axios client with cookie-based auth support.",
    icon: Database,
  },
];

const stack = [
  {
    title: "Next.js",
    detail: "App Router",
    icon: Waypoints,
  },
  {
    title: "TypeScript",
    detail: "Typed UI logic",
    icon: Code2,
  },
  {
    title: "React Query",
    detail: "Server state",
    icon: Database,
  },
  {
    title: "React Hook Form",
    detail: "Form handling",
    icon: FileCheck2,
  },
  {
    title: "Zod",
    detail: "Validation schemas",
    icon: LockKeyhole,
  },
  {
    title: "Tailwind CSS",
    detail: "Responsive styling",
    icon: Paintbrush,
  },
  {
    title: "Shadcn UI",
    detail: "UI primitives",
    icon: Boxes,
  },
  {
    title: "Axios",
    detail: "API client",
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
              <Sparkles className="size-4" />
              About the developer and the project
            </p>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              NextStore is a portfolio ecommerce project built by Mohamad Reza
              Rajabi.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">
              I am a FrontEnd Developer focused on building clean, practical,
              and maintainable web applications. NextStore was created as a
              hands-on project to practice real ecommerce flows, authenticated
              dashboards, admin management screens, and API-driven UI patterns
              with modern React and Next.js.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                Explore Products
              </Link>
              <a
                href="https://github.com/rrealmrezarajabi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Github className="size-4" />
                GitHub
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900">
              <Image
                src="/me.jpg"
                alt="Mohamad Reza Rajabi"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>

            <div className="mt-5 flex items-center gap-4">
              <Image
                src="/footer.png"
                alt="NextStore logo"
                width={48}
                height={48}
                className="rounded-full border border-white/10"
              />
              <div>
                <p className="font-semibold text-white">
                  Mohamad Reza Rajabi
                </p>
                <p className="text-sm text-zinc-400">FrontEnd Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-medium text-zinc-400">The project</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              A practical ecommerce frontend with real app structure.
            </h2>
            <p className="mt-4 leading-7 text-zinc-400">
              NextStore is designed to show more than static UI. It includes
              public shopping pages, customer-only areas, admin-only workflows,
              form handling, validation, server data fetching, and client-side
              mutations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projectHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white text-zinc-950">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Code2 className="size-6 text-white" />
              <h2 className="text-2xl font-semibold">Tech stack</h2>
            </div>
            <p className="mt-4 leading-7 text-zinc-400">
              The project uses a modern frontend stack and a feature-based
              folder structure to keep routes, services, hooks, schemas, and UI
              components organized around business domains.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stack.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex min-h-20 items-center gap-4 rounded-xl border border-white/10 bg-zinc-950/80 p-4 transition hover:border-white/20 hover:bg-zinc-900"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white text-zinc-950">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
