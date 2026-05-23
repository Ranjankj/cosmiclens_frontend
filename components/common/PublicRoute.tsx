"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/userHome");
    }
  }, [isAuthenticated, loading, router]);

  // Wait for auth hydration
  if (loading) {
    return null;
  }

  // Block page render
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
