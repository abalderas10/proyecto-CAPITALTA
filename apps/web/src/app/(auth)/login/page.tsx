"use client"
import { useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = async (e: any) => {
    e.preventDefault()
    setError('')
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const data = await r.json()
    if (!r.ok) { setError('Credenciales inválidas'); return }
    localStorage.setItem('token', data.token)
    location.href = '/dashboard'
  }
  return (
    <main className="max-w-sm mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Inicia sesión</h1>
      <form onSubmit={login} className="space-y-4">
        <input className="border rounded px-3 py-2 w-full" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">Entrar</button>
      </form>
    </main>
  )
}
