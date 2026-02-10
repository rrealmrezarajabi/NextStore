import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "NextStore",
  description: "A modern ecommerece website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
