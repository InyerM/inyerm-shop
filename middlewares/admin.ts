import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export const adminMiddleware = async (
  req: NextRequest,
  protocol: string,
  host: string,
  pathname: string,
) => {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!session) return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`)

  const validRoles = ["admin", "super-user", "SEO"]
  if (!validRoles.includes(session.user.role)) return NextResponse.redirect(`${protocol}//${host}/`)
}
