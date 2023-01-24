import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export const checkoutMiddleware = async (
  req: NextRequest,
  protocol: string,
  host: string,
  pathname: string,
) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!session) return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`)
}
