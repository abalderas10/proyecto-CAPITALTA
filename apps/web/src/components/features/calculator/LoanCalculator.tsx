'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { calcularPrestamo, LoanCalculationResult } from '@/lib/utils/loanCalculator';
import type { CalculatorConfig } from '@/lib/types';

interface LoanCalculatorProps {
  config: CalculatorConfig;
  onApply: (monto: number, plazo: number) => void;
}

// Función para formatear números como moneda MXN
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value);
};

export function LoanCalculator({ config, onApply }: LoanCalculatorProps) {
  const [monto, setMonto] = useState(config.defaultMonto);
  const [plazo, setPlazo] = useState(config.defaultPlazo);
  const [results, setResults] = useState<LoanCalculationResult>({ 
    pagoMensual: 0, 
    totalAPagar: 0, 
    totalIntereses: 0 
  });

  useEffect(() => {
    const newResults = calcularPrestamo({
      monto,
      plazo,
      tasaAnual: config.tasaAnual,
    });
    setResults(newResults);
  }, [monto, plazo, config.tasaAnual]);

  const handleMontoChange = (value: number[]) => {
    setMonto(value[0]);
  };

  const handlePlazoChange = (value: number[]) => {
    setPlazo(value[0]);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">{config.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="monto" className="text-lg text-gray-700">Monto del Préstamo</Label>
            <Input
              id="monto"
              type="text"
              value={formatCurrency(monto)}
              className="w-48 text-right text-lg font-semibold bg-gray-50"              
              readOnly // Para evitar entrada directa conflictiva, el slider es la fuente de verdad
            />
          </div>
          <Slider
            id="monto-slider"
            min={config.minMonto}
            max={config.maxMonto}
            step={config.stepMonto}
            value={[monto]}
            onValueChange={handleMontoChange}
            className="accent-teal-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatCurrency(config.minMonto)}</span>
            <span>{formatCurrency(config.maxMonto)}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="plazo" className="text-lg text-gray-700">Plazo (meses)</Label>
            <Input
              id="plazo"
              type="number"
              value={plazo}
              className="w-24 text-right text-lg font-semibold bg-gray-50"
              readOnly
            />
          </div>
          <Slider
            id="plazo-slider"
            min={config.minPlazo}
            max={config.maxPlazo}
            // Usar un step que se alinee con las opciones para un movimiento más limpio
            step={config.plazoOptions.length > 1 ? config.plazoOptions[1] - config.plazoOptions[0] : 1}
            value={[plazo]}
            onValueChange={handlePlazoChange}
            className="accent-teal-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{config.minPlazo} meses</span>
            <span>{config.maxPlazo} meses</span>
          </div>
        </div>
        <div className="text-center bg-gray-50 p-6 rounded-lg border border-gray-100">
          <p className="text-gray-600 mb-2">Pago Mensual Estimado</p>
          <p className="text-4xl font-bold text-teal-600">{formatCurrency(results.pagoMensual)}</p>
          <div className="text-sm text-gray-500 mt-4 space-y-1">
            <p>Total a pagar: <span className="font-medium text-gray-900">{formatCurrency(results.totalAPagar)}</span></p>
            <p>Intereses: <span className="font-medium text-gray-900">{formatCurrency(results.totalIntereses)}</span></p>
          </div>
          <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
            *Tasa de interés anual estimada: {(config.tasaAnual * 100).toFixed(2)}% (sin IVA, sujeta a aprobación).
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full text-lg h-12 bg-teal-600 hover:bg-teal-700 text-white" onClick={() => onApply(monto, plazo)}>
          {config.ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
