"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../shared/LogoutButton";
import { useProfile } from "@/features/profile/hooks/use-profile-queries";
import Image from "next/image";
const navItems = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const admin = useProfile();

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col h-screen">
      <div className="flex h-16 items-center gap-3 px-4">
        <Image
          src={admin.data?.avatar || "/default-avatar.png"}
          alt={admin.data?.firstName || "Avatar"}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black">
            {admin.data?.firstName}
          </span>

          <span className="text-xs text-gray-500">@{admin.data?.username}</span>
        </div>
      </div>
      <hr/>

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
          href="/"
          className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-black transition"
        >
          Back to Homepage
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
