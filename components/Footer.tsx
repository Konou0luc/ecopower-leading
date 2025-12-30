import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const currentYear = new Date().getFullYear();

const footerLinks = {
  product: [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'Screenshots', href: '#screenshots' },
    { name: 'Télécharger', href: '#download' },
  ],
  support: [
    { name: 'À propos', href: '#about' },
    { name: 'Partenaires', href: '#partners' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Confidentialité', href: '/privacy-policy' },
    { name: 'Conditions', href: '/terms-of-service' },
    { name: 'Mentions légales', href: '/mentions-legales' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,168,0,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Ecopower"
                width={44}
                height={44}
                className="object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ecopower
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Solution de gestion de consommation électrique adaptée au contexte africain. 
              Simplifiez votre gestion énergétique avec Ecopower.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#FFA800] transition-colors group">
                <Phone size={18} className="text-[#FFA800] transition-colors" />
                <span className="text-sm">+228 97240460</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#FFA800] transition-colors group">
                <Mail size={18} className="text-[#FFA800] transition-colors" />
                <span className="text-sm">ecopowerafrique@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#FFA800] transition-colors group">
                <MapPin size={18} className="text-[#FFA800] transition-colors" />
                <span className="text-sm">Lomé, Togo</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Produit</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFA800] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#FFA800] transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFA800] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#FFA800] transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Légal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFA800] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#FFA800] transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Ecopower. Tous droits réservés.
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-[#FFA800] rounded-full text-gray-400 hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
