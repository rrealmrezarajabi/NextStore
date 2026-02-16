import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextStore",
  description: "A modern ecommerece website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
