import { ShieldCheck, Award, Lock, Star } from 'lucide-react'

const indicators = [
  {
    icon: Award,
    title: 'Regulado por CNBV',
    subtitle: 'Supervisión constante'
  },
  {
    icon: ShieldCheck,
    title: 'SOFOM ENR',
    subtitle: 'Entidad Autorizada'
  },
  {
    icon: Lock,
    title: 'Seguro y Encriptado',
    subtitle: 'Protección de datos 256-bit'
  },
  {
    icon: Star,
    title: 'Calificación 4.8/5.0',
    subtitle: 'Satisfacción de clientes'
  }
]

export function TrustIndicators() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {indicators.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-teal-50 rounded-full text-teal-700">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
