import { useFormContext } from 'react-hook-form'
import { Card } from '@/components/ui/Card'
import { FileUpload } from '@/components/ui/FileUpload'

export function Step4_Documentos() {
  const { setValue, watch, formState: { errors } } = useFormContext()
  const docs = watch('documentos')
  const handle = (field: string) => (file: File | null) => {
    setValue(`documentos.${field}`, file ? file.name : '', { shouldValidate: true })
  }
  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-purple-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload label="Identificación Oficial" value={docs?.identificacion} onChange={handle('identificacion')} error={errors.documentos?.identificacion?.message as string} />
        <FileUpload label="Comprobante de Domicilio" value={docs?.comprobanteDomicilio} onChange={handle('comprobanteDomicilio')} error={errors.documentos?.comprobanteDomicilio?.message as string} />
        <FileUpload label="Comprobantes de Ingresos" value={docs?.comprobanteIngresos} onChange={handle('comprobanteIngresos')} error={errors.documentos?.comprobanteIngresos?.message as string} />
      </div>
    </Card>
  )
}
