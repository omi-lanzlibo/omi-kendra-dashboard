"use client";

import { ProtectedRoute } from "@/components/protected";

import { LoginForm } from "@/components/login_component";

export default function Home() {
  return (
    // <ProtectedRoute>
    <LoginForm></LoginForm>
    // </ProtectedRoute>
  );
}
