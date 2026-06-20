'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const partners = [
  {
    src: '/assets/partenaires/najahscore.png',
    name: 'Najah Score'
  },
  {
    src: '/assets/partenaires/logo.png',
    name: 'Partenaire 2'
  },
  {
    src: '/assets/partenaires/kiako.jpg',
    name: 'Kiako'
  },
  {
    src: '/assets/partenaires/togo_code_run.jpg',
    name: 'Togo Code Run'
  }
]

export default function PartnersSection() {
  return (
    <motion.section 
      className="py-20 md:py-32 bg-[#F7F6F3] overflow-hidden"
      initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-16 mb-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
            Partenaires
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#2F3437] leading-tight">
            Ils nous font confiance
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="mx-16 flex-shrink-0 flex items-center justify-center">
              <div className="w-40 md:w-56 h-24 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={200}
                  height={100}
                  className="h-auto w-auto max-h-full max-w-full object-contain"
                />
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
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </motion.section>
  )
}
