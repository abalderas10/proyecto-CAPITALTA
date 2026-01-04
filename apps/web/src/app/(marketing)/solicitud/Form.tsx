"use client"
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stepper } from '@/components/Stepper'
import { Progress } from '@/components/Progress'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/ui/FileUpload'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCreateGarantia, useGetGarantias, useDeleteGarantia } from '@/hooks/useGarantias'
import { useUploadDocumento, useGetDocumentos } from '@/hooks/useDocumentos'
import { Plus, Trash2, CheckCircle, FileText } from 'lucide-react'

// Schema only for Organization now, since User is authenticated
const orgSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  rfc: z.string().min(12, "RFC debe tener 12-13 caracteres").max(13),
  tipo: z.enum(['PERSONA_MORAL', 'PERSONA_FISICA'])
})

const creditoSchema = z.object({
  producto: z.string().min(2, "Selecciona un producto"),
  monto: z.number().positive("El monto debe ser positivo"),
  plazoMeses: z.number().int().positive("El plazo debe ser positivo")
})

const garantiaSchema = z.object({
  tipo: z.string().min(1, "Selecciona un tipo"),
  valor: z.number().positive("El valor debe ser positivo"),
  descripcion: z.string().optional()
})

export default function Form() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [currentSolicitudId, setCurrentSolicitudId] = useState<string | null>(null)
  
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [checkingOrg, setCheckingOrg] = useState(true)
  
  // Hooks for Step 2 & 3
  const { data: garantias, refetch: refetchGarantias } = useGetGarantias(currentSolicitudId || '')
  const createGarantia = useCreateGarantia()
  const deleteGarantia = useDeleteGarantia()
  const { data: documentos, refetch: refetchDocumentos } = useGetDocumentos(currentSolicitudId || '')
  const uploadDocumento = useUploadDocumento()

  const notify = (msg: string, type: 'success' | 'error' = 'success') => { 
    setToast({ msg, type }); 
    setTimeout(() => setToast(null), 3000) 
  }

  const handleDeleteGarantia = async (id: string) => {
    try {
      await deleteGarantia.mutateAsync(id)
      notify('Garantía eliminada')
      refetchGarantias()
    } catch (error) {
      notify('Error al eliminar garantía', 'error')
    }
  }
  
  const steps = [{ title: 'Empresa' }, { title: 'Crédito' }, { title: 'Garantías' }, { title: 'Documentos' }, { title: 'Finalizar' }]

  const orgForm = useForm({ 
    resolver: zodResolver(orgSchema),
    defaultValues: {
      nombre: '',
      rfc: '',
      tipo: 'PERSONA_MORAL' as const
    }
  })
  
  const creditoForm = useForm({ 
    resolver: zodResolver(creditoSchema),
    defaultValues: {
      producto: '',
      monto: 0,
      plazoMeses: 0
    }
  })

  const garantiaForm = useForm({
    resolver: zodResolver(garantiaSchema),
    defaultValues: {
      tipo: '',
      valor: 0,
      descripcion: ''
    }
  })

  // Check for existing organization when session loads
  useEffect(() => {
    if (status === 'authenticated') {
      const checkOrg = async () => {
        try {
          // Placeholder for checking existing org
          setCheckingOrg(false)
        } catch (e) {
          setCheckingOrg(false)
        }
      }
      checkOrg()
    } else if (status === 'unauthenticated') {
      setCheckingOrg(false)
    }
  }, [status])

  useEffect(() => {
    // Prefill from calculator
    const prefilledMonto = localStorage.getItem('prefilledMonto')
    const prefilledPlazo = localStorage.getItem('prefilledPlazo')
    
    if (prefilledMonto) {
      creditoForm.setValue('monto', Number(prefilledMonto))
    }
    if (prefilledPlazo) {
      creditoForm.setValue('plazoMeses', Number(prefilledPlazo))
    }
  }, [creditoForm])

  const submitOrg = async (e: any) => {
    e.preventDefault()
    const valid = await orgForm.trigger()
    if (!valid) return
    
    setIsLoading(true)
    try {
      const body = orgForm.getValues()
      const res = await fetch('/api/organizaciones', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar organización')
      }

      notify('Organización guardada/vinculada')
      setStep(1)
    } catch (error: any) {
      notify(error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const submitCredito = async (e: any) => {
    e.preventDefault()
    const valid = await creditoForm.trigger()
    if (!valid) return
    
    setIsLoading(true)
    try {
      const values = creditoForm.getValues()
      
      const body = {
        producto: values.producto,
        montoCentavos: Math.round(values.monto * 100),
        plazoMeses: values.plazoMeses
      }

      const res = await fetch('/api/solicitudes', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
      })
      
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Error al crear solicitud')
      }

      // Store ID for next steps
      if (data.id) {
        setCurrentSolicitudId(data.id)
      } else {
        // Fallback if ID is not returned directly (should be checked)
        console.warn('No ID returned from create solicitud')
      }

      // Clear calculator local storage
      localStorage.removeItem('prefilledMonto')
      localStorage.removeItem('prefilledPlazo')
      
      notify('Solicitud creada. Ahora agrega garantías.')
      setStep(2) 
    } catch (error: any) {
      notify(error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const submitGarantia = async (e: any) => {
    e.preventDefault()
    const valid = await garantiaForm.trigger()
    if (!valid) return
    if (!currentSolicitudId) {
        notify('Error: No hay solicitud activa', 'error')
        return
    }

    try {
        const values = garantiaForm.getValues()
        await createGarantia.mutateAsync({
            ...values,
            solicitudId: currentSolicitudId
        })
        notify('Garantía agregada')
        garantiaForm.reset({ tipo: '', valor: 0, descripcion: '' })
        refetchGarantias()
    } catch (error: any) {
        notify('Error al agregar garantía', 'error')
    }
  }

  const handleFileUpload = async (file: File, docType: string) => {
    if (!currentSolicitudId) return
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', docType) // Backend likely needs to know document type
    
    try {
        await uploadDocumento.mutateAsync({
            solicitudId: currentSolicitudId,
            formData
        })
        notify(`Documento ${docType} subido correctamente`)
        refetchDocumentos()
    } catch (error) {
        notify('Error al subir documento', 'error')
    }
  }

  // Helper to check if a specific doc type is already uploaded
  const isDocUploaded = (docName: string) => {
      // Logic depends on how backend names files. 
      // Assuming 'name' or some metadata field matches docName or we just show all.
      // For simplicity, we just list uploaded files below.
      return false
  }

  if (status === 'loading' || checkingOrg) {
    return <div className="text-center py-12">Cargando...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <Card className="p-8 text-center space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Crea tu cuenta</h2>
          <p className="text-muted-foreground">
            Para formalizar tu solicitud y obtener una pre-aprobación, necesitamos crear tu expediente seguro.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button className="w-full" size="lg" asChild>
            <Link href="/registro">
              Registrarme ahora
            </Link>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Inicia sesión
            </Link>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Progress value={(step / (steps.length - 1)) * 100} />
      <Stepper currentStep={step} totalSteps={steps.length} stepTitle={steps[step].title} />
      
      {toast && (
        <div className={`px-4 py-3 rounded border ${
          toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* STEP 0: EMPRESA */}
      {step === 0 && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Datos de la Empresa</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Ingresa los datos fiscales de la empresa o persona física solicitante.
            </p>
            <form onSubmit={submitOrg} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre / Razón Social</label>
                <Input placeholder="Ej. Comercializadora del Norte SA de CV" {...orgForm.register('nombre')} />
                {orgForm.formState.errors.nombre && <p className="text-sm text-red-500">{orgForm.formState.errors.nombre.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">RFC</label>
                <Input placeholder="AAA010101AAA" {...orgForm.register('rfc')} />
                {orgForm.formState.errors.rfc && <p className="text-sm text-red-500">{orgForm.formState.errors.rfc.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Persona</label>
                <Controller
                  control={orgForm.control}
                  name="tipo"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de Persona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERSONA_MORAL">Persona Moral</SelectItem>
                        <SelectItem value="PERSONA_FISICA">Persona Física con Actividad Empresarial</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Guardando...' : 'Guardar y Continuar'}
              </Button>
            </form>
          </div>
        </Card>
      )}

      {/* STEP 1: CREDITO */}
      {step === 1 && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Detalles del Crédito</h2>
            <form onSubmit={submitCredito} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Producto</label>
                <Controller
                  control={creditoForm.control}
                  name="producto"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un producto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CREDITO_PUENTE">Crédito Puente</SelectItem>
                        <SelectItem value="CREDITO_PYME">Crédito Pyme</SelectItem>
                        <SelectItem value="PRESTAMO_PERSONAL">Préstamo Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {creditoForm.formState.errors.producto && (
                  <p className="text-sm text-red-500">{creditoForm.formState.errors.producto.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Monto Solicitado</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="pl-7"
                    {...creditoForm.register('monto', { valueAsNumber: true })} 
                  />
                </div>
                {creditoForm.formState.errors.monto && (
                  <p className="text-sm text-red-500">{creditoForm.formState.errors.monto.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Plazo (meses)</label>
                <Input 
                  type="number" 
                  placeholder="Plazo en meses" 
                  {...creditoForm.register('plazoMeses', { valueAsNumber: true })} 
                />
                {creditoForm.formState.errors.plazoMeses && (
                  <p className="text-sm text-red-500">{creditoForm.formState.errors.plazoMeses.message as string}</p>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(0)}>Atrás</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creando...' : 'Crear y Continuar'}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* STEP 2: GARANTIAS */}
      {step === 2 && (
        <Card>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Garantías</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    Registra las garantías que respaldarán tu solicitud. Puedes agregar múltiples.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4 border-r pr-0 md:pr-8 border-border">
                        <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Nueva Garantía</h3>
                        <form onSubmit={submitGarantia} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tipo de Garantía</label>
                                <Controller
                                    control={garantiaForm.control}
                                    name="tipo"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona el tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="INMUEBLE_RESIDENCIAL">Inmueble Residencial</SelectItem>
                                                <SelectItem value="INMUEBLE_COMERCIAL">Inmueble Comercial</SelectItem>
                                                <SelectItem value="TERRENO">Terreno</SelectItem>
                                                <SelectItem value="VEHICULO">Vehículo</SelectItem>
                                                <SelectItem value="EQUIPO">Maquinaria / Equipo</SelectItem>
                                                <SelectItem value="OTRO">Otro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {garantiaForm.formState.errors.tipo && <p className="text-sm text-red-500">{garantiaForm.formState.errors.tipo.message as string}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Valor Estimado (MXN)</label>
                                <Input 
                                    type="number" 
                                    placeholder="0.00" 
                                    {...garantiaForm.register('valor', { valueAsNumber: true })} 
                                />
                                {garantiaForm.formState.errors.valor && <p className="text-sm text-red-500">{garantiaForm.formState.errors.valor.message as string}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Descripción / Dirección</label>
                                <Textarea 
                                    placeholder="Describe brevemente la garantía o su ubicación..." 
                                    {...garantiaForm.register('descripcion')} 
                                />
                            </div>

                            <Button type="submit" variant="secondary" className="w-full" disabled={createGarantia.isPending}>
                                <Plus className="w-4 h-4 mr-2" /> Agregar Garantía
                            </Button>
                        </form>
                    </div>

                    <div>
                        <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-4">Garantías Agregadas</h3>
                        <div className="space-y-3">
                            {garantias && garantias.length > 0 ? (
                                garantias.map((g) => (
                                    <div key={g.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                                        <div>
                                            <p className="font-medium text-sm">{g.tipo.replace('_', ' ')}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(g.valor)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                                                <CheckCircle className="h-3 w-3" />
                                            </div>
                                            <Button 
                                                type="button"
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDeleteGarantia(g.id)}
                                                disabled={deleteGarantia.isPending}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                    <p className="text-sm">No has agregado garantías aún.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pt-8 border-t mt-8">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>Atrás</Button>
                    <Button type="button" onClick={() => setStep(3)}>
                        Continuar
                    </Button>
                </div>
            </div>
        </Card>
      )}

      {/* STEP 3: DOCUMENTOS */}
      {step === 3 && (
        <Card>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Documentación</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    Sube los documentos requeridos para agilizar el análisis de tu crédito.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload 
                        label="Acta Constitutiva" 
                        onChange={(file) => file && handleFileUpload(file, 'ACTA_CONSTITUTIVA')}
                    />
                     <FileUpload 
                        label="RFC / Constancia de Situación Fiscal" 
                        onChange={(file) => file && handleFileUpload(file, 'RFC')}
                    />
                     <FileUpload 
                        label="Comprobante de Domicilio" 
                        onChange={(file) => file && handleFileUpload(file, 'COMPROBANTE_DOMICILIO')}
                    />
                     <FileUpload 
                        label="Estados Financieros (Últimos 2 años)" 
                        onChange={(file) => file && handleFileUpload(file, 'ESTADOS_FINANCIEROS')}
                    />
                </div>

                <div className="mt-8">
                    <h3 className="font-medium text-sm mb-4">Documentos Subidos</h3>
                    <div className="space-y-2">
                        {documentos?.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span>{doc.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between pt-8 border-t mt-8">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>Atrás</Button>
                    <Button type="button" onClick={() => setStep(4)} disabled={!documentos || documentos.length === 0}>
                        Finalizar Solicitud
                    </Button>
                </div>
            </div>
        </Card>
      )}
      
      {/* STEP 4: SUCCESS */}
      {step === 4 && (
        <Card className="p-12 text-center">
          <div className="mb-4 text-green-600">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Solicitud Completada!</h2>
          <p className="text-muted-foreground mb-6">
            Hemos recibido tu solicitud completa con garantías y documentos. Un analista revisará tu expediente en breve.
          </p>
          <Button asChild>
            <Link href="/dashboard">Ir al Dashboard</Link>
          </Button>
        </Card>
      )}
    </div>
  )
}
