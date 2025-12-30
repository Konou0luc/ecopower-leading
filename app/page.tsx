import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import ScreenshotsSection from '@/components/ScreenshotsSection';
import PartnersSection from '@/components/PartnersSection';
import DownloadSection from '@/components/DownloadSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <AboutSection />
      <PartnersSection />
      <DownloadSection />
      <Footer />
      </main>
  );
}
