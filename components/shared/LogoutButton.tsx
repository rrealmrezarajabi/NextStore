"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/use-auth-mutations";
import { LogOut } from "lucide-react";

type LogoutButtonProps = {
  redirectToLogin?: boolean;
};

export function LogoutButton({ redirectToLogin = false }: LogoutButtonProps) {
  const logoutMutation = useLogout({ redirectToLogin });

  return (
    <Button
      className="cursor-pointer"
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
