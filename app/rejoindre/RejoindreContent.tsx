'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export default function RejoindreContent() {
  const [codeInvitation, setCodeInvitation] = useState('')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/demandes-residents/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          codeInvitation: codeInvitation.trim().toUpperCase(),
          prenom: prenom.trim(),
          nom: nom.trim(),
          telephone: telephone.trim(),
          email: email.trim().toLowerCase(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.message === 'string' ? data.message : 'Envoi impossible')
        return
      }
      setMessage(
        typeof data.message === 'string'
          ? data.message
          : 'Demande enregistrée. Le gérant doit l’approuver avant que vous puissiez vous connecter à l’application mobile.'
      )
      setCodeInvitation('')
      setPrenom('')
      setNom('')
      setTelephone('')
      setEmail('')
    } catch {
      setError('Erreur réseau. Vérifiez votre connexion ou l’URL de l’API (NEXT_PUBLIC_API_URL).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <motion.section 
        className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#F7F6F3]"
        initial={{ opacity: 0, y: 40, filter: 'blur(30px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#787774] mb-6">
              Rejoindre
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#2F3437] leading-tight mb-8">
              Rejoindre
              <span className="font-bold text-[#11111]">&nbsp;un logement</span>
            </h1>
            <p className="text-lg text-[#787774] max-w-2xl mx-auto">
              Saisissez le <strong>code d’invitation</strong> fourni par votre gérant, puis vos coordonnées.
              Une fois la demande validée, vous recevrez vos accès à l’application mobile.
            </p>
          </div>

          {message ? (
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="bg-white rounded-xl p-8 lg:p-12 border border-[#EAEAEA] text-center"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: '#EDF3EC' }}
              >
                <CheckCircle size={32} style={{ color: '#346538' }} />
              </div>
              <h3 className="text-2xl font-semibold text-[#2F3437] mb-3">Demande envoyée avec succès !</h3>
              <p className="text-[#787774] mb-6">{message}</p>
              <button
                onClick={() => setMessage(null)}
                className="px-6 py-3 bg-[#111111] text-white rounded-md font-medium hover:bg-[#000000] active:scale-[0.98] transition-all duration-200"
              >
                Envoyer une autre demande
              </button>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="space-y-6 rounded-xl border border-[#EAEAEA] bg-white p-8 lg:p-12"
            >
              <div>
                <label htmlFor="codeInvitation" className="block text-sm font-medium text-[#787774] mb-2">
                  Code d’invitation
                </label>
                <input
                  id="codeInvitation"
                  className="mt-1 w-full rounded-md border border-[#EAEAEA] px-4 py-3 uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all"
                  value={codeInvitation}
                  onChange={(e) => setCodeInvitation(e.target.value)}
                  required
                  maxLength={16}
                  placeholder="Ex. AB12CD34"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-[#787774] mb-2">
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    className="mt-1 w-full rounded-md border border-[#EAEAEA] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-[#787774] mb-2">
                    Nom
                  </label>
                  <input
                    id="nom"
                    className="mt-1 w-full rounded-md border border-[#EAEAEA] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-[#787774] mb-2">
                  Téléphone (WhatsApp)
                </label>
                <input
                  id="telephone"
                  type="tel"
                  className="mt-1 w-full rounded-md border border-[#EAEAEA] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#787774] mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 w-full rounded-md border border-[#EAEAEA] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#111111] focus:border-[#111111] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div 
                  className="p-4 border border-red-300 rounded-md"
                  style={{ backgroundColor: '#FDEBEC' }}
                >
                  <p className="text-sm text-red-700 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-[#111111] py-3 font-medium text-white hover:bg-[#000000] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi…' : 'Envoyer la demande'}
              </button>
            </motion.form>
          )}
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
