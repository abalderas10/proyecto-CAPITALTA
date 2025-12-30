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

const datosSchema = z.object({
  email: z.string().email(),
  nombre: z.string().min(2),
  orgNombre: z.string().min(2),
  rfc: z.string().min(12),
  tipo: z.enum(['PERSONA_MORAL', 'PERSONA_FISICA'])
})

const creditoSchema = z.object({
  producto: z.string().min(2),
  montoCentavos: z.number().int().positive(),
  plazoMeses: z.number().int().positive()
})

export default function Form() {
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
    const body = creditoSchema.parse(credito.getValues())
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ ...body, clienteId: ids.usuarioId, organizacionId: ids.organizacionId }) })
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
    </div>
  )
}
