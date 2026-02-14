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
          <div className="px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
