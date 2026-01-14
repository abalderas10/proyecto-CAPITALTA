'use client';

import { Slider } from '@/components/ui/Slider';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface SliderPlazoProps {
  value: number;
  minimo: number;
  maximo: number;
  onChange: (value: number) => void;
  label?: string;
  descripcion?: string;
}

export function SliderPlazo({
  value,
  minimo,
  maximo,
  onChange,
  label = 'Plazo en Meses',
  descripcion = 'Selecciona el tiempo para pagar el crédito'
}: SliderPlazoProps) {
  const formatoAños = (meses: number) => {
    const años = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    
    if (años === 0) return `${meses} meses`;
    if (mesesRestantes === 0) return `${años} año${años > 1 ? 's' : ''}`;
    return `${años} año${años > 1 ? 's' : ''} y ${mesesRestantes} mes${mesesRestantes > 1 ? 'es' : ''}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || minimo;
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

      <div className="bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-orange-900/20 dark:to-orange-900/10 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
        <div className="flex items-end gap-4 mb-4">
          <div className="flex-1">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Plazo:
            </p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {value} meses
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {formatoAños(value)}
            </p>
          </div>
          <Input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={minimo}
            max={maximo}
            className="w-20 text-right h-10"
            placeholder="Plazo"
          />
        </div>

        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={minimo}
          max={maximo}
          step={1}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-3">
          <span>{minimo} meses</span>
          <span>{maximo} meses</span>
        </div>
      </div>
    </div>
  );
}
