'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[+]?[0-9\s\-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch {
      setErrors({
        message: 'Erreur lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement par email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+228 97240460',
      description: 'Disponible sur WhatsApp',
      href: 'tel:+22897240460',
      color: '#E1F3FE',
      textColor: '#1F6C9F'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'ecopowerafrique@gmail.com',
      description: 'Réponse sous 24h',
      href: 'mailto:ecopowerafrique@gmail.com',
      color: '#FBF3DB',
      textColor: '#956400'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Lomé, Togo',
      description: 'Basé à Lomé',
      href: '#',
      color: '#EDF3EC',
      textColor: '#346538'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <motion.section 
        className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#F7F6F3]"
        initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          {/* Header */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
              Contact
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2F3437] leading-tight mb-8">
              Nous sommes
              <span className="font-bold text-[#111111]">&nbsp;là pour vous</span>
            </h1>
            <p className="text-lg text-[#787774] max-w-2xl mx-auto">
              Une question ? Une suggestion ? N'hésitez pas à nous contacter. Nous serons ravis de vous aider.
            </p>
          </div>

          {/* Introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-white rounded-xl p-8 mb-12 border border-[#EAEAEA]"
          >
            <p className="text-[#787774] leading-relaxed">
              Vous avez des questions sur Ecopower ? Vous rencontrez un problème avec l'application ?
              N'hésitez pas à nous contacter ! Nous vous répondrons dans les plus brefs délais.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.08 }}
                  className="group block p-8 border border-[#EAEAEA] rounded-xl bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: info.color, color: info.textColor }}
                    >
                      <info.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2F3437] mb-1">{info.title}</h3>
                      <p className="text-[#2F3437] font-medium mb-1">{info.content}</p>
                      <p className="text-sm text-[#787774]">{info.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="bg-white rounded-xl p-8 lg:p-12 border border-[#EAEAEA] text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#EDF3EC' }}>
                    <CheckCircle size={32} style={{ color: '#346538' }} />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2F3437] mb-3">Message envoyé avec succès !</h3>
                  <p className="text-[#787774] mb-6">
                    Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-[#111111] text-white rounded-md font-medium hover:bg-[#000000] active:scale-[0.98] transition-all duration-200"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="bg-white rounded-xl p-8 lg:p-12 border border-[#EAEAEA]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#787774] mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-md border ${
                          errors.name ? 'border-red-400' : 'border-[#EAEAEA]'
                        } focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all`}
                        placeholder="Votre nom"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                          <AlertCircle size={14} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#787774] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-md border ${
                          errors.email ? 'border-red-400' : 'border-[#EAEAEA]'
                        } focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#787774] mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-md border ${
                          errors.phone ? 'border-red-400' : 'border-[#EAEAEA]'
                        } focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all`}
                        placeholder="+228 XX XX XX XX"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                          <AlertCircle size={14} />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-[#787774] mb-2">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-md border ${
                          errors.subject ? 'border-red-400' : 'border-[#EAEAEA]'
                        } focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all`}
                        placeholder="Sujet de votre message"
                      />
                      {errors.subject && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                          <AlertCircle size={14} />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-[#787774] mb-2">
                      Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-md border ${
                          errors.message ? 'border-red-400' : 'border-[#EAEAEA]'
                        } focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all resize-none`}
                        placeholder="Votre message..."
                      />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                        <AlertCircle size={14} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {errors.message && typeof errors.message === 'string' && errors.message.includes('Erreur') && (
                    <div className="mb-6 p-4 border border-red-300 rounded-md" style={{ backgroundColor: '#FDEBEC' }}>
                      <p className="text-sm text-red-700 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {errors.message}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-[#111111] text-white rounded-md font-medium hover:bg-[#000000] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
