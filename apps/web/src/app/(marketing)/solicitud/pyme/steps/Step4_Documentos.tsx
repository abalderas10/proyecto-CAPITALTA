import { useFormContext } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';

export function Step4_Documentos() {
  const { setValue, watch, formState: { errors } } = useFormContext();
  
  // Helper to handle file selection
  const handleFileChange = (field: string) => (file: File | null) => {
    if (file) {
      console.log(`Uploading ${file.name} for ${field}...`);
      setValue(`documentos.${field}`, file.name, { shouldValidate: true });
    } else {
      setValue(`documentos.${field}`, '', { shouldValidate: true });
    }
  };

  const docs = watch('documentos');

  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-blue-600">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Documentación Requerida</h2>
          <p className="text-sm text-gray-500">Sube los siguientes documentos en formato PDF.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload 
            label="Acta Constitutiva y Poderes"
            value={docs?.actaConstitutiva}
            onChange={handleFileChange('actaConstitutiva')}
            error={errors.documentos?.actaConstitutiva?.message as string}
          />

          <FileUpload 
            label="Constancia de Situación Fiscal"
            value={docs?.constanciaFiscal}
            onChange={handleFileChange('constanciaFiscal')}
            error={errors.documentos?.constanciaFiscal?.message as string}
          />

          <FileUpload 
            label="Estados Financieros (Últimos 2 años)"
            value={docs?.estadosFinancieros}
            onChange={handleFileChange('estadosFinancieros')}
            error={errors.documentos?.estadosFinancieros?.message as string}
          />

          <FileUpload 
            label="Comprobante de Domicilio"
            value={docs?.comprobanteDomicilio}
            onChange={handleFileChange('comprobanteDomicilio')}
            error={errors.documentos?.comprobanteDomicilio?.message as string}
          />

          <FileUpload 
            label="Identificación del Representante Legal"
            value={docs?.identificacionRepresentante}
            onChange={handleFileChange('identificacionRepresentante')}
            error={errors.documentos?.identificacionRepresentante?.message as string}
          />
        </div>
      </div>
    </Card>
  );
}
