'use client';

import Image from 'next/image';
import { AlertCircle, TrendingDown, CheckCircle, ArrowRight, X } from 'lucide-react';

const problems = [
  {
    type: 'problem',
    image: '/assets/problems/conflit-famille.png',
    title: 'Facture qui entraîne des bagarres',
    description: 'Les factures créent des tensions et des disputes à la maison.',
    icon: AlertCircle,
    color: 'red',
  },
  {
    type: 'problem',
    image: '/assets/problems/compteur-electrique.jpg',
    title: 'Compteur difficile à comprendre',
    description: 'Vous ne savez pas combien d\'électricité vous consommez vraiment',
    icon: AlertCircle,
    color: 'orange',
  },
  {
    type: 'solution',
    image: '/assets/problems/smartphone-app.jpg',
    title: 'Contrôle total avec Ecopower',
    description: 'Voyez votre consommation en temps réel sur votre téléphone',
    icon: CheckCircle,
    color: 'green',
  },
  {
    type: 'solution',
    image: '/assets/problems/maison-eclairee.jpg',
    title: 'Économisez de l\'argent',
    description: 'Réduisez vos factures en gérant mieux votre consommation',
    icon: TrendingDown,
    color: 'blue',
  },
];

export default function ProblemsSection() {
  return (
    <section id="problems" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Les problèmes</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Que résout
            <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">Ecopower ?</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Des solutions simples pour des problèmes du quotidien
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {problems.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                item.type === 'problem' 
                  ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200' 
                  : 'bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200'
              }`}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay avec gradient selon le type */}
                <div className={`absolute inset-0 ${
                  item.type === 'problem' 
                    ? 'bg-gradient-to-t from-red-900/60 to-transparent' 
                    : 'bg-gradient-to-t from-green-900/60 to-transparent'
                }`}></div>
                
                {/* Badge Problème/Solution */}
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 ${
                  item.type === 'problem'
                    ? 'bg-red-500/90 text-white'
                    : 'bg-green-500/90 text-white'
                }`}>
                  {item.type === 'problem' ? (
                    <>
                      <X size={16} className="flex-shrink-0" />
                      <span className="text-sm font-bold">Problème</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} className="flex-shrink-0" />
                      <span className="text-sm font-bold">Solution</span>
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-black to-gray-900">
                    <item.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="https://play.google.com/store/apps/details?id=tg.konou.ecopower"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFA800] text-white rounded-xl text-lg font-semibold hover:bg-[#E69500] transition-colors shadow-lg hover:shadow-xl"
          >
            <span>Télécharge maintenant</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

