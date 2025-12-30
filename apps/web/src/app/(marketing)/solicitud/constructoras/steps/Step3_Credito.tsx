import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { DollarSign, CalendarDays, FileText, PieChart } from 'lucide-react';

export function Step3_Credito() {
  const { register, control, formState: { errors } } = useFormContext();
  
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
            <Controller
              control={control}
              name="credito.tipo"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={errors.credito?.tipo ? 'border-red-500 focus:ring-red-500' : ''}>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUENTE">Crédito Puente</SelectItem>
                    <SelectItem value="CAPITAL_TRABAJO">Capital de Trabajo</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.credito?.tipo && (
              <p className="text-xs text-red-500 font-medium">{errors.credito.tipo.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CalendarDays size={16} className="text-teal-600" /> Plazo Deseado
            </label>
            <Controller
              control={control}
              name="credito.plazo"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={errors.credito?.plazo ? 'border-red-500 focus:ring-red-500' : ''}>
                    <SelectValue placeholder="Selecciona un plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="18">18 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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
