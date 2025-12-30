import { HeroHome } from '@/components/HeroHome'
import { TrustIndicators } from '@/components/TrustIndicators'
import { FeaturesGrid } from '@/components/FeaturesGrid'
import { HowItWorks } from '@/components/HowItWorks'
import { ProductsShowcase } from '@/components/ProductsShowcase'
import { Testimonials } from '@/components/Testimonials'
import { Stats } from '@/components/Stats'
import { CTASection } from '@/components/CTASection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroHome />
      <TrustIndicators />
      <ProductsShowcase />
      <FeaturesGrid />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </main>
  )
}
