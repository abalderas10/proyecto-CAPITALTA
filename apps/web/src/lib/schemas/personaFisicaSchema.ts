import { z } from 'zod';

export const personaFisicaFormSchema = z.object({
  // Paso 1: Información Personal
  solicitante: z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    apellidos: z.string().min(2, "Los apellidos son requeridos"),
    email: z.string().email("Ingresa un email válido"),
    telefono: z.string().min(10, "El teléfono debe tener 10 dígitos").max(10, "El teléfono debe tener 10 dígitos"),
    rfc: z.string().min(13, "El RFC debe tener 13 caracteres").max(13, "El RFC debe tener 13 caracteres"),
    curp: z.string().min(18, "La CURP debe tener 18 caracteres").max(18, "La CURP debe tener 18 caracteres"),
    fechaNacimiento: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Fecha inválida" }),
    domicilio: z.string().min(10, "El domicilio completo es requerido"),
  }),

  // Paso 2: Información Laboral
  empleo: z.object({
    situacion: z.enum(['ASALARIADO', 'INDEPENDIENTE', 'JUBILADO'], { required_error: "Selecciona tu situación laboral" }),
    empresa: z.string().min(2, "El nombre de la empresa/negocio es requerido"),
    puesto: z.string().min(2, "El puesto es requerido"),
    antiguedad: z.enum(['MENOS_1', '1_A_3', 'MAS_3'], { required_error: "Selecciona tu antigüedad" }),
    ingresoMensual: z.number().min(5000, "El ingreso mínimo debe ser $5,000").positive(),
  }),

  // Paso 3: Información del Crédito
  credito: z.object({
    tipo: z.enum(['PERSONAL', 'NOMINA'], { required_error: "Selecciona un tipo de crédito" }),
    monto: z.number().min(10000, "El monto mínimo es $10,000").positive(),
    plazo: z.enum(['12', '24', '36', '48', '60'], { required_error: "Selecciona un plazo" }),
    destino: z.string().min(5, "Indica el destino del crédito"),
  }),

  // Paso 4: Documentación
  documentos: z.object({
    identificacion: z.string().min(1, "La Identificación Oficial es requerida"),
    comprobanteDomicilio: z.string().min(1, "El Comprobante de Domicilio es requerido"),
    comprobanteIngresos: z.string().min(1, "Los Comprobantes de Ingresos son requeridos"),
  }),
  
  // Paso 5: Términos
  terminos: z.object({
    aceptaVerdad: z.boolean().refine(val => val === true, { message: "Debes aceptar la declaración de verdad" }),
    aceptaBuro: z.boolean().refine(val => val === true, { message: "Debes autorizar la consulta de Buró de Crédito" }),
  })
});

export type PersonaFisicaFormData = z.infer<typeof personaFisicaFormSchema>;
