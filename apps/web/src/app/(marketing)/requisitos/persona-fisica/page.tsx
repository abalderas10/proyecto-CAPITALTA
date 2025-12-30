export const metadata = {
  title: 'Requisitos Persona Física — Capitalta',
  description: 'Checklist de requisitos para préstamo con garantía.',
  openGraph: { title: 'Requisitos Persona Física — Capitalta', description: 'Checklist Persona Física', url: 'https://capitalta.abdev.click/requisitos/persona-fisica' }
}

export default function Page() {
  const items = ['Identificación', 'Comprobante de domicilio', 'Propiedad con documentación', 'RFC opcional']
  return (
    <main className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Requisitos Persona Física</h1>
      <ul className="list-disc pl-6 space-y-2">
        {items.map(i => (<li key={i}>{i}</li>))}
      </ul>
      <a href="/solicitud" className="px-4 py-2 bg-black text-white rounded">Solicítalo ahora</a>
    </main>
  )
}
