"use client"
import { useSession } from 'next-auth/react'

export function RequireAuth({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { data: session, status } = useSession()

  if (status === "loading") return <div className="max-w-4xl mx-auto px-4 py-8">Cargando…</div>
  
  if (!session) return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <div className="text-lg">Necesitas iniciar sesión para acceder.</div>
      <a href="/login" className="px-4 py-2 bg-black text-white rounded">Ir a Login</a>
    </div>
  )

  const userRole = (session.user as any).rol
  
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) return (
    <div className="max-w-4xl mx-auto px-4 py-8">No tienes permisos para acceder.</div>
  )

  return <>{children}</>
}
