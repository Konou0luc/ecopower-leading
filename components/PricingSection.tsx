'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function PricingSection() {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Basic',
      price: period === 'monthly' ? 1000 : 850,
      description: 'Pour les petits portfolios',
      features: [
        '2 logements',
        '5 locataires maximum',
        'Factures automatiques',
        'Suivi des consommations',
        'Historique complet'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: period === 'monthly' ? 2000 : 1700,
      description: 'Pour les propriétaires actifs',
      features: [
        '3 logements',
        '7 locataires maximum',
        'Statistiques avancées',
        'Rappels de paiement',
        'Notifications push',
        'Support prioritaire',
        'Formation incluse'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: period === 'monthly' ? 5000 : 4250,
      description: 'Pour les grands projets',
      features: [
        '4 logements',
        '10 locataires maximum',
        'Support dédié',
        'Formation personnalisée',
        'Demandes de fonctionnalités'
      ],
      popular: false
    }
  ]

  return (
    <motion.section 
      id="pricing" 
      className="py-32 md:py-48 bg-[#F7F6F3]"
      initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
            Tarifs
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2F3437] leading-tight mb-8">
            Des plans adaptés à vos besoins
          </h2>
          <p className="text-lg text-[#787774] max-w-3xl mx-auto leading-relaxed mb-12">
            Payez mensuellement ou économisez 15% avec la facturation annuelle.
          </p>

          {/* Period Toggle */}
          <div className="inline-flex bg-[#EAEAEA] p-1 rounded-full">
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                period === 'monthly' ? 'bg-white text-[#2F3437] shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : 'text-[#787774]'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                period === 'yearly' ? 'bg-white text-[#2F3437] shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : 'text-[#787774]'
              }`}
            >
              Annuel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className={`group p-8 rounded-2xl border transition-all duration-500 flex flex-col ${
                plan.popular
                  ? 'bg-[#111111] border-[#111111] text-white shadow-[0_2px_24px_rgba(17,17,17,0.15)] scale-[1.02]'
                  : 'bg-white border-[#EAEAEA] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
              }`}>
              <div className="mb-8">
                <h3 className={`text-2xl font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-[#2F3437]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#787774]'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-[#2F3437]'}`}>
                    {plan.price.toLocaleString()}
                  </span>
                  <span className={`text-lg ${plan.popular ? 'text-white/60' : 'text-[#787774]'}`}>
                    FCFA/mois
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? 'bg-white/10 text-white' : 'bg-[#E1F3FE] text-[#1F6C9F]'
                    }`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-[#787774]'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-lg font-medium transition-all duration-200 ${
                plan.popular
                  ? 'bg-white text-[#111111] hover:bg-white/90 active:scale-[0.98]'
                  : 'bg-[#111111] text-white hover:bg-[#000000] active:scale-[0.98]'
              }`}>
                Choisir ce plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
