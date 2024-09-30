"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const currentPath = window.location.pathname; // Get the current path

    if (token) {
      if (currentPath === "/" || currentPath === "/login") {
        // Redirect authenticated users from login to dashboard
        router.push("/dashboard");
        return;
      }
      // Allow access to /switch and /dashboard if authenticated
      setLoading(false);
    } else {
      if (currentPath !== "/" && currentPath !== "/login") {
        // Redirect non-authenticated users to login if they try to access protected routes
        router.push("/");
        return;
      }
      // Allow access to the login page if not authenticated
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while checking authentication
  }

  return <>{children}</>;
}
