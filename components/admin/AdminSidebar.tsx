"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="text-sm font-semibold tracking-tight text-black">
          Admin Panel
        </div>
      </div>

      <nav className="px-2 py-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-black text-white"
                    : "text-zinc-800 hover:bg-zinc-100 hover:text-black",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      
    </aside>
  );
}
