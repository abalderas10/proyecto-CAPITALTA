'use client';

import { LoanCalculator } from '@/components/features/calculator/LoanCalculator';
import { constructoraConfig, pymeConfig, personaFisicaConfig } from '@/data/calculatorConfigs';
import { useRouter } from 'next/navigation';

export default function CalculadoraShowcasePage() {
  const router = useRouter();

  const handleApply = (monto: number, plazo: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('prefilledMonto', monto.toString())
      localStorage.setItem('prefilledPlazo', plazo.toString())
    }
    router.push('/solicitud');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Calculadora de Préstamos Capitalta</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Prueba nuestra calculadora interactiva con las diferentes configuraciones para cada tipo de producto.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-teal-700">Versión Constructoras</h2>
          <LoanCalculator config={constructoraConfig} onApply={handleApply} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-blue-700">Versión PYMEs</h2>
          <LoanCalculator config={pymeConfig} onApply={handleApply} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-purple-700">Versión Persona Física</h2>
          <LoanCalculator config={personaFisicaConfig} onApply={handleApply} />
        </div>
      </div>
    </div>
  );
}
