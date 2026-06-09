"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartQuery } from "@/features/cart/hooks/use-cart-queries";
import { useAddCartItemMutation } from "@/features/cart/hooks/use-cart-mutations";

type ProductAddToCartButtonProps = {
  productId: number;
};

export function ProductAddToCartButton({
  productId,
}: ProductAddToCartButtonProps) {
  const { data: cart } = useCartQuery();

  const addCartItem = useAddCartItemMutation();

  const cartItem = cart?.items.find((item) => item.product.id === productId);

  const isPending = addCartItem.isPending;

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={() =>
        addCartItem.mutate({
          productId,
          quantity: 1,
        })
      }
      className="mt-6 h-11 w-full bg-white text-zinc-950 shadow-sm hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400"
    >
      <ShoppingCart className="size-4" />
      Add to cart
    </Button>
  );
}
