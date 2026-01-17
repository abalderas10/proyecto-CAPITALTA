"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { HeroHome } from "@/components/HeroHome"
import { TrustIndicators } from "@/components/TrustIndicators"
import { FeaturesGrid } from "@/components/FeaturesGrid"
import { HowItWorks } from "@/components/HowItWorks"
import { ProductsShowcase } from "@/components/ProductsShowcase"
import { Testimonials } from "@/components/Testimonials"
import { Stats } from "@/components/Stats"
import { CTASection } from "@/components/CTASection"
import { CalculadoraCredito } from "@/components/calculadora/CalculadoraCredito"
import { AnimatedGridPattern } from "@/components/magicui"

export default function HomePage() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 120])

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-gradient-primary/5" />
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -top-40 right-[-10rem] h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroHome />
        </motion.section>
        <TrustIndicators />
        <ProductsShowcase />
        <div className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 py-16">
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={4}
            repeatDelay={5}
            className="absolute inset-0 z-0"
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Calcula tu Cuota
              </h2>
              <p className="text-lg text-muted-foreground">
                Usa nuestro simulador para obtener una estimación rápida y sin compromiso
              </p>
            </div>
            <div className="rounded-lg border bg-card p-8 shadow-xl">
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
      </div>
    </main>
  )
}
