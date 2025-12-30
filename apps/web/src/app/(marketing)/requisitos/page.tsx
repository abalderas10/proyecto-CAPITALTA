import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Building2, Briefcase, User } from 'lucide-react'

export const metadata = {
  title: 'Requisitos — Capitalta',
  description: 'Conoce la documentación necesaria para cada tipo de crédito.',
}

const reqs = [
  {
    title: 'Personas Morales',
    icon: Building2,
    description: 'Empresas constituidas (SA, SAPI, SRL, etc.)',
    href: '/requisitos/pyme',
    items: ['Acta Constitutiva', 'Poderes', 'RFC', 'Comp. Domicilio', 'Estados Financieros']
  },
  {
    title: 'Personas Físicas con Actividad Empresarial',
    icon: Briefcase,
    description: 'Profesionales independientes y dueños de negocio.',
    href: '/requisitos/persona-fisica',
    items: ['Identificación Oficial', 'RFC', 'Constancia Situación Fiscal', 'Comp. Domicilio', 'Estados de Cuenta']
  },
  // {
  //   title: 'Crédito Constructor',
  //   icon: HardHat, // Need to import
  //   description: 'Desarrolladores inmobiliarios.',
  //   href: '/requisitos/constructoras', // If exists
  //   items: ['Proyecto Ejecutivo', 'Licencia de Construcción', 'Factibilidad de Servicios', 'Avalúo del Terreno']
  // }
]

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Requisitos por Perfil</h1>
          <p className="text-xl text-gray-600">
            Selecciona tu perfil para ver la lista detallada de documentos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reqs.map((req, index) => (
            <Card key={index}>
              <div className="p-8 text-center h-full flex flex-col items-center">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6">
                  <req.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{req.title}</h3>
                <p className="text-gray-600 mb-6">{req.description}</p>
                
                <ul className="text-left space-y-2 mb-8 w-full bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                  {req.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a href={req.href} className="mt-auto w-full">
                  <Button variant="outline" className="w-full">Ver checklist completo</Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
