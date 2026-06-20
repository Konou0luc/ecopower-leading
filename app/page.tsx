import HeroSection from '@/components/HeroSection'
import ProblemsMarquee from '@/components/ProblemsMarquee'
import HowItWorksSection from '@/components/HowItWorksSection'
import PartnersSection from '@/components/PartnersSection'
import FeaturesSection from '@/components/FeaturesSection'
import ScreenshotsSection from '@/components/ScreenshotsSection'
import PricingSection from '@/components/PricingSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ProblemsMarquee />
      <HowItWorksSection />
      <PartnersSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
