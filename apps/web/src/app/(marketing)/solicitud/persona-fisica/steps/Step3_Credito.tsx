import { useFormContext } from 'react-hook-form'
import { Input, Select } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export function Step3_Credito() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-purple-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tipo de Crédito</label>
          <Select {...register('credito.tipo')} className={errors.credito?.tipo ? 'border-red-500 focus-visible:ring-red-500' : ''}>
            <option value="">Selecciona</option>
            <option value="PERSONAL">Personal</option>
            <option value="NOMINA">Nómina</option>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Plazo</label>
          <Select {...register('credito.plazo')} className={errors.credito?.plazo ? 'border-red-500 focus-visible:ring-red-500' : ''}>
            <option value="">Selecciona</option>
            <option value="12">12 meses</option>
            <option value="24">24 meses</option>
            <option value="36">36 meses</option>
            <option value="48">48 meses</option>
            <option value="60">60 meses</option>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Monto (MXN)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input type="number" {...register('credito.monto', { valueAsNumber: true })} placeholder="Ej. 150,000" className={`pl-7 ${errors.credito?.monto ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Destino</label>
          <textarea {...register('credito.destino')} placeholder="Describe el destino de los recursos" className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-y ${errors.credito?.destino ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300'}`} />
        </div>
      </div>
    </Card>
  )
}
