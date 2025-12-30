export const metadata = {
  title: 'Solicitud de Crédito — Capitalta',
  description: 'Flujo guiado de solicitud de crédito con validación por pasos.'
}

import Form from './Form'

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto py-12 space-y-8">
      <h1 className="text-3xl font-bold">Inicia tu solicitud</h1>
      <p>Completa los pasos para evaluar tu crédito. Puedes guardar y continuar más tarde.</p>
      <Form />
    </main>
  )
}
