import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt' // <-- Wajib import ini

export async function middleware(request: NextRequest) {
  // 1. AMBIL TOKEN DARI NEXTAUTH (Bukan cookie manual lagi)
  // getToken otomatis membaca cookie 'next-auth.session-token'
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET // Pastikan ini ada di .env
  })

  const isAuthenticated = !!token; // True jika token ada, False jika null

  // 2. DAFTAR HALAMAN PUBLIK (Bebas akses tanpa login)
  const publicPaths = [
    '/login', 
    '/register/student', 
    '/register/school', 
    '/register/teacher', 
    '/tv'
  ]
  
  const pathname = request.nextUrl.pathname
  
  // Cek apakah user sedang di halaman public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // --- LOGIKA PENGAMANAN ---

  // A. Jika BELUM login, tapi maksa masuk halaman private (Dashboard, dll)
  //    -> Tendang ke Login
  if (!isAuthenticated && !isPublicPath) {
    // Redirect ke login, tapi simpan url tujuan (callbackUrl) biar UX bagus
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // B. Jika SUDAH login, tapi iseng buka halaman Login/Register
  //    -> Tendang ke Dashboard (Ngapain login lagi?)
  if (isAuthenticated && isPublicPath) {
    // Kecuali halaman /tv mungkin boleh diakses walau sudah login?
    // Jika /tv harus public only, biarkan. Jika fleksibel, hapus pengecualiannya.
    if (pathname.startsWith('/tv')) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Konfigurasi agar middleware tidak mencegat file statis & API NextAuth
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}