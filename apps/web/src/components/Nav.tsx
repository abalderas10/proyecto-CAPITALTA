"use client"
import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'
import { Button } from './ui/Button'
import { Menu, X } from 'lucide-react'

export function Nav() {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
    if (t) apiGet<any>('/me').then(u => setRole(u?.rol || null)).catch(() => setRole(null))
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src="/CAPITALTA.svg" alt="Capitalta" className="h-8" />
            <span className="font-bold text-xl text-gray-900 hidden sm:block">Capitalta</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/productos" className="text-sm font-medium text-gray-600 hover:text-teal-600">Productos</a>
            <a href="/calculadora" className="text-sm font-medium text-gray-600 hover:text-teal-600">Calculadora</a>
            <a href="/proceso" className="text-sm font-medium text-gray-600 hover:text-teal-600">Proceso</a>
            <a href="/requisitos" className="text-sm font-medium text-gray-600 hover:text-teal-600">Requisitos</a>
            <a href="/faq" className="text-sm font-medium text-gray-600 hover:text-teal-600">FAQ</a>
            <a href="/contacto" className="text-sm font-medium text-gray-600 hover:text-teal-600">Contacto</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!token ? (
              <>
                <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">Iniciar Sesión</a>
                <a href="/solicitud">
                  <Button size="sm">Cotizar ahora</Button>
                </a>
              </>
            ) : (
              <>
                {(role === 'ANALISTA' || role === 'ADMIN') && (
                  <a href="/admin/solicitudes" className="text-sm font-medium text-gray-600 hover:text-gray-900">Panel Admin</a>
                )}
                <a href="/logout" className="text-sm font-medium text-red-600 hover:text-red-700">Salir</a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t space-y-4">
            <nav className="flex flex-col gap-4">
              <a href="/productos" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Productos</a>
              <a href="/calculadora" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Calculadora</a>
              <a href="/proceso" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Proceso</a>
              <a href="/requisitos" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Requisitos</a>
              <a href="/faq" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>FAQ</a>
              <a href="/contacto" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Contacto</a>
              <hr />
              {!session ? (
                <>
                  <a href="/login" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Iniciar Sesión</a>
                  <a href="/solicitud" onClick={toggleMenu}>
                    <Button className="w-full">Cotizar ahora</Button>
                  </a>
                </>
              ) : (
                <>
                  {(role === 'ANALISTA' || role === 'ADMIN') && (
                    <a href="/solicitudes" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Panel Admin</a>
                  )}
                  <button className="text-sm font-medium text-red-600 text-left" onClick={() => { signOut(); toggleMenu() }}>Salir</button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
