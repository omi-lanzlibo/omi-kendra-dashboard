"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const currentPath = window.location.pathname; // Get the current path

    if (token) {
      if (currentPath === "/login") {
        // If the user is on the login page but already has a token, redirect to the dashboard
        router.push("/dashboard");
      }
    } else {
      if (currentPath !== "/login") {
        // If the user is not on the login page and doesn't have a token, redirect to the login page
        router.push("/login");
      }
    }
  }, [router]);

  return <>{children}</>;
}
