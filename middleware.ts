import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // 1. AMBIL TOKEN (DENGAN HARDCODE SECRET)
  // Kita hardcode secret di sini agar SAMA dengan route.ts
  // Jika secret beda/tidak terbaca, token dianggap invalid -> Login Loop.
  const token = await getToken({ 
    req: request, 
    secret: "rahasia-dapur-sinau-paling-aman-sedunia-2024" // <--- WAJIB SAMA DENGAN route.ts
  })

  const isAuthenticated = !!token; // True jika login berhasil

  // 2. Daftar Halaman Publik
  const publicPaths = [
    '/login', 
    '/register/student', 
    '/register/school', 
    '/register/teacher', 
    '/tv'
  ]
  
  const pathname = request.nextUrl.pathname
  
  // Cek apakah user di halaman public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // --- LOGIKA PENGAMANAN ---

  // A. Redirect ke Login jika belum auth & coba akses halaman private
  if (!isAuthenticated && !isPublicPath) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // B. Redirect ke Dashboard jika sudah auth & coba akses halaman login
  if (isAuthenticated && isPublicPath) {
    // Pengecualian untuk halaman TV (mungkin mau dipakai buat display kelas)
    if (pathname.startsWith('/tv')) {
        return NextResponse.next();
    }
    
    // Redirect user berdasarkan role (Opsional, atau lempar ke dashboard umum)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Matcher: Semua halaman KECUALI api, static files, gambar, favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}