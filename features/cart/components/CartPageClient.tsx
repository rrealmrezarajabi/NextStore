"use client";

import Link from "next/link";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartQuery } from "../hooks/use-cart-queries";
import {
  useClearCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../hooks/use-cart-mutations";

export function CartPageClient() {
  const { data: cart, isLoading, isError } = useCartQuery();

  const updateCartItem = useUpdateCartItemMutation();
  const removeCartItem = useRemoveCartItemMutation();
  const clearCart = useClearCartMutation();

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div>
          <p className="text-sm font-medium text-zinc-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-950">My Cart</h1>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-5 w-36 animate-pulse rounded bg-zinc-200" />
          <div className="mt-5 space-y-3">
            <div className="h-20 animate-pulse rounded-xl bg-zinc-100" />
            <div className="h-20 animate-pulse rounded-xl bg-zinc-100" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h1 className="text-xl font-bold">Failed to load cart</h1>
        <p className="mt-2 text-sm text-red-700">
          Please refresh the page or try again in a moment.
        </p>
      </section>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-6 py-5">
          <p className="text-sm font-medium text-zinc-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-950">My Cart</h1>
        </div>

        <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-zinc-950 text-white">
            <ShoppingBag className="size-6" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-zinc-950">
            Your cart is empty
          </h2>
          <p className="mt-2 max-w-sm text-sm text-zinc-500">
            Find something you like and add it here before checkout.
          </p>
          <Button asChild className="mt-6 bg-zinc-950 hover:bg-zinc-800">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-zinc-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-950">My Cart</h1>
        </div>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="size-5 text-zinc-950" />
              <h2 className="font-semibold text-zinc-950">
                Cart items
              </h2>
            </div>
            <span className="text-sm text-zinc-500">
              {cart.totalItems} {cart.totalItems === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="divide-y divide-zinc-100">
            {cart.items.map((item) => {
              const itemPending =
                updateCartItem.isPending || removeCartItem.isPending;

              return (
                <article
                  key={item.id}
                  className="grid gap-4 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="line-clamp-2 font-semibold text-zinc-950 transition hover:text-zinc-600"
                    >
                      {item.product.title}
                    </Link>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500">
                      <span>${item.product.price} each</span>
                      <span className="font-medium text-zinc-800">
                        ${item.subtotal} subtotal
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <div className="flex h-10 items-center rounded-md border border-zinc-200 bg-zinc-50">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={item.quantity <= 1 || itemPending}
                        aria-label={`Decrease quantity of ${item.product.title}`}
                        onClick={() =>
                          updateCartItem.mutate({
                            id: item.id,
                            payload: { quantity: item.quantity - 1 },
                          })
                        }
                        className="rounded-r-none text-zinc-900 hover:bg-zinc-200"
                      >
                        <Minus className="size-4" />
                      </Button>

                      <span className="w-10 text-center text-sm font-semibold text-zinc-950">
                        {item.quantity}
                      </span>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={itemPending}
                        aria-label={`Increase quantity of ${item.product.title}`}
                        onClick={() =>
                          updateCartItem.mutate({
                            id: item.id,
                            payload: { quantity: item.quantity + 1 },
                          })
                        }
                        className="rounded-l-none text-zinc-900 hover:bg-zinc-200"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={removeCartItem.isPending}
                      aria-label={`Remove ${item.product.title}`}
                      onClick={() => removeCartItem.mutate(item.id)}
                      className="text-zinc-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-zinc-200 bg-zinc-950 p-5 text-white shadow-sm">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4 text-zinc-300">
              <span>Total items</span>
              <span className="font-medium text-white">{cart.totalItems}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-zinc-800 pt-4">
              <span className="text-zinc-300">Total</span>
              <span className="text-xl font-bold">${cart.total}</span>
            </div>
          </div>

          <Button
            asChild
            className="mt-6 w-full bg-white text-zinc-950 hover:bg-zinc-200"
          >
            <Link href="/dashboard/cart/checkout">
              Place order
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            type="button"
            disabled={clearCart.isPending}
            onClick={() => clearCart.mutate()}
            variant="outline"
            className="mt-3 w-full border-zinc-700 bg-transparent text-white hover:bg-white hover:text-zinc-950"
          >
            <Trash2 className="size-4" />
            Clear cart
          </Button>
        </aside>
      </div>
    </section>
  );
}
