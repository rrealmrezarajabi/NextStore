"use client";

import { useProfile } from "@/features/auth/hooks/use-profile-queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RequireAuthProps = {
  children: React.ReactNode;
};

function AuthGateMessage({
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
      <AuthGateMessage
        title="Checking your session"
        message="Loading your account access..."
      />
    );
  }

  if (profileQuery.isError) {
    return (
      <AuthGateMessage
        title="Session expired"
        message="Redirecting you to sign in again."
      />
    );
  }

  if (!profileQuery.data) {
    return null;
  }

  return children;
}
