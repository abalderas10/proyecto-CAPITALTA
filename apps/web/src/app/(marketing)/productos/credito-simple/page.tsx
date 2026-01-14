'use client';

import { CalculadoraCredito } from '@/components/calculadora/CalculadoraCredito';

export default function CreditoSimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Encabezado de la página */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            Crédito Simple
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100">
            Crédito Simple
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            Financiamiento accesible para personas físicas con hasta $10 millones de pesos. Plazo flexible de 3 a 60 meses.
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
                  $30,000 MXN
                </span>
              </li>
              <li className="flex justify-between">
                <span>Máximo:</span>
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  $10,000,000 MXN
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
                  3 meses
                </span>
              </li>
              <li className="flex justify-between">
                <span>Máximo:</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  60 meses (5 años)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Calculadora */}
        <CalculadoraCredito
          montoMinimo={30000}
          montoMaximo={10000000}
          plazoMinimo={3}
          plazoMaximo={60}
          tasaAnual={18}
          nombreProducto="Crédito Simple"
          descripcion="Calcula tu pago mensual para el Crédito Simple y obtén una proyección completa de tu amortización"
          mostrarNombre={true}
        />
      </div>
    </div>
  );
}
