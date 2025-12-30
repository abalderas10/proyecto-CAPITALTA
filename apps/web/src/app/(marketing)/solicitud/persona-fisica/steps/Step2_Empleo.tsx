import { useFormContext } from 'react-hook-form'
import { Input, Select } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export function Step2_Empleo() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-purple-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Situación Laboral</label>
          <Select {...register('empleo.situacion')} className={errors.empleo?.situacion ? 'border-red-500 focus-visible:ring-red-500' : ''}>
            <option value="">Selecciona</option>
            <option value="ASALARIADO">Asalariado</option>
            <option value="INDEPENDIENTE">Independiente</option>
            <option value="JUBILADO">Jubilado</option>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Empresa/Negocio</label>
          <Input {...register('empleo.empresa')} placeholder="Nombre" className={errors.empleo?.empresa ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Puesto</label>
          <Input {...register('empleo.puesto')} placeholder="Puesto" className={errors.empleo?.puesto ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Antigüedad</label>
          <Select {...register('empleo.antiguedad')} className={errors.empleo?.antiguedad ? 'border-red-500 focus-visible:ring-red-500' : ''}>
            <option value="">Selecciona</option>
            <option value="MENOS_1">Menos de 1 año</option>
            <option value="1_A_3">1 a 3 años</option>
            <option value="MAS_3">Más de 3 años</option>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Ingreso Mensual (MXN)</label>
          <Input type="number" {...register('empleo.ingresoMensual', { valueAsNumber: true })} placeholder="Ej. 25,000" className={errors.empleo?.ingresoMensual ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
      </div>
    </Card>
  )
}
