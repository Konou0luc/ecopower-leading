import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Download, Smartphone, BarChart3, FileText, Bell, Users, Globe2, Moon, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guide rapide - Ecopower',
  description: 'Guide rapide pour bien utiliser l’application mobile Ecopower.',
};

const managerSteps = [
  {
    icon: Download,
    title: '1. Installer l’application et te connecter (Google)',
    items: [
      'Ouvre le Google Play Store sur ton smartphone Android.',
      'Cherche « Ecopower » ou clique sur le bouton Télécharger en haut du site.',
      'Installe l’app, ouvre-la puis connecte-toi avec Google.',
      'Si l’application te demande des informations supplémentaires (ex: téléphone), renseigne-les une seule fois pour finaliser la création du compte.',
    ],
  },
  {
    icon: Users,
    title: '2. Configurer ta maison et tes résidents',
    items: [
      'Crée ta maison (ou ton immeuble) : nom de la maison, adresse (ville/pays), description si besoin.',
      'Configure les paramètres importants : tarif du kWh et nombre maximal de résidents.',
      'Ajoute les résidents en renseignant leurs informations (nom, prénom, email, téléphone) et la maison concernée.',
      'Une invitation Google Sign-In est envoyée au résident (email ou WhatsApp) pour qu’il puisse se connecter.',
    ],
  },
  {
    icon: BarChart3,
    title: '3. Enregistrer et suivre les consommations',
    items: [
      'Depuis les écrans de gestion, saisis les consommations (kWh) par période pour chaque résident / maison.',
      'Contrôle l’évolution globale des consommations sur les graphiques (par mois, par année).',
      'Identifie rapidement les hausses anormales afin de prévenir les abus ou les fuites d’énergie.',
    ],
  },
  {
    icon: FileText,
    title: '4. Générer et gérer les factures',
    items: [
      'À partir des consommations enregistrées, génère automatiquement les factures pour chaque résident.',
      'Vérifie le montant, le statut (payée / en attente) et la période de chaque facture.',
      'Génère un PDF de facture si besoin pour l’envoyer par email ou l’archiver.',
    ],
  },
  {
    icon: MessageCircle,
    title: '5. Communiquer avec les résidents',
    items: [
      'Utilise les fonctionnalités de messagerie intégrée pour échanger avec les résidents sur leurs consommations.',
      'Envoie des messages groupés pour prévenir d’un relevé, d’une nouvelle facture ou d’un changement de tarif.',
    ],
  },
  {
    icon: Bell,
    title: '6. Gérer les alertes et les notifications',
    items: [
      'Active les notifications pour recevoir les alertes importantes (nouveaux relevés, factures créées, messages…).',
      'Assure-toi que ton appareil autorise Ecopower à t’envoyer des notifications.',
    ],
  },
];

const residentSteps = [
  {
    icon: Smartphone,
    title: '1. Installer l’application et se connecter (Google)',
    items: [
      'Installe Ecopower depuis le Google Play Store sur ton smartphone Android.',
      'Connecte-toi avec Google (le même email que celui utilisé par ton gérant/propriétaire pour t’ajouter).',
      'Si l’application te demande des informations supplémentaires (ex: téléphone), renseigne-les pour finaliser la connexion.',
    ],
  },
  {
    icon: Users,
    title: '2. Rejoindre ta maison',
    items: [
      'Une fois connecté, vérifie que ta maison (ou ton appartement) apparaît bien dans l’application.',
      'Si ce n’est pas le cas, contacte ton gérant pour qu’il t’ajoute comme résident.',
    ],
  },
  {
    icon: BarChart3,
    title: '3. Suivre ta consommation',
    items: [
      'Depuis ton tableau de bord résident, vois un résumé de ta consommation en kWh et du montant associé.',
      'Ouvre la page « Mes consommations » pour consulter l’historique mois par mois avec des graphiques détaillés.',
      'Filtre par année pour comparer les périodes et repérer les mois où tu consommes le plus.',
    ],
  },
  {
    icon: FileText,
    title: '4. Consulter tes factures',
    items: [
      'Accède à la section « Factures » pour voir toutes tes factures, avec leur montant et leur statut (payée / en attente).',
      'Depuis certaines pages, tu peux ouvrir ou télécharger une facture PDF pour l’archiver ou l’imprimer.',
    ],
  },
  {
    icon: MessageCircle,
    title: '5. Discuter avec ton gérant',
    items: [
      'Utilise la messagerie dans l’app pour poser des questions sur une facture ou une consommation.',
      'Retrouve l’historique de vos échanges au même endroit pour garder une trace claire.',
    ],
  },
  {
    icon: Globe2,
    title: '6. Personnaliser ton expérience (langue, thème, notifications)',
    items: [
      'Depuis le tableau de bord, ouvre les paramètres (icône engrenage).',
      'Choisis ta langue (français ou anglais) et active le mode clair ou sombre selon tes préférences.',
      'Assure-toi que les notifications sont activées sur ton téléphone pour recevoir les rappels et alertes importantes.',
    ],
  },
];

export default function QuickStartPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">
                Guide
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Guide rapide
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">
                pour utiliser Ecopower
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvre en quelques étapes comment utiliser Ecopower, que tu sois gérant / propriétaire ou résident.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#FFA800]/10 to-[#FFD700]/10 rounded-3xl p-8 mb-12 border border-[#FFA800]/20">
            <p className="text-gray-700 leading-relaxed">
              L’application mobile Ecopower te permet de gérer et de suivre les consommations électriques d’une maison
              ou d’un immeuble. Ce guide est divisé en deux parties&nbsp;: d’abord l’utilisation complète pour les
              gérants / propriétaires, puis l’expérience côté résidents.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              La connexion se fait via <span className="font-semibold">Google Sign-In</span>. Selon les cas, l’app peut
              te demander un <span className="font-semibold">numéro de téléphone</span> pour compléter ton profil au
              premier accès.
            </p>
          </div>

          {/* Section 1 : Gérant / Propriétaire */}
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4">
              1. Utilisation complète pour les gérants / propriétaires
            </h2>
            <p className="text-gray-700 mb-6">
              Cette partie explique comment configurer Ecopower pour gérer un ou plusieurs logements, suivre les
              consommations et facturer les résidents.
            </p>
            <div className="space-y-8">
              {managerSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#FFA800]/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFA800] to-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 pt-2">
                      {step.title}
                    </h3>
                  </div>
                  <ul className="ml-16 space-y-2 list-disc text-gray-700 leading-relaxed">
                    {step.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 : Résidents */}
          <div className="space-y-8">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4">
              2. Utilisation pour les résidents
            </h2>
            <p className="text-gray-700 mb-6">
              Cette partie montre comment un résident peut installer l’app, suivre sa consommation et gérer ses factures
              au quotidien. Un résident ne crée pas son accès seul : il doit d’abord être ajouté par un gérant /
              propriétaire avec son email Google.
            </p>
            {residentSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#FFA800]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA800] to-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                    <step.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 pt-2">
                    {step.title}
                  </h3>
                </div>
                <ul className="ml-16 space-y-2 list-disc text-gray-700 leading-relaxed">
                  {step.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-3xl p-8 border border-gray-200 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Prêt à essayer Ecopower ?
              </h3>
              <p className="text-gray-700">
                Télécharge l’application sur ton smartphone Android et connecte-toi avec tes identifiants pour
                accéder immédiatement à ton tableau de bord.
              </p>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=tg.konou.ecopower"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FFA800] text-white rounded-full font-semibold text-sm hover:bg-[#E69500] transition-colors"
            >
              <Download size={18} />
              Télécharger l’app
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

