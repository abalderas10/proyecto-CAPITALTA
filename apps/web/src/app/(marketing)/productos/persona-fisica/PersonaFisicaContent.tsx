"use client"

import { useRouter } from 'next/navigation'
import { copyPersonaFisica } from '@/content/copy'
import { LoanCalculatorWrapper } from '@/components/features/calculator/LoanCalculatorWrapper'
import { personaFisicaConfig } from '@/data/calculatorConfigs'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/ui/Section'
import { KPI } from '@/components/ui/KPI'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  CheckCircle2, 
  Home, 
  UserCheck, 
  FileEdit, 
  Search, 
  PenTool,
  Coins,
  Rocket,
  ShieldCheck,
  Handshake
} from 'lucide-react'

export function PersonaFisicaContent() {
  const c = copyPersonaFisica
  const router = useRouter()
  const benefitIcons = [CheckCircle2, Home, UserCheck]
  const processIcons = [FileEdit, Search, Handshake, Coins]

  return (
    <main className="max-w-5xl mx-auto py-12 space-y-20">
      <Hero 
        title={c.heroHeadline || c.title} 
        subtitle={c.heroSubheadline || c.subtitle} 
        primary={c.ctaPrimary} 
        secondary={c.ctaSecondary}
        image="/images/hero-personafisica.svg"
      />
      
      <Section title="Nos respaldan">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {['Logo 1','Logo 2','Logo 3','Logo 4','Logo 5','Logo 6'].map(l => (
            <div key={l} className="flex items-center justify-center p-4 border rounded-lg bg-white/50">{l}</div>
          ))}
        </div>
      </Section>

      {/* KPIs Section */}
      <section className="py-16 bg-primary/5 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Resultados Comprobados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {c.kpis.map((k) => (
              <div key={k} className="p-4">
                <KPI value={k.split(' ')[0]} label={k.substring(k.indexOf(' ')+1)} />
              </div>
            ))}
          </div>
        </div>
      </section>

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
                    Obtén liquidez utilizando el valor de tu propiedad sin dejar de usarla.
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
                  <Card key={card.title} className="border-none shadow-md">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{card.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {c.useCases && (
        <Section title="Perfiles">
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
                    <CardDescription>Soluciones para profesionistas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg text-muted-foreground">
                      Si eres <strong>{u.toLowerCase()}</strong> y necesitas capital para crecer o estabilizar tus finanzas, 
                      podemos ayudarte a desbloquear el valor de tus activos inmobiliarios.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </Section>
      )}

      {/* FAQs Section */}
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
              Claridad total en cada etapa del camino.
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

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
        <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
          {c.testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-slate-50">
              <CardContent className="p-8">
                <blockquote className="text-xl italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">Cliente de Capitalta</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        <LoanCalculatorWrapper config={personaFisicaConfig} redirectPath="/solicitud" />
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

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground rounded-3xl text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h2 className="text-4xl font-bold">¿Listo para Impulsar tus Metas?</h2>
          <p className="text-xl opacity-90">
            Obtén tu crédito en 24 horas y haz realidad tus proyectos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => router.push(c.ctaPrimary.href)}
              className="text-lg px-8 py-6 w-full sm:w-auto"
            >
              {c.ctaPrimary.label}
            </Button>
            {c.ctaSecondary && (
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push(c.ctaSecondary.href)}
                className="text-lg px-8 py-6 w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10"
              >
                {c.ctaSecondary.label}
              </Button>
            )}
          </div>
          <p className="text-sm opacity-75 mt-4">
            Proceso 100% digital hasta la firma del contrato.
          </p>
        </div>
      </section>
    </main>
  )
}