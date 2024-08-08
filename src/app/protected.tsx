"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Adjust path as necessary
import LoadingScreen from "@/components/loadingScreen";
import useAuth from "@/hooks/userFirebaseAuth";

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowLoading(false);
    }, 500); // Delay in milliseconds (e.g., 500ms)

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!loading && !showLoading) {
      if (!user) {
        // User is not logged in, redirect to login page
        router.push("/login");
      } else if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/"
      ) {
        // User is logged in but trying to access the login page
        router.push("/dashboard");
      }
    }
  }, [user, loading, showLoading, router]);

  // Show the loading screen while checking authentication state and delay
  if (loading || showLoading) {
    return <LoadingScreen />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedPage;
