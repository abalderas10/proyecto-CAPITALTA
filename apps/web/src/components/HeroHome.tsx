import { CheckCircle } from 'lucide-react'
import { Button } from './ui/Button'

export function HeroHome() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Financiación PYME <br />
              <span className="text-teal-600">especializada en construcción</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Decisiones inteligentes en minutos, con tecnología y experiencia sectorial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/solicitud"><Button className="w-full sm:w-auto text-lg px-8 py-6">Cotizar ahora</Button></a>
              <a href="/productos"><Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">Conocer más</Button></a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" size={20} />
                <span>Aprobación en 24-48h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" size={20} />
                <span>100% digital</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-teal-500" size={20} />
                <span>Sin papeleo excesivo</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
             {/* Placeholder for Hero Image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-blue-500/20 mix-blend-multiply" />
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
               [Imagen Hero / Ilustración]
             </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
    </section>
  )
}
