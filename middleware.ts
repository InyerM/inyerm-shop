import { NextResponse, NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(req: NextRequest) {
  if( req.nextUrl.pathname.startsWith('/checkout') ) {
    const token = req.cookies.get('token')

    try {

      await jose.jwtVerify(token?.value || '', new TextEncoder().encode(process.env.JWT_SECRET))
      return NextResponse.next()

    } catch (error) {

      const { protocol, host, pathname } = req.nextUrl

      return NextResponse.redirect(
        `${protocol}//${host}/auth/login?p=${pathname}`
      )
    }
  }
}

export const config = {
  matcher: ['/checkout/:path/'],
}