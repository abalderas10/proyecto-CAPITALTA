import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Target, Lightbulb, Users } from 'lucide-react'

export const metadata = {
  title: 'Sobre Nosotros — Capitalta',
  description: 'Conoce la misión, visión y el equipo detrás de Capitalta.',
}

export default function Page() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Impulsando el futuro de la construcción</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Somos la plataforma financiera que conecta capital inteligente con desarrolladores visionarios.
          </p>
        </div>
      </section>

      {/* Mision / Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mx-auto">
                  <Target size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Misión</h3>
                <p className="text-gray-600">
                  Democratizar el acceso al financiamiento para constructores y PYMEs, eliminando barreras mediante tecnología y análisis de datos.
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto">
                  <Lightbulb size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Visión</h3>
                <p className="text-gray-600">
                  Ser el ecosistema financiero líder en Latinoamérica para el sector inmobiliario y de construcción.
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Valores</h3>
                <p className="text-gray-600">
                  Transparencia radical, agilidad operativa y compromiso con el éxito de nuestros clientes.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Capitalta nació en 2023 con una premisa simple: el sector de la construcción es el motor de la economía, pero es el más desatendido por la banca tradicional.
              </p>
              <p>
                Fundada por un equipo multidisciplinario de expertos en finanzas, tecnología y desarrollo inmobiliario, entendemos los dolores de cabeza que implica conseguir liquidez para un proyecto: trámites eternos, requisitos imposibles y falta de entendimiento del negocio.
              </p>
              <p>
                Decidimos cambiar las reglas del juego. Desarrollamos una plataforma que utiliza algoritmos avanzados para evaluar proyectos basándose en su viabilidad real y no solo en garantías tradicionales. Hoy, ayudamos a cientos de constructores a materializar sus obras a tiempo y forma.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
