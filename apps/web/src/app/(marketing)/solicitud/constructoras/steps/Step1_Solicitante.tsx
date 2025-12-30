import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { User, Briefcase, Mail, Phone } from 'lucide-react';

export function Step1_Solicitante() {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-teal-600">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Datos de Contacto</h2>
          <p className="text-sm text-gray-500">¿Quién está llenando esta solicitud en nombre de la empresa?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User size={16} className="text-teal-600" /> Nombre Completo
            </label>
            <Input 
              {...register('solicitante.nombre')} 
              placeholder="Ej. Juan Pérez"
              className={errors.solicitante?.nombre ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.solicitante?.nombre && (
              <p className="text-xs text-red-500 font-medium">{errors.solicitante.nombre.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Briefcase size={16} className="text-teal-600" /> Puesto en la empresa
            </label>
            <Input 
              {...register('solicitante.puesto')} 
              placeholder="Ej. Director General"
              className={errors.solicitante?.puesto ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.solicitante?.puesto && (
              <p className="text-xs text-red-500 font-medium">{errors.solicitante.puesto.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail size={16} className="text-teal-600" /> Email Corporativo
            </label>
            <Input 
              type="email"
              {...register('solicitante.email')} 
              placeholder="juan@empresa.com"
              className={errors.solicitante?.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.solicitante?.email && (
              <p className="text-xs text-red-500 font-medium">{errors.solicitante.email.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone size={16} className="text-teal-600" /> Teléfono Móvil
            </label>
            <Input 
              type="tel"
              {...register('solicitante.telefono')} 
              placeholder="5512345678"
              maxLength={10}
              className={errors.solicitante?.telefono ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {errors.solicitante?.telefono && (
              <p className="text-xs text-red-500 font-medium">{errors.solicitante.telefono.message as string}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
