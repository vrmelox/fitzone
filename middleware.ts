// frontend/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  const { pathname } = request.nextUrl

  // Routes protégées
  const protectedRoutes = ['/dashboard', '/administrateur', '/coach', '/receptionniste', '/utilisateur']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Redirection si pas de token sur route protégée
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirection si token présent sur page de login
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
