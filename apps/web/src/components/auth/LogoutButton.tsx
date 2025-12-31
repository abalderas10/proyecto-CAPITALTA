"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50" 
      title="Cerrar Sesión"
    >
      <LogOut className="w-5 h-5" />
    </button>
  )
}
