import { z } from 'zod';

export const constructoraFormSchema = z.object({
  // Paso 1: Información del Solicitante
  solicitante: z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    puesto: z.string().min(2, "El puesto es requerido"),
    email: z.string().email("Ingresa un email válido"),
    telefono: z.string().min(10, "El teléfono debe tener 10 dígitos").max(10, "El teléfono debe tener 10 dígitos").regex(/^\d+$/, "Solo se permiten números"),
  }),

  // Paso 2: Información de la Empresa
  empresa: z.object({
    razonSocial: z.string().min(2, "La razón social es requerida"),
    rfc: z.string().min(12, "El RFC debe tener al menos 12 caracteres").max(13, "El RFC no puede tener más de 13 caracteres").regex(/^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d$/, "RFC inválido"),
    fechaConstitucion: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Fecha inválida" }),
    direccion: z.string().min(5, "La dirección completa es requerida"),
  }),

  // Paso 3: Información del Crédito
  credito: z.object({
    tipo: z.enum(['PUENTE', 'CAPITAL_TRABAJO'], { required_error: "Selecciona un tipo de crédito" }),
    monto: z.number().min(100000, "El monto mínimo es $100,000").positive("El monto debe ser positivo"),
    plazo: z.enum(['12', '18', '24', '36'], { required_error: "Selecciona un plazo" }),
    descripcion: z.string().min(20, "Describe brevemente el proyecto (mínimo 20 caracteres)"),
  }),

  // Paso 4: Documentación
  // En el frontend guardaremos la referencia al archivo subido (string/url) o un objeto temporal
  // Para validación inicial, requerimos que existan
  documentos: z.object({
    actaConstitutiva: z.string().min(1, "El Acta Constitutiva es requerida"),
    constanciaFiscal: z.string().min(1, "La Constancia de Situación Fiscal es requerida"),
    estadosFinancieros: z.string().min(1, "Los Estados Financieros son requeridos"),
    comprobanteDomicilio: z.string().min(1, "El Comprobante de Domicilio es requerido"),
  }),
  
  // Paso 5: Términos
  terminos: z.object({
    aceptaVerdad: z.boolean().refine(val => val === true, { message: "Debes aceptar la declaración de verdad" }),
  })
});

export type ConstructoraFormData = z.infer<typeof constructoraFormSchema>;
