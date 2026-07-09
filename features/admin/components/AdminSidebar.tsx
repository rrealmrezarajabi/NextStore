"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/shared/LogoutButton";
import { useProfile } from "@/features/auth/hooks/use-profile-queries";
import Image from "next/image";
import { safeImageSrc } from "@/lib/utils";
const navItems = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const admin = useProfile();

  return (
    <aside className="sticky top-0 w-64 border-r border-zinc-200 bg-white flex flex-col h-dvh">
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
          <Image
            src={safeImageSrc(admin.data?.avatar)}
            alt={`${admin.data?.firstName ?? "Admin"} ${
              admin.data?.lastName ?? ""
            }`.trim()}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black">
            {admin.data?.firstName}
          </span>

          <span className="text-xs text-gray-500">@{admin.data?.username}</span>
        </div>
      </div>
      <hr />

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

      <div className="mt-auto px-2 py-4 border-t border-zinc-200">
        <Link
          href="/dashboard"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black transition"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black transition"
        >
          Back to Homepage
        </Link>
        <LogoutButton redirectToLogin />
      </div>
    </aside>
  );
}
