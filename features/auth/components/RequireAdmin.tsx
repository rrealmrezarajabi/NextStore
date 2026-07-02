"use client";

import { useProfile } from "@/features/auth/hooks/use-profile-queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RequireAdminProps = {
  children: React.ReactNode;
};

function AdminGateMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-zinc-50 px-4 text-center">
      <div>
        <h1 className="text-base font-semibold text-zinc-950">{title}</h1>
        <p className="mt-2 text-sm text-zinc-600">{message}</p>
      </div>
    </div>
  );
}

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
      <AdminGateMessage
        title="Checking admin access"
        message="Loading your account permissions..."
      />
    );
  }

  if (profileQuery.isError) {
    return (
      <AdminGateMessage
        title="Session expired"
        message="Redirecting you to sign in again."
      />
    );
  }

  if (!profileQuery.data) {
    return null;
  }

  if (profileQuery.data.role !== "admin") {
    return (
      <AdminGateMessage
        title="Admin access required"
        message="Redirecting you back to your dashboard."
      />
    );
  }

  return children;
}
