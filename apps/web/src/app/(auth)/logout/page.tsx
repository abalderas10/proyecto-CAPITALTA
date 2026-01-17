"use client"
import { signOut } from "next-auth/react"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    signOut({ callbackUrl: "/" })
  }, [])
  return <div className="flex justify-center py-12">Cerrando sesión...</div>
}