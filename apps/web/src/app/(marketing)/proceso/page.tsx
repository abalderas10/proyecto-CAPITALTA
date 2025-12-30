import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CheckCircle2, FileText, Search, CreditCard, UserCheck, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Proceso de Solicitud — Capitalta',
  description: 'Conoce nuestro proceso simple y transparente para obtener financiamiento.',
}

const steps = [
  {
    icon: UserCheck,
    title: '1. Registro y Perfil',
    description: 'Crea tu cuenta en minutos y completa tu perfil básico. Necesitaremos información general de tu empresa y representante legal.',
    details: ['RFC y datos fiscales', 'Identificación oficial', 'Comprobante de domicilio']
  },
  {
    icon: FileText,
    title: '2. Documentación Digital',
    description: 'Sube tus documentos a nuestra plataforma segura. Nuestro sistema valida la información automáticamente para agilizar el proceso.',
    details: ['Estados financieros', 'Declaraciones anuales', 'Acta constitutiva']
  },
  {
    icon: Search,
    title: '3. Análisis y Oferta',
    description: 'Nuestro motor de riesgo y equipo de expertos analizan tu solicitud. Recibirás una oferta formal en 24-48 horas con términos claros.',
    details: ['Análisis de buró', 'Capacidad de pago', 'Evaluación de garantías (si aplica)']
  },
  {
    icon: CheckCircle2,
    title: '4. Firma y Formalización',
    description: 'Acepta la oferta y firma el contrato digitalmente. Sin necesidad de acudir a sucursal.',
    details: ['Firma electrónica', 'Revisión legal', 'Alta de cuenta']
  },
  {
    icon: CreditCard,
    title: '5. Desembolso',
    description: 'Recibe los recursos directamente en tu cuenta bancaria. ¡Listo para invertir en tu proyecto!',
    details: ['Transferencia SPEI', 'Notificación inmediata', 'Disponibilidad total']
  }
]

export default function Page() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gray-50 py-20 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Tu crédito en 5 pasos simples</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hemos eliminado la burocracia tradicional. Tecnología y rapidez para que no detengas tu operación.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12 relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-[27px] top-8 bottom-8 w-0.5 bg-gray-200" />

            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-8 md:gap-12">
                {/* Icon Marker */}
                <div className="flex-shrink-0 z-10">
                  <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-white">
                    <step.icon size={28} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow pt-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Lo que necesitarás:</h4>
                    <div className="flex flex-wrap gap-3">
                      {step.details.map((detail, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="text-teal-500 mr-2" />
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">
            No pierdas más tiempo en trámites. Obtén tu pre-aprobación hoy mismo.
          </p>
          <a href="/solicitud">
            <Button className="bg-white text-teal-900 hover:bg-gray-100 text-lg px-8 py-4">
              Iniciar mi solicitud <ArrowRight className="ml-2" />
            </Button>
          </a>
        </div>
      </section>
    </main>
  )
}
