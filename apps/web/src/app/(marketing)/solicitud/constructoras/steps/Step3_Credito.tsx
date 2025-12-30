import { useFormContext } from 'react-hook-form';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { DollarSign, CalendarDays, FileText, PieChart } from 'lucide-react';

export function Step3_Credito() {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-teal-600">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Detalles del Financiamiento</h2>
          <p className="text-sm text-gray-500">Cuéntanos sobre el crédito que necesitas y el proyecto a desarrollar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <PieChart size={16} className="text-teal-600" /> Tipo de Crédito
            </label>
            <Select 
              {...register('credito.tipo')} 
              className={errors.credito?.tipo ? 'border-red-500 focus-visible:ring-red-500' : ''}
            >
              <option value="">Selecciona una opción</option>
              <option value="PUENTE">Crédito Puente</option>
              <option value="CAPITAL_TRABAJO">Capital de Trabajo</option>
            </Select>
            {errors.credito?.tipo && (
              <p className="text-xs text-red-500 font-medium">{errors.credito.tipo.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CalendarDays size={16} className="text-teal-600" /> Plazo Deseado
            </label>
            <Select 
              {...register('credito.plazo')} 
              className={errors.credito?.plazo ? 'border-red-500 focus-visible:ring-red-500' : ''}
            >
              <option value="">Selecciona un plazo</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
              <option value="36">36 meses</option>
            </Select>
            {errors.credito?.plazo && (
              <p className="text-xs text-red-500 font-medium">{errors.credito.plazo.message as string}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <DollarSign size={16} className="text-teal-600" /> Monto Solicitado (MXN)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input 
                type="number"
                {...register('credito.monto', { valueAsNumber: true })} 
                placeholder="Ej. 2,000,000"
                className={`pl-7 ${errors.credito?.monto ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
            </div>
            {errors.credito?.monto && (
              <p className="text-xs text-red-500 font-medium">{errors.credito.monto.message as string}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText size={16} className="text-teal-600" /> Descripción del Proyecto
            </label>
            <textarea 
              {...register('credito.descripcion')} 
              placeholder="Describe brevemente el proyecto, ubicación, avance de obra, etc."
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all min-h-[100px] resize-y
                ${errors.credito?.descripcion ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300'}
              `}
            />
            {errors.credito?.descripcion && (
              <p className="text-xs text-red-500 font-medium">{errors.credito.descripcion.message as string}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
