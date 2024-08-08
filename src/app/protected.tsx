"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFirebaseAuth from "@/hooks/userFirebaseAuth";
import LoadingScreen from "@/components/loadingScreen";

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !redirecting) {
      if (!user) {
        // User is not logged in, redirect to login page
        setRedirecting(true);
        router.push("/login");
      } else if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/"
      ) {
        // User is logged in but trying to access the login page
        setRedirecting(true);
        router.push("/dashboard");
      }
    }
  }, [user, loading, router, redirecting]);

  // Show the loading screen while checking authentication state
  if (loading || redirecting) {
    return <LoadingScreen />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedPage;
