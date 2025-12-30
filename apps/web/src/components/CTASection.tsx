import { Button } from './ui/Button'

export function CTASection() {
  return (
    <section className="py-20 bg-teal-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          ¿Listo para impulsar tu proyecto?
        </h2>
        <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
          Solicita tu crédito hoy mismo y recibe una respuesta preliminar en minutos. Sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/solicitud">
            <Button className="bg-white text-teal-900 hover:bg-gray-100 text-lg px-8 py-4 w-full sm:w-auto">
              Iniciar Solicitud
            </Button>
          </a>
          <a href="/contacto">
            <Button variant="outline" className="border-teal-400 text-teal-100 hover:bg-teal-800 hover:text-white text-lg px-8 py-4 w-full sm:w-auto">
              Hablar con un Asesor
            </Button>
          </a>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
