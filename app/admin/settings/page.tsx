'use client';

import { useEffect, useState } from 'react';
import { Settings, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getSettings();
      if (response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      await adminApiService.updateSettings(settings);
      setMessage({ type: 'success', text: 'Paramètres sauvegardés avec succès' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-1">Configurez les paramètres du système</p>
        </div>
        <AdminButton onClick={handleSave} disabled={saving}>
          <Save size={18} className="mr-2" />
          {saving ? 'Sauvegarde...' : 'Enregistrer'}
        </AdminButton>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {/* General Settings */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>Paramètres généraux</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom de l'application
            </label>
            <input
              type="text"
              value={settings.general?.appName || 'Ecopower'}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, appName: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL de base
            </label>
            <input
              type="text"
              value={settings.general?.baseUrl || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, baseUrl: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Security Settings */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>Paramètres de sécurité</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expiration du token (minutes)
            </label>
            <input
              type="number"
              value={settings.security?.tokenExpiry || 15}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, tokenExpiry: parseInt(e.target.value) },
                })
              }
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Longueur minimale du mot de passe
            </label>
            <input
              type="number"
              value={settings.security?.passwordMinLength || 8}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: { ...settings.security, passwordMinLength: parseInt(e.target.value) },
                })
              }
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}


