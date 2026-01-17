'use client';

import { Slider } from '@/components/ui/Slider';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface SliderMontoProps {
  value: number;
  minimo: number;
  maximo: number;
  onChange: (value: number) => void;
  label?: string;
  descripcion?: string;
}

export function SliderMonto({
  value,
  minimo,
  maximo,
  onChange,
  label = 'Monto del Crédito',
  descripcion = 'Selecciona el monto que deseas solicitar'
}: SliderMontoProps) {
  const formatoCurrency = (valor: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || minimo;
    if (newValue >= minimo && newValue <= maximo) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div>
        <Label className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </Label>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {descripcion}
        </p>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-teal-50/50 dark:from-teal-900/20 dark:to-teal-900/10 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
        <div className="flex items-end gap-4 mb-4">
          <div className="flex-1">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Monto:
            </p>
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              {formatoCurrency(value)}
            </p>
          </div>
          <Input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={minimo}
            max={maximo}
            className="w-32 text-right h-10"
            placeholder="Monto"
          />
        </div>

        <Slider
          value={[value]}
          onValueChange={(vals: number[]) => onChange(vals[0])}
          min={minimo}
          max={maximo}
          step={10000}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-3">
          <span>{formatoCurrency(minimo)}</span>
          <span>{formatoCurrency(maximo)}</span>
        </div>
      </div>
    </div>
  );
}
