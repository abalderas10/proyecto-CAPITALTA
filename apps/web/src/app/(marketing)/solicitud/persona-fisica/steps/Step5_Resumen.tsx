import { useFormContext } from 'react-hook-form'
import { Card } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/Checkbox'

export function Step5_Resumen() {
  const { watch, register, formState: { errors } } = useFormContext()
  const v = watch()
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-purple-600">
      <div className="space-y-6 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Datos</h3>
            <p><span className="text-gray-500">Nombre:</span> {v.solicitante?.nombre} {v.solicitante?.apellidos}</p>
            <p><span className="text-gray-500">Email:</span> {v.solicitante?.email}</p>
            <p><span className="text-gray-500">Teléfono:</span> {v.solicitante?.telefono}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Crédito</h3>
            <p><span className="text-gray-500">Tipo:</span> {v.credito?.tipo}</p>
            <p><span className="text-gray-500">Monto:</span> ${v.credito?.monto?.toLocaleString()}</p>
            <p><span className="text-gray-500">Plazo:</span> {v.credito?.plazo} meses</p>
          </div>
        </div>
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start space-x-2">
            <Checkbox id="aceptaVerdad" {...register('terminos.aceptaVerdad')} />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="aceptaVerdad" className="text-sm font-medium leading-none">Declaro que la información proporcionada es verídica.</label>
              {errors.terminos?.aceptaVerdad && (<p className="text-xs text-red-500">{errors.terminos.aceptaVerdad.message as string}</p>)}
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="aceptaBuro" {...register('terminos.aceptaBuro')} />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="aceptaBuro" className="text-sm font-medium leading-none">Autorizo la consulta en Buró de Crédito.</label>
              {errors.terminos?.aceptaBuro && (<p className="text-xs text-red-500">{errors.terminos.aceptaBuro.message as string}</p>)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
