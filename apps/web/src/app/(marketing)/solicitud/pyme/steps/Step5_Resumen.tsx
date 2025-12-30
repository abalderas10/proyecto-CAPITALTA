import { useFormContext } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

export function Step5_Resumen() {
  const { watch, register, formState: { errors } } = useFormContext();
  const values = watch();

  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-blue-600">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Resumen de la Solicitud</h2>
          <p className="text-sm text-gray-500">Revisa que todos los datos sean correctos antes de enviar.</p>
        </div>

        <div className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
             <div>
               <h3 className="font-semibold text-gray-900 mb-2">Solicitante</h3>
               <p><span className="text-gray-500">Nombre:</span> {values.solicitante?.nombre}</p>
               <p><span className="text-gray-500">Email:</span> {values.solicitante?.email}</p>
               <p><span className="text-gray-500">Teléfono:</span> {values.solicitante?.telefono}</p>
             </div>
             <div>
               <h3 className="font-semibold text-gray-900 mb-2">Empresa</h3>
               <p><span className="text-gray-500">Razón Social:</span> {values.empresa?.razonSocial}</p>
               <p><span className="text-gray-500">RFC:</span> {values.empresa?.rfc}</p>
             </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
             <h3 className="font-semibold text-gray-900 mb-2">Crédito Solicitado</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <p><span className="text-gray-500">Tipo:</span> {values.credito?.tipo}</p>
               <p><span className="text-gray-500">Monto:</span> ${values.credito?.monto?.toLocaleString()}</p>
               <p><span className="text-gray-500">Plazo:</span> {values.credito?.plazo} meses</p>
             </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start space-x-2">
              <Checkbox id="aceptaVerdad" {...register('terminos.aceptaVerdad')} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="aceptaVerdad"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Declaro que la información proporcionada es verídica.
                </label>
                {errors.terminos?.aceptaVerdad && (
                  <p className="text-xs text-red-500">{errors.terminos.aceptaVerdad.message as string}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="aceptaBuro" {...register('terminos.aceptaBuro')} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="aceptaBuro"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Autorizo la consulta de mi historial crediticio en Buró de Crédito.
                </label>
                {errors.terminos?.aceptaBuro && (
                  <p className="text-xs text-red-500">{errors.terminos.aceptaBuro.message as string}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
