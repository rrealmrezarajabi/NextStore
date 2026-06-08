"use client";

import { useProfile } from "@/features/auth/hooks/use-profile-queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RequireAdminProps = {
  children: React.ReactNode;
};

export default function RequireAdmin({ children }: RequireAdminProps) {
  const router = useRouter();
  const profileQuery = useProfile();

  useEffect(() => {
    if (profileQuery.isError) {
      router.replace("/login");
      return;
    }

    if (profileQuery.data && profileQuery.data.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [profileQuery.data, profileQuery.isError, router]);

  if (profileQuery.isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-zinc-50 text-sm text-zinc-600">
        Loading...
      </div>
    );
  }

  if (!profileQuery.data || profileQuery.data.role !== "admin") {
    return null;
  }

  return children;
}
