'use client';

import { CalculadoraCredito } from '@/components/calculadora/CalculadoraCredito';

export default function CreditoEmpresarialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Encabezado de la página */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            Crédito Empresarial
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100">
            Crédito Empresarial
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            Financiamiento integral para empresas con montos hasta $50 millones de pesos. Plazo extendido hasta 10 años.
          </p>
        </div>

        {/* Especificaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Rangos de Financiamiento
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex justify-between">
                <span>Mínimo:</span>
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  $20,000 MXN
                </span>
              </li>
              <li className="flex justify-between">
                <span>Máximo:</span>
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  $50,000,000 MXN
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Plazo
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex justify-between">
                <span>Mínimo:</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  1 mes
                </span>
              </li>
              <li className="flex justify-between">
                <span>Máximo:</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  120 meses (10 años)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Calculadora */}
        <CalculadoraCredito
          montoMinimo={20000}
          montoMaximo={50000000}
          plazoMinimo={1}
          plazoMaximo={120}
          tasaAnual={16}
          nombreProducto="Crédito Empresarial"
          descripcion="Calcula tu pago mensual para el Crédito Empresarial con tasas competitivas y plazos extendidos"
          mostrarNombre={true}
        />
      </div>
    </div>
  );
}
