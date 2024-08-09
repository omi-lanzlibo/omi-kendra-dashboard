"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/userFirebaseAuth"; // Adjust path as necessary
import LoadingScreen from "@/components/loadingScreen";

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/"
      ) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
