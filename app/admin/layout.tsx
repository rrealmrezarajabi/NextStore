import * as React from "react";
import { Menu } from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 shrink-0 border-r">
          <AdminSidebar />
        </aside>

        <div className="flex flex-1 min-w-0 flex-col">
          {/* Mobile header + drawer */}
          <header className="md:hidden sticky top-0 z-10 border-b bg-white">
            <div className="flex h-14 items-center gap-3 px-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open sidebar">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="p-0 w-64">
                  {/* Required for accessibility */}
                  <VisuallyHidden>
                    <SheetTitle>Admin navigation</SheetTitle>
                  </VisuallyHidden>

                  <AdminSidebar />
                </SheetContent>
              </Sheet>

              <div className="text-sm font-medium">Admin</div>
            </div>
          </header>

          <main className="flex-1">
            <div className="px-4 py-4 md:px-6 md:py-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
