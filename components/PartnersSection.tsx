import Image from 'next/image';
import { Building2 } from 'lucide-react';

const partners = [
  { 
    name: 'Kiako', 
    logo: '/assets/partenaires/kiako.jpg',
    url: 'https://kiiako.io/'
  },
  { 
    name: 'Tech n Ctrl', 
    logo: '/assets/partenaires/logo.png',
    url: 'https://technctrl.com/'
  },
  { 
    name: 'Najahscore', 
    logo: '/assets/partenaires/najahscore.png',
    url: 'https://najahscore.com/'
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/3 via-transparent to-[#FFD700]/3"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Style portfolio-luc */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-lg font-bold text-[#FFA800]">PARTENAIRES</span>
            <div className="w-10 h-10 bg-[#FFA800]/10 rounded-lg flex items-center justify-center border border-[#FFA800]/20">
              <Building2 size={18} className="text-[#FFA800]" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Nos
            <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">Partenaires</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Des organisations qui nous font confiance et partagent notre vision
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 border border-gray-200/50 hover:border-[#FFA800]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFA800]/10 block"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center min-h-[120px]">
                <div className="relative w-full h-16 mb-6">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#FFA800] transition-colors">
                  {partner.name}
                </h3>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
