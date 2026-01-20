'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const heroSteps = [
  {
    image: '/assets/problems/conflit-famille.png',
    label: 'Factures qui créent des disputes à la maison',
  },
  {
    image: '/assets/problems/compteur-electrique.jpg',
    label: 'Compteur difficile à comprendre',
  },
  {
    image: '/assets/problems/smartphone-app.jpg',
    label: 'Tu vois ta consommation sur ton téléphone',
  },
  {
    image: '/assets/problems/maison-eclairee.jpg',
    label: 'Maison bien éclairée, facture maîtrisée',
  },
];

export default function HeroSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % heroSteps.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Effet d'écriture automatique pour le texte principal
  useEffect(() => {
    // Nettoyer l'intervalle précédent s'il existe
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    const fullText = heroSteps[currentStep].label;
    let index = 0;
    let isFirstChar = true;

    typingIntervalRef.current = setInterval(() => {
      if (isFirstChar) {
        setTypedText('');
        isFirstChar = false;
      }
      
      index += 1;
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      }
    }, 45);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [currentStep]);

  return (
    <section className="relative min-h-[80vh] lg:min-h-[90vh] pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      {/* Images de fond qui se défilent avec les problèmes/solutions */}
      <div className="absolute inset-0 -z-10">
        {heroSteps.map((step, index) => (
          <div
            key={step.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentStep ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={step.image}
              alt={step.label}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
        {/* Voile blanc pour garder le texte lisible tout en laissant bien voir l'image */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl lg:max-w-5xl">
          
          {/* Left: Content */}
          <div className="space-y-8 pt-6 lg:pt-0">
            <p className="text-base sm:text-lg font-medium text-[#FFA800] uppercase tracking-[0.2em]">
              Ecopower
            </p>

            {/* Texte principal avec effet d'écriture */}
            <h1 className="min-h-[3.6rem] sm:min-h-[4.2rem] lg:min-h-[5rem] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {typedText || '\u00A0'}
            </h1>

            <p className="text-lg lg:text-xl text-gray-800 leading-relaxed max-w-xl">
              L&apos;électricité crée souvent des problèmes à la maison.
              <span className="block mt-1">
                Avec Ecopower, tu vois clairement ce que tu consommes et tu évites les disputes.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="https://play.google.com/store/apps/details?id=tg.konou.ecopower"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="/assets/logos/google-play-badge.svg"
                  alt="Disponible sur Google Play"
                  width={200}
                  height={60}
                  className="h-12 w-auto"
                />
              </a>
            </div>

            <div className="pt-4 flex flex-wrap gap-6 text-sm text-gray-500">
              <span>✓ Gratuit</span>
              <span>✓ Sans publicité</span>
              <span>✓ Simple à utiliser</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
