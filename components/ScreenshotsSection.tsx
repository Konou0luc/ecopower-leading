'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const screenshots = [
  {
    src: '/assets/screens/acceder-tableau-bord.png',
    title: 'Tableau de bord',
    description: 'Vue d’ensemble de vos logements'
  },
  {
    src: '/assets/screens/acceder-historique-conso.png',
    title: 'Historique consommation',
    description: 'Suivi des consommations par locataire'
  },
  {
    src: '/assets/screens/generer-pdf.png',
    title: 'Facturation',
    description: 'Factures PDF professionnelles'
  },
  {
    src: '/assets/screens/ajouter-residents.png',
    title: 'Gestion locataires',
    description: 'Gestion simplifiée des résidents'
  }
]

export default function ScreenshotsSection() {
  const [selectedImage, setSelectedImage] = useState<null | typeof screenshots[0]>(null)

  return (
    <>
      <motion.section 
        className="py-32 md:py-48 bg-[#111111]"
        initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-5xl mx-auto text-center mb-24">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9D9D9D] mb-6">
              Application
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight mb-8">
              Votre outil au bout des doigts
            </h2>
            <p className="text-lg text-[#9D9D9D] max-w-3xl mx-auto leading-relaxed">
              Une interface claire et intuitive, accessible depuis votre mobile ou votre ordinateur.
            </p>
          </div>

          {/* Grid of screenshots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {screenshots.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative rounded-xl overflow-hidden border border-white/10 mb-4 aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <X size={20} className="text-white rotate-45" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#9D9D9D]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-0 text-white hover:text-[#9D9D9D] transition-colors duration-300"
              >
                <X size={32} />
              </button>
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain bg-black/30"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-[#9D9D9D]">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
