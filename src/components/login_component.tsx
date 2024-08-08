"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; // Adjust the path as necessary
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "./ui/use-toast";

// Define a mapping of Firebase Auth error codes to custom messages
const errorMessages: { [key: string]: string } = {
  "auth/invalid-credential": "Invalid credential",
  "auth/too-many-requests":
    "Too many failed login attempts. Please try again later.",
};

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // Use effect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      toast({
        title: "Email and Password are required.",
        variant: "default",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login successfully.",
        variant: "default",
      });
      router.push("/dashboard");
    } catch (error) {
      const firebaseError = error as AuthError; // Cast error to AuthError type
      const errorMessage =
        errorMessages[firebaseError.code] || firebaseError.message;
      toast({
        title: errorMessage,
        variant: "default",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="kendra@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
