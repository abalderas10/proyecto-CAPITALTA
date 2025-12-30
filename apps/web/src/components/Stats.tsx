import { KPI } from './ui/KPI'

export function Stats() {
  return (
    <section className="py-20 bg-teal-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">+$500M</div>
            <div className="text-teal-100">Crédito Colocado</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">1,200+</div>
            <div className="text-teal-100">Empresas Atendidas</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">48h</div>
            <div className="text-teal-100">Tiempo de Respuesta</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">98%</div>
            <div className="text-teal-100">Satisfacción Cliente</div>
          </div>
        </div>
      </div>
    </section>
  )
}
