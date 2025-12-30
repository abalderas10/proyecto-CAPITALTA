export const metadata = {
  title: 'Requisitos PYME — Capitalta',
  description: 'Checklist de requisitos para crédito PYME.',
  openGraph: { title: 'Requisitos PYME — Capitalta', description: 'Checklist PYME', url: 'https://capitalta.abdev.click/requisitos/pyme' }
}

export default function Page() {
  const items = ['RFC', 'Identificación', 'Estados financieros', 'Comprobantes de domicilio', 'Actividad económica']
  return (
    <main className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Requisitos PYME</h1>
      <ul className="list-disc pl-6 space-y-2">
        {items.map(i => (<li key={i}>{i}</li>))}
      </ul>
      <a href="/solicitud" className="px-4 py-2 bg-black text-white rounded">Inicia tu solicitud</a>
    </main>
  )
}
