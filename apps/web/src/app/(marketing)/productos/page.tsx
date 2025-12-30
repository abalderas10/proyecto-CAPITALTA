import { ProductsShowcase } from '@/components/ProductsShowcase'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nuestros Productos — Capitalta',
  description: 'Conoce nuestras soluciones de financiamiento para empresas y personas.',
}

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-white pt-12">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Soluciones Financieras Integrales</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          En Capitalta ofrecemos productos diseñados a la medida de tus necesidades, ya seas una empresa constructora, una PyME o un profesional independiente.
        </p>
      </div>
      <ProductsShowcase />
    </main>
  )
}
