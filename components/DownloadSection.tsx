import { Smartphone, Download, ExternalLink, Sparkles } from 'lucide-react';

export default function DownloadSection() {
  return (
    <section id="download" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/10 via-white to-[#FFD700]/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,168,0,0.1),transparent_70%)]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#FFA800]/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Téléchargement</span>
            </div>
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#FFA800]/10 to-[#FFD700]/10 rounded-2xl mb-6 border border-[#FFA800]/20">
              <Smartphone size={18} className="text-[#FFA800]" />
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Téléchargez
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">l'application</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 font-light">
              Disponible sur Android. Version iOS bientôt disponible.
            </p>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/apps/details?id=tg.konou.ecopower"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 sm:gap-4 px-6 py-3 sm:px-10 sm:py-5 bg-gradient-to-r from-[#FFA800] to-[#E69500] text-white rounded-2xl font-bold text-sm sm:text-lg hover:shadow-2xl hover:shadow-[#FFA800]/50 transition-all w-full sm:w-auto sm:min-w-[320px] justify-center overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <Download size={16} className="relative z-10 sm:w-[18px] sm:h-[18px]" />
              <span className="relative z-10">Télécharger sur Google Play</span>
              <ExternalLink size={16} className="relative z-10 sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
            </a>

            {/* App Store Button - Disabled */}
            <div
              className="relative inline-flex items-center gap-2 sm:gap-4 px-6 py-3 sm:px-10 sm:py-5 bg-white text-gray-500 rounded-2xl font-bold text-sm sm:text-lg border-2 border-gray-300 w-full sm:w-auto sm:min-w-[320px] justify-center cursor-not-allowed opacity-60"
              title="Version bientôt disponible sur l'App Store"
            >
              <Smartphone size={20} className="sm:w-6 sm:h-6" />
              <span>App Store</span>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-500 whitespace-nowrap flex items-center gap-1">
                <Sparkles size={12} className="sm:w-[14px] sm:h-[14px]" />
                Bientôt disponible
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200/50 shadow-xl">
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
              L'application Ecopower est disponible gratuitement sur Google Play Store. 
              Téléchargez-la dès maintenant et commencez à gérer votre consommation électrique 
              de manière simple et efficace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
