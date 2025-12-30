'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
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
      // Envoyer le message via mailto ou API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ecopower-api.vercel.app';
      
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
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
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
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
      href: 'tel:+22897240460'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'ecopowerafrique@gmail.com',
      description: 'Réponse sous 24h',
      href: 'mailto:ecopowerafrique@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Lomé, Togo',
      description: 'Basé à Lomé',
      href: '#'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#FFA800] uppercase tracking-wider">Contact</span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Contactez
              <span className="block bg-gradient-to-r from-[#FFA800] to-[#FFD700] bg-clip-text text-transparent">notre équipe</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Une question ? Une suggestion ? N'hésitez pas à nous contacter. Nous serons ravis de vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="group block bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FFA800]/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFA800] to-[#FFD700] rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-700 font-medium mb-1">{info.content}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 border border-green-200 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Message envoyé avec succès !</h3>
                  <p className="text-gray-600 mb-6">
                    Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-[#FFA800] text-white rounded-xl font-semibold hover:bg-[#E69500] transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent transition-all`}
                        placeholder="Votre nom"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent transition-all`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent transition-all`}
                        placeholder="+228 XX XX XX XX"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.subject ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent transition-all`}
                        placeholder="Sujet de votre message"
                      />
                      {errors.subject && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent transition-all resize-none`}
                      placeholder="Votre message..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {errors.message && typeof errors.message === 'string' && errors.message.includes('Erreur') && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-600 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {errors.message}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#FFA800] to-[#E69500] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

