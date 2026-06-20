'use client'

import { motion } from 'framer-motion'
import { LayoutDashboard, Activity, FileText, Users2, BellRing, History } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: LayoutDashboard,
      title: 'Tableau de bord',
      description: 'Vue d’ensemble de vos logements, consommations et revenus en temps réel.',
      color: '#E1F3FE',
      textColor: '#1F6C9F'
    },
    {
      icon: Activity,
      title: 'Suivi consommation',
      description: 'Suivez l’évolution des consommations de chaque locataire.',
      color: '#FBF3DB',
      textColor: '#956400'
    },
    {
      icon: FileText,
      title: 'Facturation automatique',
      description: 'Génération de factures professionnelles en un clic.',
      color: '#EDF3EC',
      textColor: '#346538'
    },
    {
      icon: Users2,
      title: 'Gestion locataires',
      description: 'Ajoutez et gérez vos locataires en toute simplicité.',
      color: '#FDEBEC',
      textColor: '#9F2F2D'
    },
    {
      icon: BellRing,
      title: 'Notifications',
      description: 'Alertes automatiques pour les paiements et consommations anormales.',
      color: '#E1F3FE',
      textColor: '#1F6C9F'
    },
    {
      icon: History,
      title: 'Historique',
      description: 'Accès à tout l’historique de vos factures et relevés.',
      color: '#FBF3DB',
      textColor: '#956400'
    }
  ]

  return (
    <motion.section 
      id="features" 
      className="py-32 md:py-48 bg-[#F7F6F3]"
      initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
            Fonctionnalités
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2F3437] leading-tight mb-8">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-lg text-[#787774] max-w-3xl mx-auto leading-relaxed">
            Une suite complète d’outils pour la gestion professionnelle de vos logements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="group p-8 border border-[#EAEAEA] rounded-xl bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-500"
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: feature.color, color: feature.textColor }}
              >
                <feature.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-[#2F3437] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#787774] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
