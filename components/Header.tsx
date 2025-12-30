'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Download } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'À propos', href: '#about' },
    { name: 'Screenshots', href: '#screenshots' },
    { name: 'Partenaires', href: '#partners' },
    { name: 'Télécharger', href: '#download' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 lg:w-9 lg:h-9">
              <Image
                src="/logo.png"
                alt="Ecopower"
                width={36}
                height={36}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-lg lg:text-xl font-bold text-gray-900">
              Ecopower
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-gray-700 hover:text-[#FFA800] transition-colors font-medium text-sm rounded-lg hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://play.google.com/store/apps/details?id=tg.konou.ecopower"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#FFA800] text-white rounded-full font-semibold text-sm hover:bg-[#E69500] transition-colors"
            >
              <Download size={14} />
              Télécharger
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#FFA800] transition-colors rounded-lg hover:bg-gray-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:text-[#FFA800] hover:bg-gray-50 transition-colors font-medium rounded-lg"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://play.google.com/store/apps/details?id=tg.konou.ecopower"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFA800] text-white rounded-lg font-semibold mt-2 hover:bg-[#E69500] transition-colors"
              >
                <Download size={16} />
                Télécharger
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
