import { apiGet } from '@/lib/api'
export const metadata = {
  title: 'Estado de Conexión — Capitalta',
  description: 'Verifica si la API y la DB están disponibles.',
  openGraph: {
    title: 'Estado de Conexión — Capitalta',
    description: 'Salud de servicios de Capitalta',
    url: 'https://capitalta.abdev.click/status'
  }
}

export default async function StatusPage() {
  const health = await apiGet('/health').catch(() => ({ ok: false })) as any
  const version = await apiGet('/version').catch(() => ({ name: 'api', version: 'unknown' })) as any
  const db = await apiGet('/db/health').catch(() => ({ ok: false })) as any
  return (
    <main className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Conectividad</h1>
      <div className="grid grid-cols-1 gap-3">
        <div className="border rounded p-4">
          <div>API /health</div>
          <div>{health?.ok ? 'OK' : 'Fallo'}</div>
        </div>
        <div className="border rounded p-4">
          <div>API /version</div>
          <div>{version?.version}</div>
        </div>
        <div className="border rounded p-4">
          <div>DB /db/health</div>
          <div>{db?.ok ? 'OK' : 'Fallo'}</div>
        </div>
      </div>
    </main>
  )
}
