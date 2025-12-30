import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'

export function Step2_Empleo() {
  const { register, control, formState: { errors } } = useFormContext()
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-purple-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Situación Laboral</label>
          <Controller
            control={control}
            name="empleo.situacion"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={errors.empleo?.situacion ? 'border-red-500 focus:ring-red-500' : ''}>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASALARIADO">Asalariado</SelectItem>
                  <SelectItem value="INDEPENDIENTE">Independiente</SelectItem>
                  <SelectItem value="JUBILADO">Jubilado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
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
          <Controller
            control={control}
            name="empleo.antiguedad"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={errors.empleo?.antiguedad ? 'border-red-500 focus:ring-red-500' : ''}>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MENOS_1">Menos de 1 año</SelectItem>
                  <SelectItem value="1_A_3">1 a 3 años</SelectItem>
                  <SelectItem value="MAS_3">Más de 3 años</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Ingreso Mensual (MXN)</label>
          <Input type="number" {...register('empleo.ingresoMensual', { valueAsNumber: true })} placeholder="Ej. 25,000" className={errors.empleo?.ingresoMensual ? 'border-red-500 focus-visible:ring-red-500' : ''} />
        </div>
      </div>
    </Card>
  )
}
