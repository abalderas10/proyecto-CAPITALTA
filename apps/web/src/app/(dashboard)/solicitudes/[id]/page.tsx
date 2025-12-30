"use client"
import { useEffect, useState } from 'react'
import { apiGet, apiPatch, apiPost } from '@/lib/api'
import { RequireAuth } from '@/components/RequireAuth'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const [sol, setSol] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [docs, setDocs] = useState<any[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const load = async () => {
    try {
      const s = await apiGet(`/solicitudes/${id}`)
      setSol(s)
      const e = await apiGet(`/solicitudes/${id}/eventos`)
      setEvents(e)
      const d = await apiGet(`/solicitudes/${id}/documentos`)
      setDocs(d)
    } catch {}
  }
  useEffect(() => { load() }, [id])
  const setEstado = async (estado: string) => {
    await apiPatch(`/solicitudes/${id}/estado`, { estado })
    await load()
  }
  const addNote = async () => {
    if (!note) return
    await apiPost(`/solicitudes/${id}/notes`, { text: note })
    setNote('')
    await load()
  }
  return (
    <RequireAuth>
    <main className="max-w-4xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Solicitud {sol?.id}</h1>
      {!sol && <div className="flex items-center gap-2"><Spinner /><span>Cargando…</span></div>}
      {sol && (
        <div className="grid grid-cols-2 gap-4">
          <Card>Producto: {sol.producto}</Card>
          <Card>Monto: {sol.montoCentavos}</Card>
          <Card>Plazo: {sol.plazoMeses} meses</Card>
          <Card>Estado: {sol.estado}</Card>
        </div>
      )}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Acciones</h2>
        <div className="flex gap-2">
          <Button onClick={() => setEstado('EN_REVISION')}>Marcar en revisión</Button>
          <Button onClick={() => setEstado('APROBADA')}>Aprobar</Button>
          <Button variant="destructive" onClick={() => setEstado('RECHAZADA')}>Rechazar</Button>
        </div>
        <div className="flex gap-2 items-center">
          <input className="border rounded px-3 py-2 flex-1" placeholder="Agregar nota interna" value={note} onChange={e => setNote(e.target.value)} />
          <Button onClick={addNote}>Agregar nota</Button>
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Documentos</h2>
        <div className="space-y-2">
          {docs.map(d => (
            <Card key={d.id}>
              <div className="flex items-center justify-between">
                <span>{d.tipo} — {d.ruta}</span>
                <div className="flex gap-2">
                  <PreviewDoc id={d.id} onPreview={setPreviewUrl} />
                  <DownloadDoc id={d.id} />
                </div>
              </div>
            </Card>
          ))}
        </div>
        {previewUrl && (
          <Card>
            <div className="text-sm">Vista previa</div>
            <iframe src={previewUrl} className="w-full h-96" />
          </Card>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Timeline</h2>
        <div className="space-y-2">
          {events.map(ev => (
            <Card key={ev.id}>
              <div className="font-medium">{ev.tipo}</div>
              <div className="text-sm text-gray-600">{new Date(ev.createdAt).toLocaleString()}</div>
            </Card>
          ))}
        </div>
      </section>
    </main>
    </RequireAuth>
  )
}

function PreviewDoc({ id, onPreview }: { id: string; onPreview: (url: string) => void }) {
  const click = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documentos/${id}/view`, { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
    const blob = await r.blob()
    const url = URL.createObjectURL(blob)
    onPreview(url)
  }
  return <button onClick={click} className="px-3 py-1 border rounded">Ver</button>
}

function DownloadDoc({ id }: { id: string }) {
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
