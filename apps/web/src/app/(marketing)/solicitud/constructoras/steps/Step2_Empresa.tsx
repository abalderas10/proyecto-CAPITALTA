import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Building2, FileBadge, Calendar, MapPin } from 'lucide-react';

export function Step2_Empresa() {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-teal-600">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Datos de la Constructora</h2>
          <p className="text-sm text-gray-500">Proporciona la información fiscal de tu empresa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 size={16} className="text-teal-600" /> Razón Social
            </label>
            <Input 
              {...register('empresa.razonSocial')} 
              placeholder="Ej. Constructora del Norte S.A. de C.V."
              className={errors.empresa?.razonSocial ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.empresa?.razonSocial && (
              <p className="text-xs text-red-500 font-medium">{errors.empresa.razonSocial.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileBadge size={16} className="text-teal-600" /> RFC
            </label>
            <Input 
              {...register('empresa.rfc')} 
              placeholder="ABC123456XYZ"
              className={errors.empresa?.rfc ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.empresa?.rfc && (
              <p className="text-xs text-red-500 font-medium">{errors.empresa.rfc.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar size={16} className="text-teal-600" /> Fecha de Constitución
            </label>
            <Input 
              type="date"
              {...register('empresa.fechaConstitucion')} 
              className={errors.empresa?.fechaConstitucion ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.empresa?.fechaConstitucion && (
              <p className="text-xs text-red-500 font-medium">{errors.empresa.fechaConstitucion.message as string}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin size={16} className="text-teal-600" /> Dirección Fiscal Completa
            </label>
            <Input 
              {...register('empresa.direccion')} 
              placeholder="Calle, Número, Colonia, Ciudad, Estado, CP"
              className={errors.empresa?.direccion ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.empresa?.direccion && (
              <p className="text-xs text-red-500 font-medium">{errors.empresa.direccion.message as string}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
