import { Zap, Shield, TrendingUp, Clock, FileCheck, Smartphone } from 'lucide-react'
import { Card } from './ui/Card'

const features = [
  {
    icon: Zap,
    title: 'Rapidez Inigualable',
    description: 'Recibe una oferta en firme en menos de 48 horas tras completar tu expediente.'
  },
  {
    icon: Shield,
    title: 'Seguridad Total',
    description: 'Tus datos están protegidos con encriptación de grado bancario.'
  },
  {
    icon: TrendingUp,
    title: 'Tasas Competitivas',
    description: 'Ofrecemos tasas personalizadas basadas en el perfil de riesgo real de tu negocio.'
  },
  {
    icon: Clock,
    title: 'Proceso Ágil',
    description: 'Olvídate de las largas filas y trámites burocráticos. Todo es 100% digital.'
  },
  {
    icon: FileCheck,
    title: 'Mínimos Requisitos',
    description: 'Simplificamos la documentación necesaria para que te enfoques en tu negocio.'
  },
  {
    icon: Smartphone,
    title: 'Gestión Móvil',
    description: 'Monitorea tu crédito y realiza pagos desde cualquier dispositivo.'
  }
]

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Capitalta?</h2>
          <p className="text-lg text-gray-600">
            Diseñamos nuestros productos pensando en las necesidades reales de los constructores y empresarios mexicanos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
