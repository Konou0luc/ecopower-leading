'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, CheckCircle, AlertTriangle, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfServiceContent() {
  const sections = [
    {
      icon: FileText,
      title: '1. Acceptation des conditions',
      content: [
        'En accédant et en utilisant l\'application Ecopower, vous acceptez d\'être lié par les présentes conditions d\'utilisation.',
        'Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre application.',
        'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication.',
        'Il est de votre responsabilité de consulter régulièrement ces conditions pour prendre connaissance des éventuelles modifications.'
      ]
    },
    {
      icon: CheckCircle,
      title: '2. Description du service',
      content: [
        'Ecopower est une application mobile de gestion de consommation électrique qui permet :',
        '• De suivre et enregistrer vos relevés de compteur électrique',
        '• De générer automatiquement vos factures au format PDF',
        '• De consulter l\'historique de votre consommation',
        '• De gérer plusieurs résidents et compteurs',
        '• De partager vos factures facilement',
        'Le service est fourni "tel quel" et nous nous efforçons de maintenir un niveau de qualité élevé.'
      ]
    },
    {
      icon: AlertTriangle,
      title: '3. Compte utilisateur',
      content: [
        'Pour utiliser Ecopower, vous devez créer un compte en fournissant des informations exactes et à jour.',
        'Vous êtes responsable de :',
        '• La confidentialité de vos identifiants de connexion',
        '• Toutes les activités effectuées sous votre compte',
        '• La sécurité de votre appareil et de votre compte',
        'Vous vous engagez à nous informer immédiatement de toute utilisation non autorisée de votre compte.',
        'Nous nous réservons le droit de suspendre ou de fermer votre compte en cas de violation de ces conditions.'
      ]
    },
    {
      icon: Scale,
      title: '4. Utilisation acceptable',
      content: [
        'Vous vous engagez à utiliser Ecopower de manière légale et conforme à ces conditions.',
        'Il est strictement interdit de :',
        '• Utiliser l\'application à des fins illégales ou frauduleuses',
        '• Tenter d\'accéder à des comptes ou systèmes non autorisés',
        '• Transmettre des virus, codes malveillants ou tout élément nuisible',
        '• Copier, modifier ou distribuer le contenu de l\'application sans autorisation',
        '• Utiliser des robots, scripts automatisés ou autres moyens pour accéder au service',
        '• Porter atteinte aux droits de propriété intellectuelle d\'Ecopower ou de tiers'
      ]
    },
    {
      icon: FileText,
      title: '5. Propriété intellectuelle',
      content: [
        'Tous les contenus de l\'application Ecopower (logos, textes, graphismes, code source) sont la propriété exclusive d\'Ecopower ou de ses partenaires.',
        'Vous obtenez une licence limitée, non exclusive et non transférable pour utiliser l\'application à des fins personnelles uniquement.',
        'Toute reproduction, distribution ou utilisation commerciale sans autorisation écrite est strictement interdite.',
        'Les données que vous saisissez dans l\'application restent votre propriété, mais vous nous accordez une licence pour les utiliser dans le cadre de la fourniture du service.'
      ]
    },
    {
      icon: AlertTriangle,
      title: '6. Limitation de responsabilité',
      content: [
        'Ecopower est fourni "tel quel" sans garantie expresse ou implicite.',
        'Nous ne garantissons pas que :',
        '• Le service sera ininterrompu, sécurisé ou exempt d\'erreurs',
        '• Les résultats obtenus seront exacts ou fiables',
        '• Les défauts seront corrigés',
        'Dans la mesure permise par la loi, Ecopower ne pourra être tenu responsable de :',
        '• Toute perte de données ou dommage indirect',
        '• Toute interruption de service',
        '• Toute décision prise sur la base des informations fournies par l\'application',
        'Notre responsabilité totale ne pourra excéder le montant que vous avez payé pour l\'utilisation du service.'
      ]
    },
    {
      icon: CheckCircle,
      title: '7. Exactitude des données',
      content: [
        'Vous êtes seul responsable de l\'exactitude des données que vous saisissez dans l\'application.',
        'Ecopower ne garantit pas l\'exactitude des relevés de compteur ou des factures générées.',
        'Il est de votre responsabilité de vérifier l\'exactitude des informations avant de les utiliser à des fins officielles.',
        'Nous recommandons de toujours vérifier vos factures avec votre fournisseur d\'électricité officiel.'
      ]
    },
    {
      icon: Scale,
      title: '8. Résiliation',
      content: [
        'Vous pouvez résilier votre compte à tout moment en nous contactant ou en supprimant l\'application.',
        'Nous nous réservons le droit de suspendre ou résilier votre accès au service :',
        '• En cas de violation de ces conditions d\'utilisation',
        '• En cas d\'activité frauduleuse ou suspecte',
        '• Pour des raisons légales ou réglementaires',
        'En cas de résiliation, vos données seront conservées conformément à notre politique de confidentialité.'
      ]
    },
    {
      icon: FileText,
      title: '9. Droit applicable',
      content: [
        'Ces conditions d\'utilisation sont régies par les lois de la République du Togo.',
        'Tout litige relatif à ces conditions sera soumis à la compétence exclusive des tribunaux de Lomé, Togo.',
        'Si une disposition de ces conditions est jugée invalide, les autres dispositions resteront en vigueur.'
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
              Conditions
              <span className="font-bold text-[#111111]">&nbsp;d'Utilisation</span>
            </h1>
            <p className="text-lg text-[#787774] max-w-2xl mx-auto">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
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
              Les présentes conditions générales d'utilisation régissent l'utilisation de l'application Ecopower. 
              En utilisant notre application, vous acceptez ces conditions dans leur intégralité. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
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
                    style={{ backgroundColor: '#EDF3EC', color: '#346538' }}
                  >
                    <section.icon size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#2F3437] pt-2">{section.title}</h2>
                </div>
                <div className="ml-16 space-y-2">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-[#787774] leading-relaxed">
                      {paragraph}
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
            <h3 className="text-xl font-semibold text-[#2F3437] mb-4">Questions ?</h3>
            <p className="text-[#787774] mb-4">
              Si vous avez des questions concernant ces conditions d'utilisation, contactez-nous :
            </p>
            <div className="space-y-2">
              <p className="text-[#787774]">
                <strong>Email :</strong>{' '}
                <a href="mailto:ecopowerafrique@gmail.com" className="text-[#2F3437] font-medium hover:underline">
                  ecopowerafrique@gmail.com
                </a>
              </p>
              <p className="text-[#787774]">
                <strong>Téléphone :</strong>{' '}
                <a href="tel:+22897240460" className="text-[#2F3437] font-medium hover:underline">
                  +228 97240460
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
