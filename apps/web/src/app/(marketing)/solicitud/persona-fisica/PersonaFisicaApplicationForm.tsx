'use client'

import { useState, useEffect } from 'react'
import { useForm, FormProvider, FieldPath } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Stepper } from '@/components/Stepper'
import { useFormPersistence } from '@/hooks/useFormPersistence'
import { personaFisicaFormSchema, PersonaFisicaFormData } from '@/lib/schemas/personaFisicaSchema'
import { Step1_DatosPersonales } from './steps/Step1_DatosPersonales'
import { Step2_Empleo } from './steps/Step2_Empleo'
import { Step3_Credito } from './steps/Step3_Credito'
import { Step4_Documentos } from './steps/Step4_Documentos'
import { Step5_Resumen } from './steps/Step5_Resumen'

type Step = {
  title: string
  component: React.ComponentType
  fieldGroup: FieldPath<PersonaFisicaFormData>
}

const steps: Step[] = [
  { title: 'Datos Personales', component: Step1_DatosPersonales, fieldGroup: 'solicitante' },
  { title: 'Situación Laboral', component: Step2_Empleo, fieldGroup: 'empleo' },
  { title: 'Crédito', component: Step3_Credito, fieldGroup: 'credito' },
  { title: 'Documentos', component: Step4_Documentos, fieldGroup: 'documentos' },
  { title: 'Resumen y Envío', component: Step5_Resumen, fieldGroup: 'terminos' },
]

export function PersonaFisicaApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const methods = useForm<PersonaFisicaFormData>({ resolver: zodResolver(personaFisicaFormSchema), mode: 'onBlur' })

  useFormPersistence(methods, 'capitalta-form-persona')

  useEffect(() => {
    const prefilledMonto = localStorage.getItem('prefilledMonto')
    const prefilledPlazo = localStorage.getItem('prefilledPlazo')
    if (prefilledMonto || prefilledPlazo) {
      if (prefilledMonto) {
        methods.setValue('credito.monto', parseFloat(prefilledMonto))
        methods.setValue('credito.tipo', 'PERSONAL')
      }
      if (prefilledPlazo) {
        methods.setValue('credito.plazo', prefilledPlazo as any)
      }
      localStorage.removeItem('prefilledMonto')
      localStorage.removeItem('prefilledPlazo')
    }
  }, [methods.setValue])

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = async () => {
    const fieldGroup = steps[currentStep].fieldGroup
    const isValid = await methods.trigger(fieldGroup)
    if (isValid) {
      setCurrentStep((p) => Math.min(p + 1, steps.length - 1))
      window.scrollTo(0, 0)
    }
  }

  const handlePrev = () => {
    setCurrentStep((p) => Math.max(p - 1, 0))
    window.scrollTo(0, 0)
  }

  const onSubmit = async (data: PersonaFisicaFormData) => {
    try {
      await new Promise((r) => setTimeout(r, 1200))
      localStorage.removeItem('capitalta-form-persona')
      alert('Solicitud enviada con éxito')
      router.push('/dashboard')
    } catch (e) {
      alert('Hubo un error al enviar la solicitud')
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <Stepper currentStep={currentStep} totalSteps={steps.length} stepTitle={steps[currentStep].title} />
        <div className="min-h-[400px]">
          <CurrentStepComponent />
        </div>
        <div className="flex justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 0} className={`w-32 ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Anterior</Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext} className="w-32 bg-purple-600 hover:bg-purple-700 text-white">Siguiente</Button>
          ) : (
            <Button type="submit" className="w-40 bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">Enviar Solicitud</Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
