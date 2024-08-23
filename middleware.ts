import { NextRequest, NextResponse } from "next/server";

import { authenticated } from "~/lib/auth";

export default function middleware(request: NextRequest) {
  const isAuthenticated = authenticated();

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
