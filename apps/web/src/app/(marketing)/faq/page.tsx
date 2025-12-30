import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: 'Preguntas Frecuentes — Capitalta',
  description: 'Resuelve tus dudas sobre nuestros créditos y procesos.',
}

// Simple Accordion implementation since I don't have the shadcn component handy yet.
// I'll create a simple one inline or use the existing structure.
// Actually, to be safe and quick, I'll build a custom simple accordion here.

function SimpleAccordion({ items }: { items: { question: string, answer: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg bg-white overflow-hidden">
          <details className="group">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 bg-gray-50 hover:bg-gray-100">
              <span>{item.question}</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="text-gray-600 p-4 border-t group-open:animate-fadeIn">
              {item.answer}
            </div>
          </details>
        </div>
      ))}
    </div>
  )
}

const faqs = [
  {
    question: "¿Cuáles son los requisitos mínimos para solicitar un crédito?",
    answer: "Para Personas Morales: Acta constitutiva, RFC, Comprobante de domicilio, Estados financieros (últimos 2 años) y Declaraciones anuales. Para Personas Físicas con Actividad Empresarial: Identificación oficial, RFC, Constancia de situación fiscal y Estados de cuenta bancarios."
  },
  {
    question: "¿Cuánto tiempo tarda el proceso de aprobación?",
    answer: "Nuestro proceso es muy ágil. Una vez que completas tu expediente digital, recibes una oferta preliminar en minutos. La aprobación formal y el desembolso suelen tomar entre 24 y 48 horas hábiles."
  },
  {
    question: "¿Necesito garantía hipotecaria?",
    answer: "Depende del producto y el monto. Para créditos PYME de capital de trabajo hasta $2M, generalmente no requerimos garantía hipotecaria. Para montos mayores o créditos puente de construcción, sí solicitamos garantía inmobiliaria, la cual puede ser el mismo proyecto que estás desarrollando."
  },
  {
    question: "¿Puedo adelantar pagos sin penalización?",
    answer: "¡Sí! En Capitalta creemos en la libertad financiera. Puedes realizar pagos anticipados a capital en cualquier momento sin penalizaciones ocultas, lo que te ayudará a reducir los intereses totales de tu crédito."
  },
  {
    question: "¿Operan en toda la República Mexicana?",
    answer: "Así es. Gracias a nuestra plataforma 100% digital, atendemos a clientes en cualquier estado de México."
  },
  {
    question: "¿Están regulados?",
    answer: "Sí, Capitalta es una SOFOM ENR (Sociedad Financiera de Objeto Múltiple, Entidad No Regulada), supervisada por la CNBV en materia de prevención de lavado de dinero y por la CONDUSEF en materia de protección al usuario."
  }
]

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h1>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas saber sobre Capitalta.
          </p>
        </div>

        <SimpleAccordion items={faqs} />
      </div>
    </main>
  )
}
