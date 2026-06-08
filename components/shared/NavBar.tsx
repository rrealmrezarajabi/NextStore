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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export default function Navbar() {
  const profileQuery = useProfile();
  const user = profileQuery.data;
  const isAdmin = user?.role === "admin";

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
                <Button asChild variant="outline">
                  <Link href="/admin">
                    <Shield />
                    Admin
                  </Link>
                </Button>
              )}

              <Button asChild>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
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

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/products">Products</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>

              {user ? (
                <>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Shield />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <LogIn />
                      Login
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/register">
                      <UserPlus />
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
