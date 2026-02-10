"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" width={36} height={36} alt="logo" priority />
          <span className="text-lg font-semibold">NextStore</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="hidden md:flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>

          <Button asChild>
            <Link href="/signup">
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Link>
          </Button>
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

              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/signup" className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
