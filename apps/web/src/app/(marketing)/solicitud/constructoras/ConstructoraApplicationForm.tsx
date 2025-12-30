'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider, FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Stepper } from '@/components/Stepper';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { constructoraFormSchema, ConstructoraFormData } from '@/lib/schemas/constructoraSchema';

// Import steps
import { Step1_Solicitante } from './steps/Step1_Solicitante';
import { Step2_Empresa } from './steps/Step2_Empresa';
import { Step3_Credito } from './steps/Step3_Credito';
import { Step4_Documentos } from './steps/Step4_Documentos';
import { Step5_Resumen } from './steps/Step5_Resumen';

type Step = {
  title: string;
  component: React.ComponentType;
  fieldGroup: FieldPath<ConstructoraFormData>;
};

const steps: Step[] = [
  { title: 'Datos de Contacto', component: Step1_Solicitante, fieldGroup: 'solicitante' },
  { title: 'Datos de la Constructora', component: Step2_Empresa, fieldGroup: 'empresa' },
  { title: 'Detalles del Financiamiento', component: Step3_Credito, fieldGroup: 'credito' },
  { title: 'Documentación', component: Step4_Documentos, fieldGroup: 'documentos' },
  { title: 'Resumen y Envío', component: Step5_Resumen, fieldGroup: 'terminos' },
];

export function ConstructoraApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const methods = useForm<ConstructoraFormData>({
    resolver: zodResolver(constructoraFormSchema),
    mode: 'onBlur',
  });

  // Persistencia automática
  useFormPersistence(methods, 'capitalta-form-constructora');

  // Cargar datos pre-llenados desde la calculadora
  useEffect(() => {
    const prefilledMonto = localStorage.getItem('prefilledMonto');
    const prefilledPlazo = localStorage.getItem('prefilledPlazo');

    if (prefilledMonto || prefilledPlazo) {
      if (prefilledMonto) {
        methods.setValue('credito.monto', parseFloat(prefilledMonto));
        methods.setValue('credito.tipo', 'PUENTE'); // Asumir puente para constructoras
      }
      if (prefilledPlazo) {
        // Asegurar que el plazo sea string para el Select
        methods.setValue('credito.plazo', prefilledPlazo as any);
      }
      
      // Limpiar para no sobrescribir si el usuario cambia y recarga
      localStorage.removeItem('prefilledMonto');
      localStorage.removeItem('prefilledPlazo');
    }
  }, [methods.setValue]);

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = async () => {
    const fieldGroup = steps[currentStep].fieldGroup;
    
    // Validar el grupo de campos actual
    const isValid = await methods.trigger(fieldGroup);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: ConstructoraFormData) => {
    try {
      console.log('Enviando formulario:', data);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpiar persistencia
      localStorage.removeItem('capitalta-form-constructora');
      
      alert('Solicitud enviada con éxito');
      router.push('/dashboard'); // O una página de éxito
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar la solicitud');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <Stepper 
          currentStep={currentStep} 
          totalSteps={steps.length} 
          stepTitle={steps[currentStep].title} 
        />

        <div className="min-h-[400px]">
          <CurrentStepComponent />
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`w-32 ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Anterior
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext} className="w-32 bg-teal-600 hover:bg-teal-700 text-white">
              Siguiente
            </Button>
          ) : (
            <Button type="submit" className="w-40 bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
              Enviar Solicitud
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
