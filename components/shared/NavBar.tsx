"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/features/auth/hooks/use-profile-queries";
import {
  LayoutDashboard,
  LogIn,
  Menu,
  Shield,
  UserPlus,
  Handbag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { useCartQuery } from "@/features/cart/hooks/use-cart-queries";

export default function Navbar() {
  const profileQuery = useProfile();
  const user = profileQuery.data;
  const isAdmin = user?.role === "admin";
  const { data: cart } = useCartQuery();

  return (
    <header className="border-b bg-white/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" width={36} height={36} alt="logo" priority />
          <span className="text-lg font-semibold">NextStore</span>
        </Link>

        <nav className="hidden gap-10 font-bold text-zinc-700 md:flex">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              {isAdmin && (
                <Button asChild>
                  <Link href="/admin">
                    <Shield />
                    Admin
                  </Link>
                </Button>
              )}

              <Button asChild variant="ghost">
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </Button>
              <Button asChild variant="ghost" className="relative">
                <Link href="/dashboard/cart">
                  <Handbag />
                  Cart
                  {cart?.items.length ? (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                      {cart?.items.length}
                    </span>
                  ) : null}
                </Link>
              </Button>

              <LogoutButton />
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">
                  <LogIn />
                  Login
                </Link>
              </Button>

              <Button asChild>
                <Link href="/register">
                  <UserPlus />
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/products">Products</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>

              <div className="my-1 h-px bg-zinc-200" />

              {user ? (
                <>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/cart"
                      className="flex w-full items-center justify-between"
                    >
                      <span className="flex items-center">
                        <Handbag className="mr-2 h-4 w-4" />
                        Cart
                      </span>

                      {cart?.items.length ? (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs text-white">
                          {cart.items.length}
                        </span>
                      ) : null}
                    </Link>
                  </DropdownMenuItem>

                  <div className="my-1 h-px bg-zinc-200" />

                  <div className="px-2 py-1">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
