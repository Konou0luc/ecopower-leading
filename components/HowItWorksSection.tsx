'use client'

import { motion } from 'framer-motion'

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Configurez vos tarifs électriques',
      description: 'Définissez le prix du kWh et les paramètres de facturation selon vos besoins.',
      color: '#E1F3FE',
      textColor: '#1F6C9F'
    },
    {
      number: '02',
      title: 'Saisissez les relevés',
      description: 'Enregistrez les index des compteurs de vos locataires en quelques secondes.',
      color: '#FBF3DB',
      textColor: '#956400'
    },
    {
      number: '03',
      title: 'Calcul automatique',
      description: 'Ecopower calcule automatiquement les consommations et les montants à payer.',
      color: '#EDF3EC',
      textColor: '#346538'
    },
    {
      number: '04',
      title: 'Générez les factures',
      description: 'Créez et partagez des factures professionnelles en un clic.',
      color: '#FDEBEC',
      textColor: '#9F2F2D'
    }
  ]

  return (
    <motion.section 
      id="how-it-works" 
      className="py-32 md:py-48 bg-white"
      initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
            Processus
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2F3437] leading-tight mb-8">
            Quatre étapes simples
            <span className="font-bold text-[#111111]">&nbsp;pour commencer</span>
          </h2>
          <p className="text-lg text-[#787774] max-w-3xl mx-auto leading-relaxed">
            Ecopower a été conçu pour être intuitif, même sans expérience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="group p-8 border border-[#EAEAEA] rounded-xl bg-[#F9F9F8] hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-500"
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: step.color, color: step.textColor }}
              >
                <span className="text-lg font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#2F3437] mb-3">
                {step.title}
              </h3>
              <p className="text-[#787774] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
