import { useFormContext } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { Check, Edit2, User, Building2, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Step5_Resumen() {
  const { register, watch, formState: { errors } } = useFormContext();
  const data = watch();

  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-teal-600">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Revisa y Confirma</h2>
          <p className="text-gray-500">Verifica que toda la información sea correcta antes de enviar tu solicitud.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Solicitante */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3 text-teal-700 font-medium border-b border-gray-200 pb-2">
              <User size={18} />
              <h3>Solicitante</h3>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium text-gray-900">Nombre:</span> {data.solicitante?.nombre}</p>
              <p><span className="font-medium text-gray-900">Puesto:</span> {data.solicitante?.puesto}</p>
              <p><span className="font-medium text-gray-900">Email:</span> {data.solicitante?.email}</p>
              <p><span className="font-medium text-gray-900">Tel:</span> {data.solicitante?.telefono}</p>
            </div>
          </div>

          {/* Empresa */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3 text-teal-700 font-medium border-b border-gray-200 pb-2">
              <Building2 size={18} />
              <h3>Empresa</h3>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium text-gray-900">Razón Social:</span> {data.empresa?.razonSocial}</p>
              <p><span className="font-medium text-gray-900">RFC:</span> {data.empresa?.rfc}</p>
              <p><span className="font-medium text-gray-900">Constitución:</span> {data.empresa?.fechaConstitucion}</p>
            </div>
          </div>

          {/* Crédito */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3 text-teal-700 font-medium border-b border-gray-200 pb-2">
              <CreditCard size={18} />
              <h3>Crédito</h3>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium text-gray-900">Tipo:</span> {data.credito?.tipo}</p>
              <p><span className="font-medium text-gray-900">Monto:</span> ${data.credito?.monto?.toLocaleString()}</p>
              <p><span className="font-medium text-gray-900">Plazo:</span> {data.credito?.plazo} meses</p>
            </div>
          </div>

          {/* Documentos */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3 text-teal-700 font-medium border-b border-gray-200 pb-2">
              <FileText size={18} />
              <h3>Documentos</h3>
            </div>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                {data.documentos?.actaConstitutiva ? <Check size={14} className="text-green-500" /> : <span className="w-3.5 h-3.5 rounded-full bg-gray-200 block" />}
                Acta Constitutiva
              </li>
              <li className="flex items-center gap-2">
                {data.documentos?.constanciaFiscal ? <Check size={14} className="text-green-500" /> : <span className="w-3.5 h-3.5 rounded-full bg-gray-200 block" />}
                Constancia Fiscal
              </li>
              <li className="flex items-center gap-2">
                {data.documentos?.estadosFinancieros ? <Check size={14} className="text-green-500" /> : <span className="w-3.5 h-3.5 rounded-full bg-gray-200 block" />}
                Estados Financieros
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t">
          <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all
            ${errors.terminos?.aceptaVerdad ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white hover:border-teal-100'}
          `}>
            <input 
              type="checkbox" 
              {...register('terminos.aceptaVerdad')}
              className="mt-1 h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <div className="text-sm">
              <span className="font-medium text-gray-900 block mb-1">Declaración de Verdad</span>
              <span className="text-gray-600">
                Declaro bajo protesta de decir verdad que toda la información proporcionada es correcta y autorizo a Capitalta a realizar la consulta de mi historial crediticio y el de la empresa representada.
              </span>
            </div>
          </label>
          {errors.terminos?.aceptaVerdad && (
            <p className="text-xs text-red-500 mt-2 font-medium ml-11">{errors.terminos.aceptaVerdad.message as string}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
