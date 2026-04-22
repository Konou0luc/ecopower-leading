'use client';

import { useState } from 'react';
import { User, Mail, Phone, Save, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { useAuth } from '@/contexts/AuthContext';
import adminApiService from '@/services/adminApiService';

export default function ProfilePage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSavePassword = async () => {
    setMessage(null);

    if (!currentPassword || !password || !confirmPassword) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs.' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }

    if (password.length < 8) {
      setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 8 caractères.' });
      return;
    }

    try {
      setLoading(true);
      await adminApiService.changePassword({
        motDePasseActuel: currentPassword,
        nouveauMotDePasse: password,
      });
      setMessage({ type: 'success', text: 'Mot de passe mis à jour avec succès.' });
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: unknown) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Erreur lors du changement de mot de passe.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon profil</h1>
        <p className="text-gray-600 mt-1">Gérez vos informations personnelles</p>
      </div>

      {/* Profile Info */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>Informations personnelles</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-[#FFA800] rounded-full flex items-center justify-center text-gray-900 text-2xl font-bold">
              {user?.prenom.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {user?.prenom} {user?.nom}
              </h3>
              <p className="text-gray-600">{user?.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Téléphone
              </label>
              <input
                type="tel"
                value={user?.telephone || ''}
                disabled
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
              />
            </div>
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Change Password */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>Changer le mot de passe</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          <div className="space-y-4">
            {message && (
              <div
                className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <p>{message.text}</p>
              </div>
            )}
            <p className="text-sm text-gray-600">
              Pour des raisons de sécurité, utilisez un mot de passe d&apos;au moins 8 caractères avec des
              majuscules, minuscules, chiffres et caractères spéciaux.
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe actuel
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="admin-field"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-field"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="admin-field"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <AdminButton onClick={handleSavePassword} disabled={loading}>
              <Save size={18} className="mr-2" />
              {loading ? 'Enregistrement...' : 'Enregistrer le nouveau mot de passe'}
            </AdminButton>
          </div>
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}


