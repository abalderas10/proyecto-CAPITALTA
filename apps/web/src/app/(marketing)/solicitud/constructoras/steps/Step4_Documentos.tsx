import { useFormContext } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';

export function Step4_Documentos() {
  const { setValue, watch, formState: { errors } } = useFormContext();
  
  // Helper to handle file selection
  const handleFileChange = (field: string) => (file: File | null) => {
    // En un caso real, aquí subiríamos el archivo y guardaríamos la URL.
    // Para este demo, guardamos el nombre del archivo simulando una URL/path.
    if (file) {
      console.log(`Uploading ${file.name} for ${field}...`);
      setValue(`documentos.${field}`, file.name, { shouldValidate: true });
    } else {
      setValue(`documentos.${field}`, '', { shouldValidate: true });
    }
  };

  const docs = watch('documentos');

  return (
    <Card className="p-8 shadow-lg border-t-4 border-t-teal-600">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Documentación Requerida</h2>
          <p className="text-sm text-gray-500">Sube los siguientes documentos en formato PDF. Puedes arrastrarlos y soltarlos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload 
            label="Acta Constitutiva y Poderes"
            value={docs?.actaConstitutiva}
            onChange={handleFileChange('actaConstitutiva')}
            error={errors.documentos?.actaConstitutiva?.message as string}
          />

          <FileUpload 
            label="Constancia de Situación Fiscal (Reciente)"
            value={docs?.constanciaFiscal}
            onChange={handleFileChange('constanciaFiscal')}
            error={errors.documentos?.constanciaFiscal?.message as string}
          />

          <FileUpload 
            label="Estados Financieros (Últimos 2 ejercicios)"
            value={docs?.estadosFinancieros}
            onChange={handleFileChange('estadosFinancieros')}
            error={errors.documentos?.estadosFinancieros?.message as string}
          />

          <FileUpload 
            label="Comprobante de Domicilio de la empresa"
            value={docs?.comprobanteDomicilio}
            onChange={handleFileChange('comprobanteDomicilio')}
            error={errors.documentos?.comprobanteDomicilio?.message as string}
          />
        </div>
      </div>
    </Card>
  );
}
