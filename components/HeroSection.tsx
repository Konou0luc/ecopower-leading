'use client';

import Image from 'next/image';
import { ArrowRight, Smartphone, TrendingUp, Shield, Zap, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/5 via-white to-[#FFD700]/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,168,0,0.1),transparent_50%)]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#FFA800]/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFA800]/10 rounded-full border border-[#FFA800]/20">
                <Sparkles size={12} className="text-[#FFA800]" />
                <span className="text-sm font-semibold text-[#FFA800]">Solution innovante pour le Togo</span>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Gérez votre consommation
                <span className="block mt-2">
                  <span className="gradient-text">électrique</span>
                </span>
                <span className="block text-gray-900">avec simplicité</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                Ecopower simplifie la gestion de votre consommation électrique au Togo. 
                Suivez vos relevés, générez vos factures automatiquement et gardez le contrôle 
                sur vos dépenses énergétiques.
              </p>
            </div>

            {/* Stats - Pill Style (comme portfolio-luc) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                <Shield className="text-green-500" size={14} />
                <span className="text-sm text-gray-700 font-medium">Sécurisé</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                <Zap className="text-[#FFA800]" size={14} />
                <span className="text-sm text-gray-700 font-medium">Rapide</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                <TrendingUp className="text-blue-500" size={14} />
                <span className="text-sm text-gray-700 font-medium">Efficace</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://play.google.com/store/apps/details?id=tg.konou.ecopower"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FFA800] to-[#E69500] text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-[#FFA800]/50 transition-all"
              >
                <Smartphone size={20} />
                <span>Télécharger sur Google Play</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FFA800] to-[#FFD700] rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded-lg w-1/2 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Consommation du mois</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">125.5 kWh</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#FFA800] via-[#FFD700] to-[#FFA800] h-3 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0 kWh</span>
                    <span>200 kWh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
