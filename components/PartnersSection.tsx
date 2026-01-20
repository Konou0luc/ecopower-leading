'use client';

import Image from 'next/image';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const partners = [
  { 
    name: 'Kiiako',
    logo: '/assets/partenaires/kiako.jpg',
    url: 'https://kiiako.io/',
  },
  { 
    name: 'Tech n Ctrl',
    logo: '/assets/partenaires/logo.png',
    url: 'https://technctrl.com/',
  },
  { 
    name: 'Najahscore',
    logo: '/assets/partenaires/najahscore.png',
    url: 'https://najahscore.com/',
  },
];

export default function PartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fait défiler les partenaires toutes les quelques secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }, 4000); // 4 secondes entre chaque changement

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
  };

  // Créer un tableau étendu pour l'effet de boucle infini
  const extendedPartners = [...partners, ...partners];
  
  // Calculer l'index de départ pour l'animation (on commence au milieu pour avoir assez de contenu)
  const startIndex = currentIndex;

  return (
    <section id="partners" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header façon témoignages */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-900 rounded-lg flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Partenaires
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Nos partenaires
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Des équipes locales qui nous accompagnent dans le déploiement d&apos;Ecopower.
          </p>
        </div>

        {/* Cartes partenaires avec animation de glissement */}
        <div className="relative overflow-hidden max-w-6xl mx-auto">
          <div className="hidden md:block relative">
            {/* Flèche gauche */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-[#FFA800] transition-all duration-300 group"
              aria-label="Partenaire précédent"
            >
              <ChevronLeft size={24} className="text-gray-600 group-hover:text-[#FFA800]" />
            </button>

            {/* Flèche droite */}
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-[#FFA800] transition-all duration-300 group"
              aria-label="Partenaire suivant"
            >
              <ChevronRight size={24} className="text-gray-600 group-hover:text-[#FFA800]" />
            </button>

            <div 
              className="flex transition-transform duration-700 ease-in-out px-12"
              style={{
                transform: `translateX(-${startIndex * 33.333}%)`
              }}
            >
              {extendedPartners.map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`}
                  className="w-1/3 flex-shrink-0 pr-8"
                >
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#FFA800]/50 transition-all duration-300 p-8"
                  >
                    <div className="flex flex-col items-center justify-center min-h-[120px]">
                      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-50 flex-shrink-0">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain p-2"
                          sizes="96px"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 text-center">{partner.name}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Version mobile - simple grid sans animation */}
          <div className="md:hidden grid grid-cols-1 gap-8">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#FFA800]/50 transition-all duration-300 p-8"
              >
                <div className="flex flex-col items-center justify-center min-h-[120px]">
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center">{partner.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
