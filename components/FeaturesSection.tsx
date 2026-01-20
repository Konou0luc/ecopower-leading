import { Zap, FileText, Bell, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Suis ta consommation',
    description: 'Vois combien tu consommes en temps réel.',
    gradient: 'from-[#FFA800] to-[#FFD700]',
    bgGradient: 'from-[#FFA800]/10 to-[#FFD700]/10',
  },
  {
    icon: FileText,
    title: 'Factures automatiques',
    description: 'Tes factures se génèrent toutes seules.',
    gradient: 'from-[#FFA800] to-[#FFD700]',
    bgGradient: 'from-[#FFA800]/10 to-[#FFD700]/10',
  },
  {
    icon: Bell,
    title: 'Alertes importantes',
    description: 'On te prévient si tu consommes trop.',
    gradient: 'from-[#FFA800] to-[#FFD700]',
    bgGradient: 'from-[#FFA800]/10 to-[#FFD700]/10',
  },
  {
    icon: Smartphone,
    title: 'Sur ton téléphone',
    description: 'Tout est accessible depuis ton smartphone.',
    gradient: 'from-[#FFA800] to-[#FFD700]',
    bgGradient: 'from-[#FFA800]/10 to-[#FFD700]/10',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Fonctionnalités</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Ce que tu peux faire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FFA800]/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-900 rounded-xl flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
