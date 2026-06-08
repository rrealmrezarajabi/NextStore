"use client";

import { useProfile } from "@/features/profile/hooks/use-profile-queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const profileQuery = useProfile();

  useEffect(() => {
    if (profileQuery.isError) {
      router.replace("/login");
    }
  }, [profileQuery.isError, router]);

  if (profileQuery.isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-zinc-50 text-sm text-zinc-600">
        Loading...
      </div>
    );
  }

  if (!profileQuery.data) {
    return null;
  }

  return children;
}
