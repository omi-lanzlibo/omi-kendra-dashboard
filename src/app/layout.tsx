import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/lib/provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kendra Dashboard",
  description: "Kendra Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <Head>
        {/* Preload links or other meta tags */}
        <link
          rel="preload"
          href="https://d3qsll4vd5jjt6.cloudfront.net/_next/static/media/a34f9d1faa5f3315-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body
        className={cn(
          "h-full w-full bg-white text-black flex flex-col",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        <div className="flex-grow flex items-center justify-center">
          <Provider>{children}</Provider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
