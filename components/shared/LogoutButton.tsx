"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/use-auth-mutations";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <Button className="cursor-pointer"
      type="button"
      variant="ghost"
      disabled={logoutMutation.isPending}
      onClick={() => logoutMutation.mutate()}
    >
      <LogOut />
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
