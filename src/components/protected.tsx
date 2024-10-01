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
        // Redirect authenticated users from home or login to dashboard
        router.push("/dashboard");
        return;
      }
      setLoading(false); // Allow access to other pages if authenticated
    } else {
      if (currentPath !== "/") {
        // Redirect non-authenticated users to login if they try to access any route other than "/"
        router.push("/");
        return;
      }
      setLoading(false); // Allow access to the login page if not authenticated
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while checking authentication
  }

  return <>{children}</>;
}
