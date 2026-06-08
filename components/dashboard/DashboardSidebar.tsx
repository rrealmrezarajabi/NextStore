"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../shared/LogoutButton";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/cart", label: "Cart" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/addresses", label: "Addresses" },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <div>
          <div className="text-sm font-semibold tracking-tight text-black">
            My Account
          </div>
          <div className="text-xs text-zinc-500">User Panel</div>
        </div>
      </div>

      <nav className="px-2 py-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

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

      <div className="mt-auto px-2 py-4 border-t border-zinc-200 space-y-1">
        <Link
          href="/"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black transition"
        >
           Back to Shop
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
