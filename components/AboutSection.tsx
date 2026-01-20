import { Target, Eye, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/5 via-transparent to-[#FFD700]/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">À propos</span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Notre
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">engagement</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-200/50 hover:border-[#FFA800]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFA800]/10 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                    <Target size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Notre Mission
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Simplifier la gestion de la consommation électrique au Togo en proposant une solution 
                  accessible, intuitive et adaptée au contexte local.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-200/50 hover:border-[#FFA800]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFA800]/10 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Notre Vision
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Devenir la référence en matière de gestion énergétique en Afrique de l'Ouest, en 
                  favorisant une consommation plus responsable et durable.
                </p>
              </div>
            </div>

            {/* Contexte */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-200/50 hover:border-[#FFA800]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFA800]/10 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Contexte africain
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Conçu spécifiquement pour répondre aux besoins et contraintes du marché 
                  togolais et de l'Afrique de l'Ouest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
