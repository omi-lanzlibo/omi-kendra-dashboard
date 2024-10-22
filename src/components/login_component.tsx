"use client";

import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const GET_TOKEN = gql`
  mutation getToken($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      user {
        id
        email
        defaultMall {
          id
          name
        }
        firstName
        status
        lastName
        isStaff
        userType
        accessGroup {
          smopUsertypeCode
        }
        userPermissions {
          code
          name
        }
        promoCreator
      }
    }
  }
`;

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [getToken] = useMutation(GET_TOKEN);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting login

    try {
      const { data } = await getToken({ variables: { email, password } });

      if (data?.tokenCreate) {
        const { token, user } = data.tokenCreate;
        const { accessGroup, promoCreator } = user;

        // Check if the smopUsertypeCode is "OMI_ADMIN" and promoCreator is "APP_DEVELOPMENT"
        const hasAdminAccess =
          accessGroup.smopUsertypeCode === "OMI_ADMIN" &&
          promoCreator === "APP_DEVELOPMENT";

        if (hasAdminAccess) {
          // Store the token in localStorage
          localStorage.setItem("authToken", token);
          localStorage.setItem("userEmail", user.email);

          toast({
            title: "Login successful!",
            variant: "default",
          });

          // Navigate to dashboard
          setTimeout(() => {
            router.push("/dashboard");
          }, 500); // Optional delay before redirection
        } else {
          toast({
            title: "Unauthorized access.",
            description: "You do not have the required permissions.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Reset loading state
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
              placeholder="riderlanz@yopmail.com"
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
