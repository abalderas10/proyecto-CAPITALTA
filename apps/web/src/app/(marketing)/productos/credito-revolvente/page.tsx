'use client';

import { CalculadoraCredito } from '@/components/calculadora/CalculadoraCredito';

export default function CreditoRevolventePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Encabezado de la página */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            Crédito Revolvente
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100">
            Crédito Revolvente
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            Línea de crédito flexible que puedes usar, pagar y volver a usar. Disponible hasta $50 millones de pesos.
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
                  $10,000 MXN
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

        {/* Características especiales */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/20 dark:to-teal-800/10 rounded-lg p-6 border border-teal-200 dark:border-teal-800 mb-12">
          <h3 className="text-lg font-bold text-teal-900 dark:text-teal-100 mb-4">
            ✨ Ventajas del Crédito Revolvente
          </h3>
          <ul className="space-y-2 text-teal-800 dark:text-teal-200">
            <li className="flex items-start gap-3">
              <span className="text-lg">✓</span>
              <span>Usa solo lo que necesites de tu línea de crédito</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">✓</span>
              <span>Paga intereses solo sobre el monto utilizado</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">✓</span>
              <span>Reutiliza tu crédito conforme lo vayas pagando</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">✓</span>
              <span>Flexibilidad total en tus pagos mensuales</span>
            </li>
          </ul>
        </div>

        {/* Calculadora */}
        <CalculadoraCredito
          montoMinimo={10000}
          montoMaximo={50000000}
          plazoMinimo={1}
          plazoMaximo={120}
          tasaAnual={17}
          nombreProducto="Crédito Revolvente"
          descripcion="Calcula tu pago mensual para el Crédito Revolvente y visualiza tu tabla de amortización"
          mostrarNombre={true}
        />
      </div>
    </div>
  );
}
