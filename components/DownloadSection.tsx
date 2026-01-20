import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function DownloadSection() {
  return (
    <section id="download" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration - identique à la section À propos */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/5 via-transparent to-[#FFD700]/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Téléchargement</span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Téléchargez
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">l&apos;application</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 font-light">
              Disponible sur Android. Version iOS bientôt disponible.
            </p>
          </div>

          {/* Download Buttons avec vrais logos */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/apps/details?id=tg.konou.ecopower"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/assets/logos/google-play-badge.svg"
                alt="Disponible sur Google Play"
                width={200}
                height={60}
                className="h-14 w-auto"
              />
            </a>

            {/* App Store Button - Disabled */}
            <div className="relative inline-block opacity-60 cursor-not-allowed" title="Version bientôt disponible sur l'App Store">
              <Image
                src="/assets/logos/app-store-badge.svg"
                alt="Télécharger dans l'App Store"
                width={200}
                height={60}
                className="h-14 w-auto grayscale"
              />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
                <Sparkles size={12} />
                Bientôt disponible
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
