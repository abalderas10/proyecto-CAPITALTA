import { copyPyme } from '@/content/copy'
import { LoanCalculatorWrapper } from '@/components/features/calculator/LoanCalculatorWrapper'
import { pymeConfig } from '@/data/calculatorConfigs'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/ui/Section'
import { KPI } from '@/components/ui/KPI'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  Laptop, 
  ShieldCheck, 
  TrendingUp, 
  UserPlus, 
  PieChart, 
  Banknote, 
  CheckCircle2,
  Rocket,
  Handshake
} from 'lucide-react'

export const metadata = {
  title: 'Crédito Simple PYME — Capitalta',
  description: 'Capital de trabajo para PYMEs con proceso digital y seguimiento claro.'
}

export default function Page() {
  const c = copyPyme
  const benefitIcons = [Laptop, ShieldCheck, TrendingUp]
  const processIcons = [UserPlus, PieChart, Handshake, Banknote]

  return (
    <main className="max-w-5xl mx-auto py-12 space-y-20">
      <Hero 
        title={c.heroHeadline || c.title} 
        subtitle={c.heroSubheadline || c.subtitle} 
        primary={c.ctaPrimary} 
        secondary={c.ctaSecondary}
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
      />
      
      <Section title="Nos respaldan">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {['Logo 1','Logo 2','Logo 3','Logo 4','Logo 5','Logo 6'].map(l => (
            <div key={l} className="flex items-center justify-center p-4 border rounded-lg bg-white/50">{l}</div>
          ))}
        </div>
      </Section>

      {c.differentiators && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.differentiators.map((d) => (
            <Card key={d} className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="font-medium text-lg text-primary-900">{d}</span>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Beneficios Clave</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {c.benefits.map((b, i) => {
            const Icon = benefitIcons[i] || CheckCircle2
            return (
              <Card key={b} className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{b}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Impulsa tu negocio con capital rápido y condiciones claras.
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {c.hybridProcess && (
        <section className="bg-slate-50 -mx-4 px-4 py-16 md:rounded-3xl">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">{c.hybridProcess.title}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {c.hybridProcess.subtitle}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {c.hybridProcess.cards.map((card) => {
                const Icon = card.icon === 'Rocket' ? Rocket : ShieldCheck
                return (
                  <Card key={card.title} className="bg-white border-none shadow-xl">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {c.useCases && (
        <Section title="Sectores">
          <Tabs defaultValue={c.useCases[0]} className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent justify-center mb-8">
              {c.useCases.map((u) => (
                <TabsTrigger 
                  key={u} 
                  value={u}
                  className="px-6 py-3 rounded-full border bg-white data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {u}
                </TabsTrigger>
              ))}
            </TabsList>
            {c.useCases.map((u) => (
              <TabsContent key={u} value={u} className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">{u}</CardTitle>
                    <CardDescription>Soluciones para tu industria</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg text-muted-foreground">
                      Entendemos los retos de <strong>{u.toLowerCase()}</strong>. 
                      Nuestros asesores tienen experiencia en tu sector para ofrecerte la mejor solución.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </Section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {c.kpis.map((k) => (
          <div key={k} className="p-4">
            <KPI value={k.split(' ')[0]} label={k.substring(k.indexOf(' ')+1)} />
          </div>
        ))}
      </div>

      <section className="max-w-3xl mx-auto w-full space-y-8">
        <h2 className="text-3xl font-bold text-center">Preguntas frecuentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {c.faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {c.process && (
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Proceso Transparente</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, rápido y seguro. Así es obtener capital con nosotros.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10" />
            
            {c.process.map((p, i) => {
               const Icon = processIcons[i] || CheckCircle2
               return (
                <div key={p.step} className="flex flex-col items-center text-center space-y-4 bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center font-bold text-xl shadow-sm relative z-10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider">Paso 0{i + 1}</div>
                    <h3 className="font-bold text-lg leading-tight">{p.step}</h3>
                    <p className="text-sm text-muted-foreground">{p.detail}</p>
                  </div>
                </div>
               )
            })}
          </div>
        </section>
      )}

      {c.testimonials && (
        <section className="space-y-8 bg-slate-900 text-white -mx-4 px-4 py-16 md:rounded-3xl text-center">
          <h2 className="text-3xl font-bold">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {c.testimonials.map((t) => (
              <div key={t.author} className="space-y-6">
                <div className="text-4xl text-primary opacity-50">“</div>
                <p className="text-2xl font-medium leading-relaxed">{t.quote}</p>
                <div className="font-bold text-primary text-lg">— {t.author}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="space-y-4">
        <LoanCalculatorWrapper config={pymeConfig} redirectPath="/solicitud" />
        <p className="text-center text-sm text-muted-foreground">
          Proceso 100% digital hasta la firma del contrato.
        </p>
      </div>

      {c.compliance && (
        <section className="border-t pt-8">
          <div className="flex flex-wrap justify-center gap-4">
            {c.compliance.map((x) => (
              <div key={x} className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 px-3 py-1.5 rounded-full border">
                <ShieldCheck className="w-4 h-4" />
                {x}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
