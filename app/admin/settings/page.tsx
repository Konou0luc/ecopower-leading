'use client';

import { useEffect, useState } from 'react';
import { Settings, Save, AlertCircle, CheckCircle, Activity, Server } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

interface SystemInfo {
  version?: {
    api: string;
    node: string;
    platform: string;
  };
  uptime?: {
    days: number;
    hours: number;
    minutes: number;
    total: number;
  };
  memory?: {
    used: string;
    total: string;
    percentage: string;
  };
  database?: {
    type: string;
    version: string;
    status: string;
  };
  environment?: string;
  timestamp?: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({});
  const [loading, setLoading] = useState(true);
  const [loadingSystemInfo, setLoadingSystemInfo] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
    loadSystemInfo();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // Simuler le chargement des paramètres
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Utiliser des valeurs par défaut
      setSettings({
        general: {
          appName: 'Ecopower',
          baseUrl: 'https://ecopower-api.vercel.app',
          apiVersion: '1.0.0'
        },
        security: {
          tokenExpiry: 15,
          passwordMinLength: 8
        }
      });
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSystemInfo = async () => {
    try {
      setLoadingSystemInfo(true);
      const response = await adminApiService.getSystemInfo();
      if (response.data) {
        setSystemInfo(response.data as SystemInfo);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des informations système:', error);
    } finally {
      setLoadingSystemInfo(false);
    }
  };

  const formatUptime = (uptime?: { days: number; hours: number; minutes: number }) => {
    if (!uptime) return 'N/A';
    return `${uptime.days}j ${uptime.hours}h ${uptime.minutes}m`;
  };

  const formatMemory = (memory?: { used: string; total: string }) => {
    if (!memory) return 'N/A';
    return `${memory.used} / ${memory.total}`;
  };

  const formatDatabase = (database?: { type: string; version: string }) => {
    if (!database) return 'N/A';
    return `${database.type} ${database.version}`;
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage({ type: 'success', text: 'Paramètres sauvegardés avec succès' });
      setTimeout(() => setMessage(null), 3000);
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
              Version de l'API
            </label>
            <input
              type="text"
              value={settings.general?.apiVersion || systemInfo.version?.api || '1.0.0'}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, apiVersion: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
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

      {/* System Information */}
      <AdminCard>
        <AdminCardHeader>
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-green-600" />
            <AdminCardTitle>Informations système</AdminCardTitle>
          </div>
        </AdminCardHeader>
        <AdminCardContent>
          {loadingSystemInfo ? (
            <div className="text-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Version de l'API
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {systemInfo.version?.api || '1.0.0'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Version de Node.js
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {systemInfo.version?.node || 'N/A'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Uptime
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {formatUptime(systemInfo.uptime)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mémoire utilisée
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {formatMemory(systemInfo.memory)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Base de données
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {formatDatabase(systemInfo.database)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Environnement
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    systemInfo.environment === 'production' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {systemInfo.environment || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}


