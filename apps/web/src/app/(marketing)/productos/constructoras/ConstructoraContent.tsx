"use client"

import { useRouter } from 'next/navigation'
import { copyConstructoras } from '@/content/copy'
import { LoanCalculatorWrapper } from '@/components/features/calculator/LoanCalculatorWrapper'
import { constructoraConfig } from '@/data/calculatorConfigs'
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
  HardHat, 
  Building2, 
  Ruler, 
  FileText, 
  SearchCheck, 
  Coins,
  Rocket,
  ShieldCheck,
  Handshake
} from 'lucide-react'

export function ConstructoraContent() {
  const c = copyConstructoras
  const router = useRouter()
  
  const benefitIcons = [HardHat, Building2, Ruler]
  const processIcons = [FileText, SearchCheck, Handshake, Coins]

  return (
    <main className="max-w-5xl mx-auto py-12 space-y-20">
      <Hero 
        title={c.heroHeadline || c.title} 
        subtitle={c.heroSubheadline || c.subtitle} 
        primary={c.ctaPrimary} 
        secondary={c.ctaSecondary}
        image="/images/hero-construction.svg"
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
          <h2 className="text-3xl font-bold text-center mb-12">Resultados que Hablan por Sí Mismos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.kpis.map((kpi) => (
              <div key={kpi} className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{kpi.split(' ')[0]}</div>
                <div className="text-lg text-muted-foreground">{kpi.split(' ').slice(1).join(' ')}</div>
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
                    Optimizamos cada paso para que te enfoques en construir, no en trámites.
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Para Qué Usarlo?</h2>
        <Tabs defaultValue={c.useCases[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 h-auto">
            {c.useCases.map((useCase) => (
              <TabsTrigger key={useCase} value={useCase} className="h-12">
                {useCase}
              </TabsTrigger>
            ))}
          </TabsList>
          {c.useCases.map((useCase) => (
            <TabsContent key={useCase} value={useCase} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>{useCase}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Financiamiento flexible diseñado específicamente para cubrir las necesidades de {useCase.toLowerCase()} en tu proyecto.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
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

      {/* FAQs Section */}
      <section className="py-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {c.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground rounded-3xl text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h2 className="text-4xl font-bold">¿Listo para Impulsar tu Proyecto?</h2>
          <p className="text-xl opacity-90">
            Obtén tu crédito en 24 horas y empieza a construir el futuro.
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
