"use client"
import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/api'
import { RequireAuth } from '@/components/RequireAuth'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'

export default function Page() {
  const [estado, setEstado] = useState<string>('')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const load = async () => {
    setLoading(true)
    setError('')
    const qs = new URLSearchParams()
    if (estado) qs.set('estado', estado)
    if (q) qs.set('q', q)
    qs.set('page', String(page))
    qs.set('pageSize', String(10))
    try {
      const r = await apiGet(`/solicitudes?${qs.toString()}`)
      setItems(r.items || [])
      setTotal(r.total || 0)
    } catch (e) {
      setError('Error al cargar solicitudes')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [estado, q, page])
  return (
    <RequireAuth allowedRoles={["ANALISTA","ADMIN"]}>
    <main className="max-w-5xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Panel de Solicitudes</h1>
      <div className="flex gap-3 items-center">
        <label>Estado</label>
        <select className="border rounded px-3 py-2" value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="">Todos</option>
          <option value="DRAFT">Borrador</option>
          <option value="ENVIADA">Enviada</option>
          <option value="EN_REVISION">En revisión</option>
          <option value="APROBADA">Aprobada</option>
          <option value="RECHAZADA">Rechazada</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
        <input className="border rounded px-3 py-2" placeholder="Buscar por producto o email" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {loading && <div className="flex items-center gap-2"><Spinner /><span>Cargando…</span></div>}
      {error && <div className="px-3 py-2 bg-red-100 border border-red-300 rounded">{error}</div>}
      <div className="space-y-2">
        {items.map((s) => (
          <div key={s.id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{s.producto}</div>
              <div className="text-sm text-gray-600">{s.estado} — {new Date(s.createdAt).toLocaleString()}</div>
            </div>
            <a href={`/solicitudes/${s.id}`} className="px-3 py-1 border rounded">Ver detalle</a>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>Total: {total}</div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPage(Math.max(1, page - 1))}>Anterior</Button>
          <Button variant="outline" onClick={() => setPage(page + 1)}>Siguiente</Button>
        </div>
      </div>
    </main>
    </RequireAuth>
  )
}
