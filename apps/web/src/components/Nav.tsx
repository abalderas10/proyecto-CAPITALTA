"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { apiGet } from "../lib/api"
import { Button } from "./ui/Button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "/productos", label: "Productos" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/proceso", label: "Proceso" },
  { href: "/requisitos", label: "Requisitos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
]

export function Nav() {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const t = localStorage.getItem("token")
    setToken(t)
    if (t) apiGet("/me").then(u => setRole(u?.rol || null)).catch(() => setRole(null))
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/CAPITALTA.svg" alt="Capitalta" className="h-8" />
            <span className="hidden text-xl font-bold text-foreground sm:block">
              Capitalta
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="relative">
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                </span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {!token ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Iniciar Sesión
                </Link>
                <Link href="/solicitud">
                  <Button size="sm" variant="gradient">
                    Cotizar ahora
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {(role === "ANALISTA" || role === "ADMIN") && (
                  <Link
                    href="/admin/solicitudes"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Panel Admin
                  </Link>
                )}
                <Link
                  href="/logout"
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Salir
                </Link>
              </>
            )}
          </div>

          <button className="p-2 text-muted-foreground md:hidden" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="space-y-4 border-t py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleMenu}
                  className={cn(
                    "text-sm font-medium",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <hr />
              {!token ? (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-muted-foreground"
                    onClick={toggleMenu}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link href="/solicitud" onClick={toggleMenu}>
                    <Button className="w-full" variant="gradient">
                      Cotizar ahora
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {(role === "ANALISTA" || role === "ADMIN") && (
                    <Link
                      href="/solicitudes"
                      className="text-sm font-medium text-muted-foreground"
                      onClick={toggleMenu}
                    >
                      Panel Admin
                    </Link>
                  )}
                  <Link
                    href="/logout"
                    className="text-sm font-medium text-red-600"
                    onClick={toggleMenu}
                  >
                    Salir
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
