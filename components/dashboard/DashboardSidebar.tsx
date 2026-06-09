"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../shared/LogoutButton";
import Image from "next/image";
import { useProfile } from "@/features/auth/hooks/use-profile-queries";
const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/cart", label: "Cart" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/addresses", label: "Addresses" },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const user = useProfile()
  const isAdmin = user.data?.role === "admin"

  return (
    <aside className="sticky top-0 w-64 border-r border-zinc-200 bg-white flex flex-col h-dvh">
      <div className="flex h-16 items-center gap-3 px-4">
        <Image
          src={user.data?.avatar || "/default-avatar.png"}
          alt={user.data?.firstName || "Avatar"}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black">
            {user.data?.firstName}
          </span>

          <span className="text-xs text-gray-500">@{user.data?.username}</span>
        </div>
      </div>
      <hr />

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
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black transition"
          >
            Go to Admin Panel
          </Link>
        )}
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
