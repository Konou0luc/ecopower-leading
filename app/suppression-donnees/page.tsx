import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Mail, Clock, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suppression des données - Ecopower',
  description:
    'Comment demander la suppression de vos données personnelles sur Ecopower (application, compte, messages).',
};

export default function SuppressionDonneesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Légal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Suppression des
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">
                données utilisateur
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dernière mise à jour :{' '}
              {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#FFA800]/10 to-[#FFD700]/10 rounded-3xl p-8 mb-12 border border-[#FFA800]/20">
            <p className="text-gray-700 leading-relaxed">
              Cette page décrit comment exercer votre droit à la suppression des données traitées dans le cadre du
              service Ecopower (application mobile, site et intégrations associées). Pour le détail des traitements,
              consultez notre{' '}
              <a href="/privacy-policy" className="text-[#FFA800] font-semibold hover:underline">
                politique de confidentialité
              </a>
              .
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA800] to-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 pt-2">1. Demande par e-mail</h2>
              </div>
              <div className="ml-0 sm:ml-16 space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Envoyez un e-mail à{' '}
                  <a href="mailto:ecopowerafrique@gmail.com" className="text-[#FFA800] font-semibold hover:underline">
                    ecopowerafrique@gmail.com
                  </a>{' '}
                  avec pour objet : <strong>« Demande de suppression de compte / données »</strong>.
                </p>
                <p>
                  Indiquez l&apos;adresse e-mail associée à votre compte Ecopower (et, si possible, le numéro de
                  téléphone utilisé pour WhatsApp ou l&apos;invitation). Cela nous permet de vérifier votre identité
                  avant toute action.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA800] to-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trash2 size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 pt-2">2. Données concernées</h2>
              </div>
              <div className="ml-0 sm:ml-16 space-y-2 text-gray-700 leading-relaxed">
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
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA800] to-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 pt-2">3. Délai de traitement</h2>
              </div>
              <p className="text-gray-700 leading-relaxed ml-0 sm:ml-16">
                Nous accusons réception dans les <strong>30 jours</strong> et traitons la demande dans un délai
                raisonnable, sous réserve des obligations légales (conservation comptable, litiges en cours, etc.).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA800] to-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 pt-2">4. Après suppression</h2>
              </div>
              <p className="text-gray-700 leading-relaxed ml-0 sm:ml-16">
                La suppression du compte est <strong>irréversible</strong> pour les données que nous sommes en mesure
                d&apos;effacer. Certaines traces techniques anonymisées peuvent être conservées à des fins de sécurité
                ou de mesure d&apos;audience, sans lien direct avec votre identité.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact</h3>
            <p className="text-gray-700">
              <strong>Email :</strong>{' '}
              <a href="mailto:ecopowerafrique@gmail.com" className="text-[#FFA800] hover:underline">
                ecopowerafrique@gmail.com
              </a>
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Téléphone :</strong>{' '}
              <a href="tel:+22897240460" className="text-[#FFA800] hover:underline">
                +228 97240460
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
