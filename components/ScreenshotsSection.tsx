'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Smartphone, BarChart3, FileText, Users, X } from 'lucide-react';

// 4 screenshots sélectionnés pour un design professionnel
const screenshots = [
  {
    src: '/assets/screens/acceder-tableau-bord.png',
    title: 'Tableau de bord',
    description: 'Vue d\'ensemble de votre consommation énergétique',
    icon: BarChart3,
    color: 'from-black to-gray-900',
  },
  {
    src: '/assets/screens/acceder-historique-conso.png',
    title: 'Historique',
    description: 'Suivez l\'évolution de vos consommations',
    icon: Smartphone,
    color: 'from-black to-gray-900',
  },
  {
    src: '/assets/screens/generer-pdf.png',
    title: 'Facturation',
    description: 'Génération automatique de factures PDF',
    icon: FileText,
    color: 'from-black to-gray-900',
  },
  {
    src: '/assets/screens/ajouter-residents.png',
    title: 'Gestion résidents',
    description: 'Administration simplifiée des utilisateurs',
    icon: Users,
    color: 'from-black to-gray-900',
  },
];

export default function ScreenshotsSection() {
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null);
  
  // Gestion du scroll de la page quand le modal est ouvert
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.body.style.overflow = selectedScreenshot !== null ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedScreenshot]);

  const openModal = (index: number) => {
    setSelectedScreenshot(index);
  };

  const closeModal = () => {
    setSelectedScreenshot(null);
  };

  return (
    <>
      <section id="screenshots" className="py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,168,0,0.02),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Application</span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Interface
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">moderne et intuitive</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Découvrez les fonctionnalités clés d&apos;Ecopower à travers une sélection d&apos;écrans
            </p>
          </div>

          {/* Screenshots Grid - 4 screenshots professionnels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Card avec effet glassmorphism */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 hover:border-[#FFA800]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFA800]/10">
                  {/* Icon avec gradient */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${screenshot.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <screenshot.icon size={24} className="text-white" />
                  </div>
                  
                  {/* Screenshot - Cliquable */}
                  <button
                    onClick={() => openModal(index)}
                    className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4 border border-gray-200/50 cursor-pointer hover:border-[#FFA800]/50 transition-all duration-300"
                  >
                    <Image
                      src={screenshot.src}
                      alt={screenshot.title}
                      fill
                      className="object-cover transition-all duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-xs leading-relaxed">{screenshot.description}</p>
                      </div>
                    </div>
                  </button>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 text-center">
                    {screenshot.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal pour afficher le screenshot en grand */}
      {selectedScreenshot !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm border border-white/20"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
          
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[9/16] max-h-[90vh] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl">
              <Image
                src={screenshots[selectedScreenshot].src}
                alt={screenshots[selectedScreenshot].title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Info du screenshot */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {screenshots[selectedScreenshot].title}
              </h3>
              <p className="text-gray-300">
                {screenshots[selectedScreenshot].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
