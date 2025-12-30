import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contacto — Capitalta',
  description: 'Estamos aquí para ayudarte. Contáctanos para recibir asesoría personalizada.',
}

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Hablemos de tu proyecto</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nuestro equipo de expertos financieros está listo para diseñar la solución que necesitas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Envíanos un mensaje</h2>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre completo</label>
                    <Input id="name" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                    <Input id="email" type="email" placeholder="juan@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono</label>
                    <Input id="phone" type="tel" placeholder="55 1234 5678" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Mensaje</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50" 
                      placeholder="Cuéntanos sobre tus necesidades de financiamiento..."
                    />
                  </div>
                  <Button className="w-full">Enviar Mensaje</Button>
                </form>
              </div>
            </Card>

            <div className="space-y-8">
              <Card>
                <div className="p-8 space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Teléfono</div>
                        <div className="text-gray-600">+52 (55) 1234 5678</div>
                        <div className="text-sm text-gray-500">Lunes a Viernes, 9am - 6pm</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Correo</div>
                        <div className="text-gray-600">contacto@capitalta.mx</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Oficinas</div>
                        <div className="text-gray-600">
                          Av. Reforma 222, Piso 10<br />
                          Juárez, Cuauhtémoc<br />
                          06600 Ciudad de México, CDMX
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="bg-teal-900 rounded-xl p-8 text-white text-center">
                <h3 className="text-lg font-semibold mb-2">¿Ya eres cliente?</h3>
                <p className="text-teal-100 mb-4 text-sm">Accede a tu cuenta para gestionar tus créditos.</p>
                <a href="/login"><Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-900 w-full">Ir al Dashboard</Button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
