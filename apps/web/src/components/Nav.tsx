"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/Button'
import { Menu, X } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export function Nav() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/CAPITALTA.svg" alt="Capitalta" className="h-8" />
            <span className="font-bold text-xl text-gray-900 hidden sm:block">Capitalta</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/productos" className="text-sm font-medium text-gray-600 hover:text-teal-600">Productos</Link>
            <Link href="/calculadora" className="text-sm font-medium text-gray-600 hover:text-teal-600">Calculadora</Link>
            <Link href="/proceso" className="text-sm font-medium text-gray-600 hover:text-teal-600">Proceso</Link>
            <Link href="/requisitos" className="text-sm font-medium text-gray-600 hover:text-teal-600">Requisitos</Link>
            <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-teal-600">FAQ</Link>
            <Link href="/contacto" className="text-sm font-medium text-gray-600 hover:text-teal-600">Contacto</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!session ? (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">Iniciar Sesión</Link>
                <Link href="/solicitud">
                  <Button size="sm">Cotizar ahora</Button>
                </Link>
              </>
            ) : (
              <>
                {(session.user?.rol === 'ANALISTA' || session.user?.rol === 'ADMIN') && (
                  <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Dashboard</Link>
                )}
                <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm font-medium text-red-600 hover:text-red-700">Salir</button>
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
              <Link href="/productos" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Productos</Link>
              <Link href="/calculadora" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Calculadora</Link>
              <Link href="/proceso" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Proceso</Link>
              <Link href="/requisitos" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Requisitos</Link>
              <Link href="/faq" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>FAQ</Link>
              <Link href="/contacto" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Contacto</Link>
              <hr />
              {!session ? (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Iniciar Sesión</Link>
                  <Link href="/solicitud" onClick={toggleMenu}>
                    <Button className="w-full">Cotizar ahora</Button>
                  </Link>
                </>
              ) : (
                <>
                  {(session.user?.rol === 'ANALISTA' || session.user?.rol === 'ADMIN') && (
                    <Link href="/dashboard" className="text-sm font-medium text-gray-600" onClick={toggleMenu}>Dashboard</Link>
                  )}
                  <button className="text-sm font-medium text-red-600 text-left" onClick={() => { signOut({ callbackUrl: '/' }); toggleMenu() }}>Salir</button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
