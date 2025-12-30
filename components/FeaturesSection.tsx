import { Zap, BarChart3, FileText, Bell, Users, Shield, Smartphone, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Gestion optimisée',
    description: 'Suivez votre consommation en temps réel et réduisez vos coûts énergétiques efficacement.',
    gradient: 'from-[#FFA800] to-[#FFD700]',
    bgGradient: 'from-[#FFA800]/10 to-[#FFD700]/10',
  },
  {
    icon: BarChart3,
    title: 'Analyses détaillées',
    description: 'Tableaux de bord clairs avec données actualisées pour une meilleure prise de décision.',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: FileText,
    title: 'Facturation automatique',
    description: 'Génération automatique de factures basée sur la consommation réelle avec calculs précis.',
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
  },
  {
    icon: Bell,
    title: 'Notifications intelligentes',
    description: 'Alertes automatiques pour consommation élevée et rappels importants.',
    gradient: 'from-red-500 to-red-600',
    bgGradient: 'from-red-50 to-red-100',
  },
  {
    icon: Users,
    title: 'Gestion multi-résidents',
    description: 'Gérez facilement plusieurs résidents avec des quotas personnalisés selon votre abonnement.',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
  },
  {
    icon: Shield,
    title: 'Sécurité des données',
    description: 'Vos données sont protégées avec des mesures de sécurité appropriées et conformes.',
    gradient: 'from-indigo-500 to-indigo-600',
    bgGradient: 'from-indigo-50 to-indigo-100',
  },
  {
    icon: Smartphone,
    title: 'Application mobile',
    description: 'Accès complet depuis votre smartphone avec synchronisation en temps réel sur tous vos appareils.',
    gradient: 'from-pink-500 to-pink-600',
    bgGradient: 'from-pink-50 to-pink-100',
  },
  {
    icon: TrendingUp,
    title: 'Statistiques avancées',
    description: 'Rapports détaillés avec graphiques pour analyser les tendances de consommation.',
    gradient: 'from-teal-500 to-teal-600',
    bgGradient: 'from-teal-50 to-teal-100',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,168,0,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Fonctionnalités</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Tout ce dont vous avez
            <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">besoin</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Des outils conçus pour simplifier votre gestion quotidienne de l'énergie
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFA800]/10 hover:-translate-y-2"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.bgGradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 border border-gray-100`}>
                  <div className={`w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <feature.icon size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700">
                  {feature.description}
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
