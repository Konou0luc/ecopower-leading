'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'Comment ça marche', href: '#how-it-works' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ]

  const shouldShowDarkBg = !isHomePage || isScrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        shouldShowDarkBg 
          ? 'py-4 bg-[#111111]/90 backdrop-blur-xl border-b border-white/10' 
          : 'py-6 bg-transparent'
      }`}>
      <nav className="container mx-auto px-6 lg:px-16 flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Ecopower"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-medium text-white tracking-tight">
              Ecopower
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-white/70 hover:text-white transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/rejoindre"
              className="px-6 py-2.5 bg-white text-[#111111] rounded-md text-sm font-medium hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              Commencer
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-6 pb-6 bg-[#111111] border-t border-white/10">
          <div className="pt-6 space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base text-white font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <Link
                href="/rejoindre"
                className="block w-full px-6 py-3 bg-white text-[#111111] rounded-md text-center text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
