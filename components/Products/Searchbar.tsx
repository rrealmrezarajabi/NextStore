"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";

  const [value, setValue] = useState(currentSearch);
  const [showSpinner , setShowSpinner] = useState(false)

  function handleSearch() {

    setShowSpinner(true)
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    setValue("");
    
    setTimeout(() => {
      setShowSpinner(false); 
    }, 400);
    
  }

  return (
    <div className="flex gap-2 max-w-md">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
        />

        {value && (
          <button
            onClick={() => {
              setValue("");
              const params = new URLSearchParams(searchParams.toString());
              params.delete("search");
              router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      <button
        onClick={handleSearch}
        disabled={showSpinner}
        className="px-5 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white font-medium flex items-center justify-center"
      >
        {showSpinner ? <Spinner /> : "Search"}
      </button>
    </div>
  );
}
