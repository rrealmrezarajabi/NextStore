import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import { getSession } from "@/lib/auth/get-session";

export const metadata: Metadata = {
  title: "NextStore",
  description: "A modern ecommerce website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <html lang="en">
      <body>
        <Providers initialUser={user}>{children}</Providers>
      </body>
    </html>
  );
}
