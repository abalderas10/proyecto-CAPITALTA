"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/Spinner'

export function RequireAuth({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (allowedRoles && session?.user && !(allowedRoles.includes(session.user.rol))) {
      // If user is authenticated but doesn't have the right role, maybe redirect to unauthorized or home
      // For now, let's just render a message
    }
  }, [status, session, router, allowedRoles])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null // Will redirect in useEffect
  }

  if (allowedRoles && session?.user && !(allowedRoles.includes(session.user.rol))) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
        <p>No tienes permisos suficientes para acceder a esta página.</p>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Volver al Inicio
        </button>
      </div>
    )
  }

  return <>{children}</>
}
