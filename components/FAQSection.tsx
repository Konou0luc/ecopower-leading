'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Combien de logements puis-je gérer ?',
      answer: 'Selon votre plan : Basic (2 logements), Premium (3 logements), Enterprise (4 logements). Pour plus, contactez-nous pour une offre personnalisée.'
    },
    {
      question: 'Les locataires ont-ils accès à l’application ?',
      answer: 'Oui, chaque locataire peut se connecter pour voir sa consommation, ses factures et son historique.'
    },
    {
      question: 'Puis-je exporter mes factures ?',
      answer: 'Oui, toutes les factures sont générées en format PDF et peuvent être téléchargées ou partagées directement depuis l’application.'
    },
    {
      question: 'Y a-t-il un engagement ?',
      answer: 'Non, vous pouvez arrêter à tout moment. Si vous choisissez la facturation annuelle, vous économisez 15%.'
    },
    {
      question: 'Quels sont les moyens de paiement ?',
      answer: 'Nous acceptons les cartes bancaires et les virements. D’autres moyens peuvent être ajoutés sur demande.'
    }
  ]

  return (
    <motion.section 
      id="faq" 
      className="py-32 md:py-48 bg-white"
      initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-normal text-[#2F3437] leading-tight mb-8">
              Questions fréquentes
            </h2>
            <p className="text-lg text-[#787774] leading-relaxed">
              Tout ce que vous avez toujours voulu savoir sur Ecopower. Si vous ne trouvez pas la réponse ici, n’hésitez pas à nous contacter.
            </p>
          </div>

          <div className="space-y-0 border-t border-[#EAEAEA]">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#EAEAEA]">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex items-center justify-between w-full py-8 text-left"
                >
                  <span className="text-lg font-medium text-[#2F3437] pr-8">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <span className={`block text-2xl transition-all duration-300 ${
                      openIndex === index ? 'text-[#2F3437]' : 'text-[#787774]'
                    }`}>
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="pb-8 text-[#787774] leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
