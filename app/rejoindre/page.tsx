"use client";

import { useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export default function RejoindrePage() {
  const [codeInvitation, setCodeInvitation] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/demandes-residents/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          codeInvitation: codeInvitation.trim().toUpperCase(),
          prenom: prenom.trim(),
          nom: nom.trim(),
          telephone: telephone.trim(),
          email: email.trim().toLowerCase(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.message === "string" ? data.message : "Envoi impossible");
        return;
      }
      setMessage(
        typeof data.message === "string"
          ? data.message
          : "Demande enregistrée. Le gérant doit l’approuver avant que vous puissiez vous connecter à l’application."
      );
      setCodeInvitation("");
      setPrenom("");
      setNom("");
      setTelephone("");
      setEmail("");
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion ou l’URL de l’API (NEXT_PUBLIC_API_URL).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            Ecopower
          </Link>
          <Link href="/" className="text-sm text-orange-600 hover:underline">
            Accueil
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-12">
        <h1 className="text-2xl font-bold text-slate-900">Rejoindre un logement</h1>
        <p className="mt-2 text-slate-600">
          Saisissez le <strong>code d’invitation</strong> fourni par votre gérant, puis vos coordonnées.
          Une fois la demande validée, vous recevrez vos accès à l’application mobile.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700">Code d’invitation</label>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 uppercase tracking-wider"
              value={codeInvitation}
              onChange={(e) => setCodeInvitation(e.target.value)}
              required
              maxLength={16}
              placeholder="Ex. AB12CD34"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Prénom</label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Nom</label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Téléphone (WhatsApp)</label>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">E-mail</label>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-700">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-orange-500 py-3 font-medium text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Envoi…" : "Envoyer la demande"}
          </button>
        </form>
      </main>
    </div>
  );
}
