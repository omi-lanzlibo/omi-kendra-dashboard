"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";

// Assuming the email is stored in localStorage or similar
const getUserEmail = () => {
  return localStorage.getItem("userEmail");
};

const ProfileSetting = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve email from localStorage or similar
    const email = getUserEmail();
    setUserEmail(email);
  }, []);

  const handleSignOut = async () => {
    try {
      // Clear the user data from localStorage or similar
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");

      toast({
        title: "Logout successful",
        variant: "default",
      });
      router.push("/login"); // Redirect to login page after sign out
    } catch (error: any) {
      toast({
        title: "Error signing out",
        variant: "destructive",
      });
      console.error("Error signing out:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userEmail && (
          <DropdownMenuItem disabled>
            <strong>{userEmail}</strong>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileSetting;
