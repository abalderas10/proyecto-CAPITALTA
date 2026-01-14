import { HeroHome } from '@/components/HeroHome'
import { TrustIndicators } from '@/components/TrustIndicators'
import { FeaturesGrid } from '@/components/FeaturesGrid'
import { HowItWorks } from '@/components/HowItWorks'
import { ProductsShowcase } from '@/components/ProductsShowcase'
import { Testimonials } from '@/components/Testimonials'
import { Stats } from '@/components/Stats'
import { CTASection } from '@/components/CTASection'
import { CalculadoraCredito } from '@/components/calculadora/CalculadoraCredito'
import { AnimatedGridPattern } from '@/components/magicui'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroHome />
      <TrustIndicators />
      <ProductsShowcase />
      <div className="relative py-16 overflow-hidden bg-gradient-to-b from-white to-teal-50">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={4}
          repeatDelay={5}
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Calcula tu Cuota
            </h2>
            <p className="text-lg text-slate-600">
              Usa nuestro simulador para obtener una estimación rápida y sin compromiso
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-8 border border-teal-100">
            <CalculadoraCredito
              montoMinimo={30000}
              montoMaximo={10000000}
              plazoMinimo={3}
              plazoMaximo={60}
              tasaAnual={18}
              nombreProducto="Crédito Simulado"
              descripcion="Simula tu crédito con nuestros términos"
              mostrarNombre={false}
            />
          </div>
        </div>
      </div>
      <FeaturesGrid />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </main>
  )
}
