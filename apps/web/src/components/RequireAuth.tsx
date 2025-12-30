"use client"
import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

export function RequireAuth({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
    if (t) apiGet('/me').then(u => setRole(u?.rol || null)).catch(() => setRole(null))
  }, [])
  if (token === null) return <div className="max-w-4xl mx-auto px-4 py-8">Cargando…</div>
  if (!token) return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <div className="text-lg">Necesitas iniciar sesión para acceder.</div>
      <a href="/login" className="px-4 py-2 bg-black text-white rounded">Ir a Login</a>
    </div>
  )
  if (allowedRoles && role && !allowedRoles.includes(role)) return (
    <div className="max-w-4xl mx-auto px-4 py-8">No tienes permisos para acceder.</div>
  )
  return <>{children}</>
}
