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
import { apiGet, apiPatch } from '@/lib/api'
import { useSession } from 'next-auth/react'

const datosSchema = z.object({
  email: z.string().email(),
  nombre: z.string().min(2),
  orgNombre: z.string().min(2),
  rfc: z.string().min(12),
  tipo: z.enum(['PERSONA_MORAL', 'PERSONA_FISICA'])
})

const creditoSchema = z.object({
  producto: z.string().min(2),
  monto: z.number().positive(),
  plazoMeses: z.number().int().positive()
})

export default function Form() {
  const { data: session } = useSession()
  const [step, setStep] = useState(0)
  const [ids, setIds] = useState<{ usuarioId: string; organizacionId: string } | null>(null)
  const [toast, setToast] = useState<string>('')
  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000) }
  const steps = [{ title: 'Datos' }, { title: 'Crédito' }, { title: 'Garantías' }, { title: 'Documentos' }, { title: 'Condiciones' }]

  const datos = useForm({ resolver: zodResolver(datosSchema) })
  const credito = useForm({ resolver: zodResolver(creditoSchema) })

  useEffect(() => {
    const stored = localStorage.getItem('solicitud_ids')
    if (stored) setIds(JSON.parse(stored))

    // Prefill from calculator
    const prefilledMonto = localStorage.getItem('prefilledMonto')
    const prefilledPlazo = localStorage.getItem('prefilledPlazo')
    
    if (prefilledMonto) {
      credito.setValue('monto', Number(prefilledMonto))
    }
    if (prefilledPlazo) {
      credito.setValue('plazoMeses', Number(prefilledPlazo))
    }
  }, [])

  const submitDatos = async (e: any) => {
    e.preventDefault()
    const valid = await datos.trigger()
    if (!valid) return
    const body = datosSchema.parse(datos.getValues())
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seed`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const result = await r.json()
    setIds(result)
    localStorage.setItem('solicitud_ids', JSON.stringify(result))
    setStep(1)
    notify('Datos guardados')
  }

  const submitCredito = async (e: any) => {
    e.preventDefault()
    const valid = await credito.trigger()
    if (!valid || !ids) return
    const values = creditoSchema.parse(credito.getValues())
    
    // Transform monto to montoCentavos
    const body = {
      producto: values.producto,
      montoCentavos: Math.round(values.monto * 100),
      plazoMeses: values.plazoMeses
    }

    const token = session?.accessToken
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes`, { 
      method: 'POST', 
      headers, 
      body: JSON.stringify({ ...body, clienteId: ids.usuarioId, organizacionId: ids.organizacionId }) 
    })
    const s = await r.json()
    localStorage.setItem('solicitud_id', s.id)
    setStep(2)
    notify('Solicitud creada')
  }

  return (
    <div className="space-y-6">
      <Progress value={(step / (steps.length - 1)) * 100} />
      <Stepper currentStep={step} totalSteps={steps.length} stepTitle={steps[step].title} />
      {toast && <div className="px-3 py-2 bg-green-100 border border-green-300 rounded">{toast}</div>}
      {step === 0 && (
        <Card>
        <form onSubmit={submitDatos} className="space-y-4">
          <Input placeholder="Correo" {...datos.register('email')} />
          <Input placeholder="Nombre" {...datos.register('nombre')} />
          <Input placeholder="Organización" {...datos.register('orgNombre')} />
          <Input placeholder="RFC" {...datos.register('rfc')} />
          <Controller
            control={datos.control}
            name="tipo"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Persona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERSONA_MORAL">Persona Moral</SelectItem>
                  <SelectItem value="PERSONA_FISICA">Persona Física</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <Button type="submit">Guardar y continuar</Button>
        </form>
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
                  control={credito.control}
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
                {credito.formState.errors.producto && (
                  <p className="text-sm text-red-500">{credito.formState.errors.producto.message as string}</p>
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
                    {...credito.register('monto', { valueAsNumber: true })} 
                  />
                </div>
                {credito.formState.errors.monto && (
                  <p className="text-sm text-red-500">{credito.formState.errors.monto.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Plazo (meses)</label>
                <Input 
                  type="number" 
                  placeholder="Plazo en meses" 
                  {...credito.register('plazoMeses', { valueAsNumber: true })} 
                />
                {credito.formState.errors.plazoMeses && (
                  <p className="text-sm text-red-500">{credito.formState.errors.plazoMeses.message as string}</p>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(0)}>Atrás</Button>
                <Button type="submit">Continuar</Button>
              </div>
            </form>
          </div>
        </Card>
      )}
    </div>
  )
}
