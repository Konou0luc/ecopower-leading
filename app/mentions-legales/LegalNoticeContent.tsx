'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Building2, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LegalNoticeContent() {
  const sections = [
    {
      icon: Building2,
      title: '1. Informations sur l\'éditeur',
      content: [
        'Application mobile : Ecopower',
        'Type : Application de gestion de consommation électrique',
        'Domaine d\'activité : Solutions numériques pour la gestion énergétique',
        'Zone géographique : Togo, Afrique de l\'Ouest'
      ]
    },
    {
      icon: Mail,
      title: '2. Contact',
      content: [
        'Email : ecopowerafrique@gmail.com',
        'Téléphone : +228 97240460',
        'Adresse : Lomé, Togo'
      ]
    },
    {
      icon: FileText,
      title: '3. Directeur de publication',
      content: [
        'Le directeur de publication est responsable du contenu de l\'application Ecopower.',
        'Pour toute question concernant le contenu, veuillez nous contacter à l\'adresse email indiquée ci-dessus.'
      ]
    },
    {
      icon: Building2,
      title: '4. Hébergement',
      content: [
        'L\'application Ecopower est hébergée sur les plateformes suivantes :',
        '• Google Play Store pour la distribution mobile',
        '• Services cloud pour l\'infrastructure backend',
        'Les données sont stockées et traitées conformément aux standards de sécurité internationaux.'
      ]
    },
    {
      icon: FileText,
      title: '5. Propriété intellectuelle',
      content: [
        'L\'ensemble du contenu de l\'application Ecopower (textes, images, logos, code source) est protégé par le droit d\'auteur.',
        'Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.',
        'Les marques et logos présents dans l\'application sont la propriété de leurs détenteurs respectifs.'
      ]
    },
    {
      icon: FileText,
      title: '6. Protection des données personnelles',
      content: [
        'Conformément à la réglementation en vigueur, Ecopower s\'engage à protéger vos données personnelles.',
        'Pour plus d\'informations sur le traitement de vos données, consultez notre ',
        'Politique de Confidentialité disponible sur cette application.'
      ]
    },
    {
      icon: FileText,
      title: '7. Cookies et technologies de suivi',
      content: [
        'L\'application Ecopower peut utiliser des cookies et technologies similaires pour améliorer l\'expérience utilisateur.',
        'Ces technologies sont utilisées dans le respect de votre vie privée et conformément à notre politique de confidentialité.'
      ]
    },
    {
      icon: FileText,
      title: '8. Limitation de responsabilité',
      content: [
        'Ecopower s\'efforce de fournir des informations exactes et à jour.',
        'Cependant, nous ne pouvons garantir l\'exactitude, la complétude ou l\'actualité des informations.',
        'L\'utilisation de l\'application se fait sous votre propre responsabilité.',
        'Ecopower ne pourra être tenu responsable des dommages directs ou indirects résultant de l\'utilisation de l\'application.'
      ]
    },
    {
      icon: FileText,
      title: '9. Liens externes',
      content: [
        'L\'application peut contenir des liens vers des sites web externes.',
        'Ecopower n\'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.',
        'L\'inclusion d\'un lien ne constitue pas une approbation du site lié.'
      ]
    },
    {
      icon: FileText,
      title: '10. Droit applicable et juridiction',
      content: [
        'Les présentes mentions légales sont régies par le droit togolais.',
        'En cas de litige, les tribunaux de Lomé, Togo, seront seuls compétents.'
      ]
    }
  ];

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
          {/* Header */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
              Légal
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2F3437] leading-tight mb-8">
              Mentions
              <span className="font-bold text-[#111111]">&nbsp;Légales</span>
            </h1>
            <p className="text-lg text-[#787774] max-w-2xl mx-auto">
              Informations légales concernant l'application Ecopower
            </p>
          </div>

          {/* Introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-white rounded-xl p-8 mb-12 border border-[#EAEAEA]"
          >
            <p className="text-[#787774] leading-relaxed">
              Conformément aux dispositions légales en vigueur, les présentes mentions légales ont pour objet 
              d'informer les utilisateurs de l'application Ecopower sur l'identité et les modalités de fonctionnement 
              de l'éditeur du service.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.08 }}
                className="bg-white rounded-xl p-8 border border-[#EAEAEA] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#E1F3FE', color: '#1F6C9F' }}
                  >
                    <section.icon size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#2F3437] pt-2">{section.title}</h2>
                </div>
                <div className="ml-16 space-y-2">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-[#787774] leading-relaxed">
                      {paragraph}
                      {pIndex === 1 && section.title === '6. Protection des données personnelles' && (
                        <a href="/privacy-policy" className="text-[#2F3437] font-medium hover:underline">
                          {' '}Politique de Confidentialité
                        </a>
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-12 bg-white rounded-xl p-8 border border-[#EAEAEA]"
          >
            <h3 className="text-xl font-semibold text-[#2F3437] mb-4 flex items-center gap-2">
              <MapPin size={20} style={{ color: '#346538' }} />
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} style={{ color: '#346538' }} />
                <a href="mailto:ecopowerafrique@gmail.com" className="text-[#787774] hover:text-[#2F3437] transition-colors">
                  ecopowerafrique@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} style={{ color: '#346538' }} />
                <a href="tel:+22897240460" className="text-[#787774] hover:text-[#2F3437] transition-colors">
                  +228 97240460
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} style={{ color: '#346538' }} />
                <span className="text-[#787774]">Lomé, Togo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
