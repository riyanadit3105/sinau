// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Cek cookie auth (simulasi token)
  const isAuthenticated = request.cookies.get('sinau_token')

  // Daftar path yang boleh diakses tanpa login
  const publicPaths = ['/login', '/register/student', '/register/school','/register/teacher', '/tv']
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // Jika belum login dan mencoba akses halaman private -> redirect ke login
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika sudah login tapi akses halaman login/register -> redirect ke dashboard
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}