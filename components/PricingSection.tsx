'use client';

import { useState } from 'react';
import { Home, Building2, Layers, Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    monthlyPrice: 500,
    description: 'Idéal pour les petites propriétés',
    popular: false,
    icon: Home,
    features: [
      'Gestion jusqu\'à 5 résidents',
      'Factures automatiques',
      'Relevés de compteur',
      'Historique des consommations',
      'Calcul automatique',
      'Messagerie avec résidents',
      'Tableau de bord',
    ],
  },
  {
    name: 'Premium',
    monthlyPrice: 1000,
    description: 'Parfait pour les propriétés moyennes',
    popular: true,
    icon: Building2,
    features: [
      'Tout du plan Basic',
      'Gestion jusqu\'à 15 résidents',
      'Statistiques avancées',
      'Rappels de paiement',
      'Suivi des factures en retard',
      'Messagerie de groupe',
      'Notifications push',
      'Support prioritaire',
      'Formation incluse',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 2000,
    description: 'Pour les grandes propriétés',
    popular: false,
    icon: Layers,
    features: [
      'Tout du plan Premium',
      'Gestion jusqu\'à 50 résidents',
      'Support prioritaire email',
      'Assistance personnalisée',
      'Demandes de fonctionnalités prioritaires',
    ],
  },
];

const periods = [
  { label: '1 Mois', months: 1, discount: 0 },
  { label: '3 Mois', months: 3, discount: 0.1 }, // 10% de réduction
  { label: '12 Mois', months: 12, discount: 0.2 }, // 20% de réduction
];

export default function PricingSection() {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[2]); // 12 mois par défaut

  const calculatePrice = (monthlyPrice: number) => {
    const totalPrice = monthlyPrice * selectedPeriod.months;
    const discountedPrice = totalPrice * (1 - selectedPeriod.discount);
    return Math.round(discountedPrice);
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Tarifs</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Choisis ton
            <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">plan d&apos;abonnement</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Des tarifs simples et transparents
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-gray-100 rounded-xl p-1.5 gap-1">
            {periods.map((period) => (
              <button
                key={period.months}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  selectedPeriod.months === period.months
                    ? 'bg-[#FFA800] text-white shadow-lg'
                    : 'text-gray-700 hover:text-[#FFA800] hover:bg-gray-50'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 max-w-6xl mx-auto relative">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-white border-2 border-[#FFA800] shadow-2xl scale-105 md:scale-110'
                  : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl overflow-hidden'
              }`}
            >
              {/* Badge POPULAIRE */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-[100]">
                  <div className="bg-gradient-to-r from-[#FFA800] to-[#FFD700] text-white px-10 py-3.5 rounded-full text-lg font-extrabold shadow-2xl flex items-center gap-2.5 border-4 border-white whitespace-nowrap">
                    <Star size={22} className="fill-white" />
                    <span>POPULAIRE</span>
                  </div>
                </div>
              )}

              <div className={`p-8 rounded-3xl overflow-hidden ${plan.popular ? 'pt-16' : ''}`}>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <plan.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-extrabold text-gray-900">
                      {calculatePrice(plan.monthlyPrice).toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-600">FCFA</span>
                  </div>
                  <span className="text-gray-600">
                    {selectedPeriod.months === 1 
                      ? 'par mois' 
                      : `pour ${selectedPeriod.months} mois`}
                    {selectedPeriod.discount > 0 && (
                      <span className="ml-2 text-[#FFA800] font-semibold">
                        (Économisez {Math.round(selectedPeriod.discount * 100)}%)
                      </span>
                    )}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[#FFA800] text-white hover:bg-[#E69500] shadow-lg hover:shadow-xl'
                      : 'bg-white text-[#FFA800] border-2 border-[#FFA800] hover:bg-[#FFA800] hover:text-white'
                  }`}
                >
                  {plan.popular ? 'Commencer' : 'Choisir ce plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Tous les plans incluent une période d&apos;essai gratuite
          </p>
        </div>
      </div>
    </section>
  );
}

