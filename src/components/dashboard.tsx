"use client";

import Link from "next/link";
import {
  LayoutDashboardIcon,
  SettingsIcon,
  ToggleRight,
  WalletCards,
} from "lucide-react";

import MainSection from "./dashboardComponent";
import ProfileSetting from "./profileSettings";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardScreen() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <WalletCards className="h-6 w-6" />
              <span className="">Kendra Dashboard</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <LayoutDashboardIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/switch"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ToggleRight className="h-4 w-4" />
                Manual Override
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <ProfileSetting />
        </header>
        <MainSection />
      </div>
    </div>
  );
}
