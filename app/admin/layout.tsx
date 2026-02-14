import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center border-b border-zinc-200 bg-white/80 px-6 backdrop-blur">
            <div className="text-sm font-medium text-zinc-900">Dashboard</div>
          </header>

          <div className="px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
