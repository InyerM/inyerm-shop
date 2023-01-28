import { NextResponse, NextRequest } from "next/server"
import { adminMiddleware, checkoutMiddleware } from "./middlewares"

export async function middleware(req: NextRequest) {
  const nextPathname = req.nextUrl.pathname
  const { protocol, host, pathname } = req.nextUrl
  if (nextPathname.startsWith("/checkout"))
    return await checkoutMiddleware(req, protocol, host, pathname)
  if (nextPathname.startsWith("/admin") || nextPathname.startsWith("/api/admin"))
    return await adminMiddleware(req, protocol, host, pathname)

  return NextResponse.next()
}

export const config = {
  matcher: ["/checkout/:path/", "/api/admin/:path/", "/admin", "/admin/:path/"],
}
