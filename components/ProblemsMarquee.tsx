'use client'

import { motion } from 'framer-motion'

const problems = [
  {
    title: 'Calculs manuels',
    description: 'Compter les heures, faire les calculs. Du temps perdu qui pourrait être mieux utilisé.'
  },
  {
    title: 'Erreurs de facturation',
    description: 'Des erreurs qui créent des tensions et des conflits avec vos locataires.'
  },
  {
    title: 'Manque de transparence',
    description: 'Les locataires ne voient pas clairement leur consommation. Ça crée la méfiance.'
  },
  {
    title: 'Processus lent',
    description: 'Tout se fait à la main, ce qui ralentit considérablement votre gestion locative.'
  }
]

export default function ProblemsMarquee() {
  return (
    <motion.section 
      className="py-32 md:py-48 bg-[#F7F6F3] overflow-hidden"
      initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-16 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
            Les défis
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2F3437] leading-tight mb-8">
            Dites adieu aux tracas
          </h2>
        </div>
      </div>

      {/* Marquee 1 - Gauche à droite */}
      <div className="relative w-full overflow-hidden mb-8">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...problems, ...problems].map((problem, index) => (
            <div key={index} className="mx-4 flex-shrink-0">
              <div className="w-96 md:w-[420px] bg-white border border-[#EAEAEA] rounded-xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] whitespace-normal">
                <div className="w-10 h-10 rounded-lg bg-[#111111]/5 flex items-center justify-center mb-6">
                  <span className="text-sm font-bold text-[#2F3437]">{(index % problems.length) + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2F3437] mb-3">
                  {problem.title}
                </h3>
                <p className="text-[#787774] leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee 2 - Droite à gauche */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...problems].reverse().map((problem, index) => (
            <div key={index} className="mx-4 flex-shrink-0">
              <div className="w-96 md:w-[420px] bg-white border border-[#EAEAEA] rounded-xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] whitespace-normal">
                <div className="w-10 h-10 rounded-lg bg-[#111111]/5 flex items-center justify-center mb-6">
                  <span className="text-sm font-bold text-[#2F3437]">{(index % problems.length) + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2F3437] mb-3">
                  {problem.title}
                </h3>
                <p className="text-[#787774] leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
      `}</style>
    </motion.section>
  )
}
