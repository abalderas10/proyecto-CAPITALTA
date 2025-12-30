import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export function Step1_DatosPersonales() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-purple-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nombre</label>
          <Input {...register('solicitante.nombre')} placeholder="Nombre" className={errors.solicitante?.nombre ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Apellidos</label>
          <Input {...register('solicitante.apellidos')} placeholder="Apellidos" className={errors.solicitante?.apellidos ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input type="email" {...register('solicitante.email')} placeholder="correo@ejemplo.com" className={errors.solicitante?.email ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Teléfono</label>
          <Input type="tel" maxLength={10} {...register('solicitante.telefono')} placeholder="5512345678" className={errors.solicitante?.telefono ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">RFC</label>
          <Input {...register('solicitante.rfc')} placeholder="RFC" className={errors.solicitante?.rfc ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">CURP</label>
          <Input {...register('solicitante.curp')} placeholder="CURP" className={errors.solicitante?.curp ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
          <Input type="date" {...register('solicitante.fechaNacimiento')} className={errors.solicitante?.fechaNacimiento ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Domicilio</label>
          <Input {...register('solicitante.domicilio')} placeholder="Calle, número, colonia, ciudad, estado, CP" className={errors.solicitante?.domicilio ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
      </div>
    </Card>
  )
}
