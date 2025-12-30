import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Ecopower',
  description: 'Politique de confidentialité d\'Ecopower - Protection de vos données personnelles',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FileText,
      title: '1. Collecte des données',
      content: [
        'Ecopower collecte les données suivantes lorsque vous utilisez notre application :',
        '• Informations d\'identification : nom, prénom, adresse email, numéro de téléphone',
        '• Données de consommation : relevés de compteur, historique de consommation électrique',
        '• Données de facturation : informations nécessaires à la génération de factures',
        '• Données techniques : adresse IP, type d\'appareil, système d\'exploitation, identifiants uniques',
        'Ces données sont collectées de manière volontaire lorsque vous créez un compte et utilisez les fonctionnalités de l\'application.'
      ]
    },
    {
      icon: Lock,
      title: '2. Utilisation des données',
      content: [
        'Nous utilisons vos données personnelles pour :',
        '• Fournir et améliorer nos services de gestion de consommation électrique',
        '• Générer vos factures et documents administratifs',
        '• Vous contacter concernant votre compte ou nos services',
        '• Analyser l\'utilisation de l\'application pour améliorer l\'expérience utilisateur',
        '• Respecter nos obligations légales et réglementaires',
        '• Prévenir la fraude et assurer la sécurité de nos services'
      ]
    },
    {
      icon: Shield,
      title: '3. Protection des données',
      content: [
        'Ecopower s\'engage à protéger vos données personnelles :',
        '• Chiffrement des données sensibles en transit et au repos',
        '• Accès restreint aux données personnelles uniquement aux personnes autorisées',
        '• Sauvegardes régulières pour prévenir la perte de données',
        '• Mise à jour régulière de nos systèmes de sécurité',
        '• Conformité aux standards de sécurité internationaux'
      ]
    },
    {
      icon: Eye,
      title: '4. Partage des données',
      content: [
        'Nous ne vendons jamais vos données personnelles à des tiers.',
        'Nous pouvons partager vos données uniquement dans les cas suivants :',
        '• Avec votre consentement explicite',
        '• Avec nos prestataires de services (hébergement, paiement) sous contrat de confidentialité',
        '• Lorsque requis par la loi ou une autorité judiciaire',
        '• En cas de fusion, acquisition ou cession d\'actifs (avec notification préalable)'
      ]
    },
    {
      icon: FileText,
      title: '5. Vos droits',
      content: [
        'Conformément à la réglementation en vigueur, vous disposez des droits suivants :',
        '• Droit d\'accès : consulter vos données personnelles',
        '• Droit de rectification : corriger vos données inexactes',
        '• Droit à l\'effacement : demander la suppression de vos données',
        '• Droit à la portabilité : récupérer vos données dans un format structuré',
        '• Droit d\'opposition : vous opposer au traitement de vos données',
        '• Droit à la limitation : limiter le traitement de vos données',
        'Pour exercer ces droits, contactez-nous à : ecopowerafrique@gmail.com'
      ]
    },
    {
      icon: Lock,
      title: '6. Conservation des données',
      content: [
        'Nous conservons vos données personnelles :',
        '• Pendant la durée d\'utilisation de votre compte',
        '• Pendant 3 ans après la fermeture de votre compte (obligations légales)',
        '• Les données de facturation sont conservées conformément aux obligations comptables (10 ans au Togo)',
        'Au-delà de ces durées, vos données sont supprimées de manière sécurisée.'
      ]
    },
    {
      icon: Shield,
      title: '7. Cookies et technologies similaires',
      content: [
        'Notre application peut utiliser des cookies et technologies similaires pour :',
        '• Mémoriser vos préférences',
        '• Améliorer les performances de l\'application',
        '• Analyser l\'utilisation de l\'application',
        'Vous pouvez gérer vos préférences de cookies dans les paramètres de votre appareil.'
      ]
    },
    {
      icon: Eye,
      title: '8. Modifications de la politique',
      content: [
        'Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.',
        'Les modifications seront publiées sur cette page avec une date de mise à jour.',
        'Nous vous informerons des modifications importantes par email ou via l\'application.',
        'La poursuite de l\'utilisation de nos services après modification vaut acceptation de la nouvelle politique.'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Légal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Politique de
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">Confidentialité</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-br from-[#FFA800]/10 to-[#FFD700]/10 rounded-3xl p-8 mb-12 border border-[#FFA800]/20">
            <p className="text-gray-700 leading-relaxed">
              Chez Ecopower, nous accordons une importance primordiale à la protection de vos données personnelles. 
              Cette politique de confidentialité explique comment nous collectons, utilisons, protégeons et partageons 
              vos informations lorsque vous utilisez notre application de gestion de consommation électrique.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#FFA800]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA800] to-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 pt-2">{section.title}</h2>
                </div>
                <div className="ml-16 space-y-2">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions ou préoccupations ?</h3>
            <p className="text-gray-700 mb-4">
              Si vous avez des questions concernant cette politique de confidentialité ou souhaitez exercer vos droits, 
              n'hésitez pas à nous contacter :
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Email :</strong>{' '}
                <a href="mailto:ecopowerafrique@gmail.com" className="text-[#FFA800] hover:underline">
                  ecopowerafrique@gmail.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Téléphone :</strong>{' '}
                <a href="tel:+22897240460" className="text-[#FFA800] hover:underline">
                  +228 97240460
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Adresse :</strong> Lomé, Togo
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

