import type { ReactNode } from "react";

export const FEATURES: {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  imageSrc: string;
  imageAlt: string;
  kicker: string;
  caption: string;
}[] = [
  {
    id: "checkout",
    title: "Fast checkout flow",
    description:
      "A frictionless checkout with saved carts, smart validation, and instant totals.",
    icon: <BoltIcon />,
    imageSrc: "/illustrations/checkout.svg",
    imageAlt: "Checkout illustration",
    kicker: "Checkout",
    caption: "Optimize conversion with a clean, fast purchase experience.",
  },
  {
    id: "delivery",
    title: "Delivery & tracking",
    description:
      "Real-time order status, shipment updates, and clear delivery estimates.",
    icon: <SendIcon />,
    imageSrc: "/illustrations/delivery.svg",
    imageAlt: "Delivery illustration",
    kicker: "Shipping",
    caption: "Keep customers informed from purchase to doorstep.",
  },
  {
    id: "insights",
    title: "Store insights",
    description:
      "Understand what’s selling, what’s not, and where customers drop off.",
    icon: <MoonIcon />,
    imageSrc: "/illustrations/insights.svg",
    imageAlt: "Analytics illustration",
    kicker: "Analytics",
    caption: "Make better decisions with simple, actionable metrics.",
  },
];



function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2L3 14h8l-1 8 11-14h-8l1-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 2 11 13" stroke="currentColor" strokeWidth="2" />
      <path
        d="M22 2 15 22l-4-9-9-4 20-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 13.2A8 8 0 1 1 10.8 3a6.5 6.5 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
