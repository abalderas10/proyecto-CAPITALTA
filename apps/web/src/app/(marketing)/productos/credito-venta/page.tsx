'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CreditoVentaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Encabezado de la página */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            En Desarrollo
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100">
            Crédito de Venta
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            Financiamiento especializado para empresas de distribución y ventas. Disponible próximamente.
          </p>
        </div>

        {/* Tarjeta de estado */}
        <Card className="border-2 border-orange-200 dark:border-orange-800 shadow-lg mb-12">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="space-y-4">
              <div className="text-6xl">🚀</div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Próximamente
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Estamos desarrollando el Crédito de Venta para ofrecer soluciones de financiamiento especializadas para empresas de distribución, comercio y ventas.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 rounded-lg p-8 border border-orange-200 dark:border-orange-800 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                ¿Qué incluirá este producto?
              </h3>
              <ul className="space-y-3 text-left max-w-xl mx-auto">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">▸</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Montos especializados para empresas de venta
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">▸</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Tasas competitivas basadas en el sector
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">▸</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Plazos flexibles adaptados a ciclos de venta
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">▸</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Análisis integral del flujo de caja de tu negocio
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                ¿Te interesa estar informado cuando esté disponible?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contacto">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                    Contáctanos para más información
                  </Button>
                </Link>
                <Link href="/productos/credito-simple">
                  <Button variant="outline" className="border-teal-200 dark:border-teal-800">
                    Explora otros créditos
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sugerencias */}
        <Card className="border-teal-200 dark:border-teal-800">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Mientras tanto, puedes explorar:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/productos/credito-simple">
                <div className="p-4 rounded-lg border border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 cursor-pointer transition">
                  <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">
                    Crédito Simple
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Para personas físicas hasta $10M
                  </p>
                </div>
              </Link>
              <Link href="/productos/credito-empresarial">
                <div className="p-4 rounded-lg border border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 cursor-pointer transition">
                  <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">
                    Crédito Empresarial
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Para empresas hasta $50M
                  </p>
                </div>
              </Link>
              <Link href="/productos/credito-revolvente">
                <div className="p-4 rounded-lg border border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 cursor-pointer transition">
                  <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">
                    Crédito Revolvente
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Línea flexible hasta $50M
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
