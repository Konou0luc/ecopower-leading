'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Mail, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuppressionDonneesContent() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <motion.section 
        className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#F7F6F3]"
        initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
              Légal
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2F3437] leading-tight mb-8">
              Suppression des
              <span className="font-bold text-[#111111]">&nbsp;données utilisateur</span>
            </h1>
            <p className="text-lg text-[#787774] max-w-2xl mx-auto">
              Dernière mise à jour :{' '}
              {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-white rounded-xl p-8 mb-12 border border-[#EAEAEA]"
          >
            <p className="text-[#787774] leading-relaxed">
              Cette page décrit comment exercer votre droit à la suppression des données traitées dans le cadre du
              service Ecopower (application mobile, site et intégrations associées). Pour le détail des traitements,
              consultez notre{' '}
              <a href="/privacy-policy" className="text-[#2F3437] font-medium hover:underline">
                politique de confidentialité
              </a>
              .
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="bg-white rounded-xl p-8 border border-[#EAEAEA] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E1F3FE', color: '#1F6C9F' }}
                >
                  <Mail size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-[#2F3437] pt-2">1. Demande par e-mail</h2>
              </div>
              <div className="ml-0 sm:ml-16 space-y-3 text-[#787774] leading-relaxed">
                <p>
                  Envoyez un e-mail à{' '}
                  <a href="mailto:ecopowerafrique@gmail.com" className="text-[#2F3437] font-medium hover:underline">
                    ecopowerafrique@gmail.com
                  </a>{' '}
                  avec pour objet : <strong>« Demande de suppression de compte / données »</strong>.
                </p>
                <p>
                  Indiquez l'adresse e-mail associée à votre compte Ecopower (et, si possible, le numéro de
                  téléphone utilisé pour WhatsApp ou l'invitation). Cela nous permet de vérifier votre identité
                  avant toute action.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="bg-white rounded-xl p-8 border border-[#EAEAEA] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FBF3DB', color: '#956400' }}
                >
                  <Trash2 size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-[#2F3437] pt-2">2. Données concernées</h2>
              </div>
              <div className="ml-0 sm:ml-16 space-y-2 text-[#787774] leading-relaxed">
                <p>Selon votre demande, nous pouvons :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>supprimer ou anonymiser votre compte utilisateur et les données de profil ;</li>
                  <li>traiter les demandes liées aux données de consommation / facturation associées à votre compte ;</li>
                  <li>
                    pour les échanges via <strong>WhatsApp Business</strong> : précisez le numéro concerné ; la
                    conservation peut dépendre des obligations légales et des journaux techniques nécessaires à la
                    sécurité du service.
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="bg-white rounded-xl p-8 border border-[#EAEAEA] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#EDF3EC', color: '#346538' }}
                >
                  <Clock size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-[#2F3437] pt-2">3. Délai de traitement</h2>
              </div>
              <p className="text-[#787774] leading-relaxed ml-0 sm:ml-16">
                Nous accusons réception dans les <strong>30 jours</strong> et traitons la demande dans un délai
                raisonnable, sous réserve des obligations légales (conservation comptable, litiges en cours, etc.).
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="bg-white rounded-xl p-8 border border-[#EAEAEA] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#FDEBEC', color: '#9F2F2D' }}
                >
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-[#2F3437] pt-2">4. Après suppression</h2>
              </div>
              <p className="text-[#787774] leading-relaxed ml-0 sm:ml-16">
                La suppression du compte est <strong>irréversible</strong> pour les données que nous sommes en mesure
                d'effacer. Certaines traces techniques anonymisées peuvent être conservées à des fins de sécurité
                ou de mesure d'audience, sans lien direct avec votre identité.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-12 bg-white rounded-xl p-8 border border-[#EAEAEA]"
          >
            <h3 className="text-xl font-semibold text-[#2F3437] mb-4">Contact</h3>
            <p className="text-[#787774]">
              <strong>Email :</strong>{' '}
              <a href="mailto:ecopowerafrique@gmail.com" className="text-[#2F3437] font-medium hover:underline">
                ecopowerafrique@gmail.com
              </a>
            </p>
            <p className="text-[#787774] mt-2">
              <strong>Téléphone :</strong>{' '}
              <a href="tel:+22897240460" className="text-[#2F3437] font-medium hover:underline">
                +228 97240460
              </a>
            </p>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
