"use client"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stepper } from '@/components/Stepper'
import { Progress } from '@/components/Progress'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input, Select } from '@/components/ui/Input'
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
      <Stepper steps={steps} value={step} onChange={setStep} />
      {toast && <div className="px-3 py-2 bg-green-100 border border-green-300 rounded">{toast}</div>}
      {step === 0 && (
        <Card>
        <form onSubmit={submitDatos} className="space-y-4">
          <Input placeholder="Correo" {...datos.register('email')} />
          <Input placeholder="Nombre" {...datos.register('nombre')} />
          <Input placeholder="Organización" {...datos.register('orgNombre')} />
          <Input placeholder="RFC" {...datos.register('rfc')} />
          <Select {...datos.register('tipo')}>
            <option value="PERSONA_MORAL">Persona Moral</option>
            <option value="PERSONA_FISICA">Persona Física</option>
          </Select>
          <Button type="submit">Guardar y continuar</Button>
        </form>
        </Card>
      )}
      {step === 1 && (
        <Card>
        <form onSubmit={submitCredito} className="space-y-4">
          <Input placeholder="Producto" {...credito.register('producto')} />
          <Input placeholder="Monto en centavos" type="number" {...credito.register('montoCentavos', { valueAsNumber: true })} />
          <Input placeholder="Plazo en meses" type="number" {...credito.register('plazoMeses', { valueAsNumber: true })} />
          <Button type="submit">Guardar y continuar</Button>
        </form>
        </Card>
      )}
      {step === 2 && (
        <Garantias notify={notify} />
      )}
      {step === 3 && (
        <Documentos notify={notify} />
      )}
      {step === 4 && (
        <Finalizar notify={notify} />
      )}
    </div>
  )
}
function Garantias({ notify }: { notify: (msg: string) => void }) {
  const solicitudId = typeof window !== 'undefined' ? localStorage.getItem('solicitud_id') : null
  const [list, setList] = useState<any[]>([])
  const form = useForm()
  const load = async () => {
    if (!solicitudId) return
    const r = await apiGet(`/solicitudes/${solicitudId}/garantias`)
    setList(r)
  }
  useEffect(() => { load() }, [])
  const submit = async (e: any) => {
    e.preventDefault()
    if (!solicitudId) return
    const body = form.getValues()
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/garantias`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ ...body, solicitudId }) })
    await load()
    notify('Garantía agregada')
  }
  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="space-y-2">
        <Input placeholder="Tipo" {...form.register('tipo')} />
        <Input placeholder="Ubicación" {...form.register('ubicacion')} />
        <Input placeholder="Avalúo en centavos" type="number" {...form.register('avaluoCentavos', { valueAsNumber: true })} />
        <Button type="submit">Agregar garantía</Button>
      </form>
      <div className="space-y-2">
        {list.map((g) => (<div key={g.id} className="border rounded p-2">{g.tipo} — {g.ubicacion}</div>))}
      </div>
    </div>
  )
}

function Documentos({ notify }: { notify: (msg: string) => void }) {
  const solicitudId = typeof window !== 'undefined' ? localStorage.getItem('solicitud_id') : null
  const [list, setList] = useState<any[]>([])
  const load = async () => {
    if (!solicitudId) return
    const r = await apiGet(`/solicitudes/${solicitudId}/documentos`)
    setList(r)
  }
  useEffect(() => { load() }, [])
  const upload = async (e: any) => {
    if (!solicitudId) return
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documentos/upload`, { method: 'POST', body: fd, headers: { 'x-solicitud-id': solicitudId, ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
    await load()
    notify('Documento subido')
  }
  return (
    <div className="space-y-4">
      <input type="file" onChange={upload} />
      <div className="space-y-2">
        {list.map((d) => (
          <div key={d.id} className="border rounded p-2 flex items-center justify-between">
            <span>{d.tipo} — {d.ruta}</span>
            <div className="flex gap-2">
              <PreviewButton id={d.id} />
              <DownloadButton id={d.id} />
              <DeleteButton id={d.id} onDeleted={load} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
function DownloadButton({ id }: { id: string }) {
  const click = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documentos/${id}/download`, { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
    const blob = await r.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `documento-${id}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
  return <button onClick={click} className="px-3 py-1 border rounded">Descargar</button>
}
function Finalizar({ notify }: { notify: (msg: string) => void }) {
  const solicitudId = typeof window !== 'undefined' ? localStorage.getItem('solicitud_id') : null
  const enviar = async () => {
    if (!solicitudId) return
    await apiPatch(`/solicitudes/${solicitudId}`, { estado: 'ENVIADA' })
    notify('Solicitud enviada')
    setTimeout(() => { location.href = `/solicitudes/${solicitudId}` }, 1000)
}
  return (
    <div className="space-y-4">
      <div className="border rounded p-4">Acepta condiciones y envía</div>
      <button onClick={enviar} className="px-4 py-2 bg-black text-white rounded">Enviar solicitud</button>
    </div>
  )
}
function PreviewButton({ id }: { id: string }) {
  const click = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documentos/${id}/view`, { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
    const blob = await r.blob()
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }
  return <button onClick={click} className="px-3 py-1 border rounded">Ver</button>
}
function DeleteButton({ id, onDeleted }: { id: string; onDeleted: () => void }) {
  const click = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documentos/${id}`, { method: 'DELETE', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
    onDeleted()
  }
  return <button onClick={click} className="px-3 py-1 border rounded text-red-600">Eliminar</button>
}
