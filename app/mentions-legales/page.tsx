import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Building2, Mail, Phone, MapPin, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - Ecopower',
  description: 'Mentions légales et informations sur Ecopower',
};

export default function LegalNoticePage() {
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
      
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Légal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Mentions
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">Légales</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Informations légales concernant l'application Ecopower
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-br from-[#FFA800]/10 to-[#FFD700]/10 rounded-3xl p-8 mb-12 border border-[#FFA800]/20">
            <p className="text-gray-700 leading-relaxed">
              Conformément aux dispositions légales en vigueur, les présentes mentions légales ont pour objet 
              d'informer les utilisateurs de l'application Ecopower sur l'identité et les modalités de fonctionnement 
              de l'éditeur du service.
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
                      {pIndex === 1 && section.title === '6. Protection des données personnelles' && (
                        <a href="/privacy-policy" className="text-[#FFA800] hover:underline font-semibold">
                          {' '}Politique de Confidentialité
                        </a>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-[#FFA800]" />
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#FFA800]" />
                <a href="mailto:ecopowerafrique@gmail.com" className="text-gray-700 hover:text-[#FFA800] transition-colors">
                  ecopowerafrique@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#FFA800]" />
                <a href="tel:+22897240460" className="text-gray-700 hover:text-[#FFA800] transition-colors">
                  +228 97240460
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#FFA800]" />
                <span className="text-gray-700">Lomé, Togo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

