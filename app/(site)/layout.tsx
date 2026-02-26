import Navbar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-zinc-950">{children}</main>
      <Footer />
    </div>
  );
}
