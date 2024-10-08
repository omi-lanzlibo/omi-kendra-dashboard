// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken") || ""; // Retrieve token from cookies

  // Check if the token exists
  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token exists, proceed to the requested route
  return NextResponse.next();
}

// Specify which paths should use this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/switch/:path*"], // Apply middleware to specific routes
};
