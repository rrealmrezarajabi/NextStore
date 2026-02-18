"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  /** Light variant for dark backgrounds (site), default is white/light (admin) */
  variant?: "dark" | "light";
}

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  variant = "light",
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function goTo(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  const from = Math.min((page - 1) * limit + 1, total);
  const to = Math.min(page * limit, total);
  const isDark = variant === "dark";

  // Page numbers to show: always first, last, current ±1, with ellipsis gaps
  function getPageNumbers(): (number | "…")[] {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (page > 3) pages.push("…");
    for (
      let p = Math.max(2, page - 1);
      p <= Math.min(totalPages - 1, page + 1);
      p++
    ) {
      pages.push(p);
    }
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  const btnBase =
    "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-30";

  const btnVariant = isDark
    ? "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
    : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900";

  const activeBtn = isDark
    ? "bg-white text-zinc-900 border border-white font-semibold"
    : "bg-zinc-900 text-white border border-zinc-900 font-semibold";

  return (
    <div
      className={`flex flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between ${
        isDark ? "text-zinc-400" : "text-zinc-500"
      }`}
    >
      {/* Count label */}
      <p className="text-sm">
        {total === 0 ? (
          "No results"
        ) : (
          <>
            Showing{" "}
            <span
              className={`font-medium ${isDark ? "text-white" : "text-zinc-800"}`}
            >
              {from}–{to}
            </span>{" "}
            of{" "}
            <span
              className={`font-medium ${isDark ? "text-white" : "text-zinc-800"}`}
            >
              {total}
            </span>
          </>
        )}
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => goTo(page - 1)}
          disabled={page <= 1 || isPending}
          aria-label="Previous page"
          className={`${btnBase} ${btnVariant}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {getPageNumbers().map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className={`flex h-8 w-8 items-center justify-center text-sm ${
                isDark ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p)}
              disabled={isPending}
              aria-current={p === page ? "page" : undefined}
              className={`${btnBase} ${p === page ? activeBtn : btnVariant}`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages || isPending}
          aria-label="Next page"
          className={`${btnBase} ${btnVariant}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
