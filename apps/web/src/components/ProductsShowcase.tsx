import { ArrowRight, Building2, Briefcase, Users } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

const products = [
  {
    icon: Building2,
    title: 'Crédito Constructor',
    description: 'Financiamiento puente para desarrolladores inmobiliarios. Hasta $50M MXN.',
    features: ['Plazo hasta 36 meses', 'Anticipo hasta 30%', 'Tasa desde 14% anual'],
    href: '/productos/constructoras'
  },
  {
    icon: Briefcase,
    title: 'Crédito PYME',
    description: 'Capital de trabajo y equipamiento para pequeñas y medianas empresas.',
    features: ['Sin garantía hipotecaria', 'Decisión en 24h', 'Hasta $5M MXN'],
    href: '/productos/pyme'
  },
  {
    icon: Users,
    title: 'Persona Física',
    description: 'Préstamos personales para profesionales con actividad empresarial.',
    features: ['Trámite 100% digital', 'Plazos flexibles', 'Mejora tu historial'],
    href: '/productos/persona-fisica'
  }
]

export function ProductsShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
          <p className="text-lg text-gray-600">
            Soluciones financieras diseñadas para cada etapa de tu crecimiento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index}>
              <div className="p-6 flex flex-col h-full">
                <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-6">
                  <product.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {product.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href={product.href} className="mt-auto">
                  <Button variant="outline" className="w-full group">
                    Ver detalles
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
