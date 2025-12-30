'use client';

import { useState } from 'react';
import { User, Mail, Phone, Save, Lock } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSavePassword = () => {
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    // TODO: Implémenter le changement de mot de passe
    alert('Fonctionnalité à implémenter');
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <AdminButton onClick={handleSavePassword}>
              <Save size={18} className="mr-2" />
              Enregistrer le nouveau mot de passe
            </AdminButton>
          </div>
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}


