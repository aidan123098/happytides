import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Enable/disable waitlist mode with this environment variable
  const waitlistModeEnabled = process.env.NEXT_PUBLIC_WAITLIST_MODE === "true"

  if (!waitlistModeEnabled) {
    return NextResponse.next()
  }

  // Allow the waitlist page to be accessed
  if (request.nextUrl.pathname === "/launch-access") {
    return NextResponse.next()
  }

  // Allow API routes to pass through
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Redirect all other routes to the waitlist page
  return NextResponse.redirect(new URL("/launch-access", request.url))
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
