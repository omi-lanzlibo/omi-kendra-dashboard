"use client";

import ProtectedPage from "./protected";
import { LoginForm } from "@/components/login_component";

export default function Home() {
  return (
    <ProtectedPage>
      <LoginForm></LoginForm>
    </ProtectedPage>
  );
}
