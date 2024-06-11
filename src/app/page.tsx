"use client";
import { DashboardScreen } from "@/components/dashboard";
import LoginPage from "./login/page";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      window.location.href = "/dashboard"; // Redirect client-side
    }
  }, []);
  return <LoginPage></LoginPage>;
}
