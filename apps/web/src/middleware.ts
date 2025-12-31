import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Permitir acceso a rutas públicas
    if (path.startsWith('/login') || path.startsWith('/register') || path === '/') {
      return NextResponse.next()
    }

    // Verificar autenticación para rutas protegidas
    if (!token && path.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Verificar roles si es necesario
    if (path.startsWith('/admin') && token?.rol !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/solicitud/:path*']
}

