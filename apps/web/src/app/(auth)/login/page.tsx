"use client"
import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const { toast } = useToast()

  const login = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error de inicio de sesión",
          description: "Credenciales inválidas",
        })
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al intentar iniciar sesión",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-sm mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Inicia sesión</h1>
      <form onSubmit={login} className="space-y-4">
        <input 
          className="border rounded px-3 py-2 w-full" 
          placeholder="Correo" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          disabled={loading}
        />
        <input 
          className="border rounded px-3 py-2 w-full" 
          placeholder="Contraseña" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          disabled={loading}
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-black text-white rounded w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12">Cargando...</div>}>
      <LoginForm />
    </Suspense>
  )
}
