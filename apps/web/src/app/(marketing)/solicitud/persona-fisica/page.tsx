import { PersonaFisicaApplicationForm } from './PersonaFisicaApplicationForm'

export const metadata = {
  title: 'Solicitud Préstamo Persona Física | Capitalta',
  description: 'Inicia tu solicitud de préstamo personal en minutos.',
}

export default function PersonaFisicaSolicitudPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Solicitud de Préstamo</h1>
        <p className="mt-4 text-lg text-gray-600">Completa el formulario y guarda tu progreso.</p>
      </div>
      <PersonaFisicaApplicationForm />
    </div>
  )
}
