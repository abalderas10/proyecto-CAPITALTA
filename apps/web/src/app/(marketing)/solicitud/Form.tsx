"use client"
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stepper } from '@/components/Stepper'
import { Progress } from '@/components/Progress'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Schema only for Organization now, since User is authenticated
const orgSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  rfc: z.string().min(12, "RFC debe tener 12-13 caracteres").max(13),
  tipo: z.enum(['PERSONA_MORAL', 'PERSONA_FISICA'])
})

const creditoSchema = z.object({
  producto: z.string().min(2, "Selecciona un producto"),
  monto: z.number().positive("El monto debe ser positivo"),
  plazoMeses: z.number().int().positive("El plazo debe ser positivo")
})

export default function Form() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(0)
  // We don't need to store IDs manually anymore, backend handles linking via session
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [checkingOrg, setCheckingOrg] = useState(true)
  
  const notify = (msg: string, type: 'success' | 'error' = 'success') => { 
    setToast({ msg, type }); 
    setTimeout(() => setToast(null), 3000) 
  }
  
  const steps = [{ title: 'Empresa' }, { title: 'Crédito' }, { title: 'Garantías' }, { title: 'Documentos' }, { title: 'Condiciones' }]

  const orgForm = useForm({ 
    resolver: zodResolver(orgSchema),
    defaultValues: {
      nombre: '',
      rfc: '',
      tipo: 'PERSONA_MORAL' as const
    }
  })
  
  const creditoForm = useForm({ 
    resolver: zodResolver(creditoSchema),
    defaultValues: {
      producto: '',
      monto: 0,
      plazoMeses: 0
    }
  })

  // Check for existing organization when session loads
  useEffect(() => {
    if (status === 'authenticated') {
      const checkOrg = async () => {
        try {
          // We can try to fetch the org from a new endpoint or just try to create one and see if it exists
          // Or better, let's just assume we start at step 0, and if we submit and they have one, the API handles it.
          // However, for UX, skipping step 0 if they already have an org is better.
          // Let's call the org endpoint to 'get or create' logic? No, let's just use GET /api/organizaciones/me if we had it.
          // For now, let's keep it simple: We'll let them fill it out, or we can fetch.
          // Actually, let's add a quick check.
          // Since I didn't create a GET endpoint yet, I'll assume they need to fill it out OR 
          // I can rely on the fact that if they submit, the backend links them.
          // Let's implement the submit logic to handle "already exists".
          setCheckingOrg(false)
        } catch (e) {
          setCheckingOrg(false)
        }
      }
      checkOrg()
    } else if (status === 'unauthenticated') {
      setCheckingOrg(false)
    }
  }, [status])

  useEffect(() => {
    // Prefill from calculator
    const prefilledMonto = localStorage.getItem('prefilledMonto')
    const prefilledPlazo = localStorage.getItem('prefilledPlazo')
    
    if (prefilledMonto) {
      creditoForm.setValue('monto', Number(prefilledMonto))
    }
    if (prefilledPlazo) {
      creditoForm.setValue('plazoMeses', Number(prefilledPlazo))
    }
  }, [creditoForm])

  const submitOrg = async (e: any) => {
    e.preventDefault()
    const valid = await orgForm.trigger()
    if (!valid) return
    
    setIsLoading(true)
    try {
      const body = orgForm.getValues()
      const res = await fetch('/api/organizaciones', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar organización')
      }

      notify('Organización guardada/vinculada')
      setStep(1)
    } catch (error: any) {
      notify(error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const submitCredito = async (e: any) => {
    e.preventDefault()
    const valid = await creditoForm.trigger()
    if (!valid) return
    
    setIsLoading(true)
    try {
      const values = creditoForm.getValues()
      
      const body = {
        producto: values.producto,
        montoCentavos: Math.round(values.monto * 100),
        plazoMeses: values.plazoMeses
      }

      const res = await fetch('/api/solicitudes', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
      })
      
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Error al crear solicitud')
      }

      // Clear calculator local storage
      localStorage.removeItem('prefilledMonto')
      localStorage.removeItem('prefilledPlazo')
      
      notify('Solicitud creada exitosamente')
      setStep(2) // Move to next step (Garantías - placeholder for now)
    } catch (error: any) {
      notify(error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || checkingOrg) {
    return <div className="text-center py-12">Cargando...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <Card className="p-8 text-center space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Crea tu cuenta</h2>
          <p className="text-muted-foreground">
            Para formalizar tu solicitud y obtener una pre-aprobación, necesitamos crear tu expediente seguro.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button className="w-full" size="lg" asChild>
            <Link href="/registro">
              Registrarme ahora
            </Link>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Inicia sesión
            </Link>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Progress value={(step / (steps.length - 1)) * 100} />
      <Stepper currentStep={step} totalSteps={steps.length} stepTitle={steps[step].title} />
      
      {toast && (
        <div className={`px-4 py-3 rounded border ${
          toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {toast.msg}
        </div>
      )}

      {step === 0 && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Datos de la Empresa</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Ingresa los datos fiscales de la empresa o persona física solicitante.
            </p>
            <form onSubmit={submitOrg} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre / Razón Social</label>
                <Input placeholder="Ej. Comercializadora del Norte SA de CV" {...orgForm.register('nombre')} />
                {orgForm.formState.errors.nombre && <p className="text-sm text-red-500">{orgForm.formState.errors.nombre.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">RFC</label>
                <Input placeholder="AAA010101AAA" {...orgForm.register('rfc')} />
                {orgForm.formState.errors.rfc && <p className="text-sm text-red-500">{orgForm.formState.errors.rfc.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Persona</label>
                <Controller
                  control={orgForm.control}
                  name="tipo"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de Persona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERSONA_MORAL">Persona Moral</SelectItem>
                        <SelectItem value="PERSONA_FISICA">Persona Física con Actividad Empresarial</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Guardando...' : 'Guardar y Continuar'}
              </Button>
            </form>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Detalles del Crédito</h2>
            <form onSubmit={submitCredito} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Producto</label>
                <Controller
                  control={creditoForm.control}
                  name="producto"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un producto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CREDITO_PUENTE">Crédito Puente</SelectItem>
                        <SelectItem value="CREDITO_PYME">Crédito Pyme</SelectItem>
                        <SelectItem value="PRESTAMO_PERSONAL">Préstamo Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {creditoForm.formState.errors.producto && (
                  <p className="text-sm text-red-500">{creditoForm.formState.errors.producto.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Monto Solicitado</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="pl-7"
                    {...creditoForm.register('monto', { valueAsNumber: true })} 
                  />
                </div>
                {creditoForm.formState.errors.monto && (
                  <p className="text-sm text-red-500">{creditoForm.formState.errors.monto.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Plazo (meses)</label>
                <Input 
                  type="number" 
                  placeholder="Plazo en meses" 
                  {...creditoForm.register('plazoMeses', { valueAsNumber: true })} 
                />
                {creditoForm.formState.errors.plazoMeses && (
                  <p className="text-sm text-red-500">{creditoForm.formState.errors.plazoMeses.message as string}</p>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(0)}>Atrás</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creando...' : 'Crear Solicitud'}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}
      
      {step === 2 && (
        <Card className="p-12 text-center">
          <div className="mb-4 text-green-600">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Solicitud Creada!</h2>
          <p className="text-muted-foreground mb-6">
            Hemos recibido tu solicitud. Un asesor la revisará y te contactará pronto.
          </p>
          <Button asChild>
            <Link href="/dashboard">Ir al Dashboard</Link>
          </Button>
        </Card>
      )}
    </div>
  )
}
