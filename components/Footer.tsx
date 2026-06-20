'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer 
        className="bg-[#111111] py-24"
        initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Ecopower"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">
                Ecopower
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed mb-8">
              Simplifiez la gestion électrique de vos logements locatifs.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-[0.15em]">
              Produit
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="#features" className="text-white/60 hover:text-white transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-white/60 hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-white/60 hover:text-white transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-white/60 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-[0.15em]">
              Entreprise
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-white/60 hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-white/60 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-[0.15em]">
              Se connecter
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/rejoindre" className="text-white/60 hover:text-white transition-colors">
                  Commencer maintenant
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm">
            © {currentYear} Ecopower. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 text-sm">
              Fait avec ♥
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
