import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import RequireAuth from "@/features/auth/components/RequireAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-white">
        <div className="flex min-h-screen">
          <aside className="hidden md:block w-64 shrink-0">
            <DashboardSidebar />
          </aside>

          <div className="flex flex-1 min-w-0 flex-col">
            <header className="md:hidden sticky top-0 z-10 border-b bg-white">
              <div className="flex h-14 items-center gap-3 px-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Open sidebar"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="left" className="p-0 w-64">
                    <VisuallyHidden>
                      <SheetTitle>Account navigation</SheetTitle>
                    </VisuallyHidden>

                    <DashboardSidebar />
                  </SheetContent>
                </Sheet>
              </div>
            </header>

            <main className="flex-1">
              <div className="px-4 py-4 md:px-6 md:py-6">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
