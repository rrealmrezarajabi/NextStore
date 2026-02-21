"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchbarProps {
  placeholder?: string;
  variant?: "light" | "dark";
}

export function Searchbar({
  placeholder = "Search...",
  variant = "light",
}: SearchbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const isDark = variant === "dark";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Copy existing query params so we don't lose things like "categoryId"
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    // Always reset to page 1 on a new search
    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleClear() {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  // Styles change based on variant — same idea as the shared Pagination component
  const inputClass = isDark
    ? "w-full rounded-lg border border-zinc-700 bg-white py-2 pl-9 pr-9 text-sm text-black outline-none placeholder:text-black focus:border-zinc-500"
    : "w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-9 text-sm text-black outline-none placeholder:text-black focus:border-zinc-400";

  const iconClass = "text-black";

  const buttonClass = isDark
    ? "cursor-pointer rounded-lg border border-zinc-700 bg-black px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800 disabled:opacity-50"
    : "cursor-pointer rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1 max-w-sm">
        {/* Search icon on the left */}
        <Search
          className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />

        {/* Clear (×) button — only shown when there is text */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={` absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? "text-black hover:text-zinc-700" : "text-zinc-400 hover:text-zinc-700"}`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <button type="submit" disabled={isPending} className={buttonClass}>
        {isPending ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
