'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const heroImages = [
  {
    src: '/assets/problems/maison-eclairee.jpg',
    alt: 'Maison moderne éclairée'
  },
  {
    src: '/assets/problems/conflit-famille.png',
    alt: 'Gestion de conflits familiaux'
  },
  {
    src: '/assets/problems/hero-personne-telephone.png',
    alt: 'Utilisation mobile'
  }
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#111111]">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={heroImages[currentIndex].src}
              alt={heroImages[currentIndex].alt}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Editorial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#F7F6F3] z-10" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-20 pt-32 pb-40">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-white/70 mb-8">
              Gestion électrique automatisée
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] text-white tracking-tight mb-12">
              Automatisez la gestion électrique de vos locataires
            </h1>
            
            <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              Suivez les consommations, générez les factures automatiquement et éliminez les erreurs de calcul depuis une seule plateforme.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/rejoindre"
                className="px-12 py-5 bg-[#FFA800] text-black rounded-lg font-bold text-lg hover:bg-[#ffb320] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-[#FFA800]/20"
              >
                Démarrer maintenant
              </Link>
              
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-[0.98]"
              >
                <Image
                  src="/assets/logos/google-play-badge.svg"
                  alt="Disponible sur Google Play"
                  width={200}
                  height={60}
                  className="h-14 w-auto"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Minimalist Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              currentIndex === i ? 'w-12 bg-[#FFA800]' : 'w-4 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
