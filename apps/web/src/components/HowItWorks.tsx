import { FileText, Search, CreditCard, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: '1. Solicitud en Línea',
    description: 'Completa un formulario simple en menos de 10 minutos. Sin filas ni papeleo físico.'
  },
  {
    icon: Search,
    title: '2. Análisis Inteligente',
    description: 'Nuestro motor de IA evalúa tu solicitud y genera una oferta preliminar al instante.'
  },
  {
    icon: CreditCard,
    title: '3. Recibe tus Recursos',
    description: 'Una vez aceptada la oferta y validada la documentación, fondeamos en 24-48 horas.'
  }
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
          <p className="text-lg text-gray-600">
            Simplificamos el proceso de financiamiento para que tú construyas el futuro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-white">
              <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6 border-4 border-white shadow-sm">
                <step.icon size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/proceso" className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700">
            Ver proceso detallado <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  )
}
