'use client';

import { useEffect, useState } from 'react';
import { Settings, Save, AlertCircle, CheckCircle, Activity, Server, Mail, Phone, Globe, FileText } from 'lucide-react';
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

interface AppInfoData {
  email: string;
  phone: string;
  website: string;
  description: string;
  guideRapideUrl: string;
  privacyPolicyUrl: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [appInfo, setAppInfo] = useState<AppInfoData>({
    email: '',
    phone: '',
    website: '',
    description: '',
    guideRapideUrl: '',
    privacyPolicyUrl: '',
  });
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({});
  const [loading, setLoading] = useState(true);
  const [loadingSystemInfo, setLoadingSystemInfo] = useState(true);
  const [loadingAppInfo, setLoadingAppInfo] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingAppInfo, setSavingAppInfo] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
    loadSystemInfo();
    loadAppInfo();
  }, []);

  const loadAppInfo = async () => {
    setLoadingAppInfo(true);
    try {
      const response = await adminApiService.getAppInfo();
      if (response.data) {
        setAppInfo({
          email: response.data.email || '',
          phone: response.data.phone || '',
          website: response.data.website || '',
          description: response.data.description || '',
          guideRapideUrl: response.data.guideRapideUrl || '',
          privacyPolicyUrl: response.data.privacyPolicyUrl || '',
        });
      }
    } catch (error) {
      console.error('Erreur chargement paramètres contact:', error);
    } finally {
      setLoadingAppInfo(false);
    }
  };

  const handleSaveAppInfo = async () => {
    setSavingAppInfo(true);
    setMessage(null);
    try {
      await adminApiService.updateAppInfo(appInfo);
      setMessage({ type: 'success', text: 'Paramètres de contact enregistrés. Ils seront visibles dans l\'app mobile.' });
      setTimeout(() => setMessage(null), 4000);
    } catch (error: unknown) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Erreur lors de la sauvegarde' });
    } finally {
      setSavingAppInfo(false);
    }
  };

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

      {/* Paramètres de contact - affichés dans l'app (À propos) */}
      <AdminCard>
        <AdminCardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-[#FFA800]" />
              <AdminCardTitle>Paramètres de contact</AdminCardTitle>
            </div>
            <AdminButton onClick={handleSaveAppInfo} disabled={savingAppInfo}>
              <Save size={18} className="mr-2" />
              {savingAppInfo ? 'Enregistrement...' : 'Enregistrer'}
            </AdminButton>
          </div>
        </AdminCardHeader>
        <AdminCardContent className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Ces informations sont affichées dans l&apos;application mobile (Paramètres → À propos et Centre d&apos;aide). Modifiez-les ici pour les mettre à jour partout.
          </p>
          {loadingAppInfo ? (
            <div className="py-8 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
          <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail size={14} className="inline mr-1" /> Email de contact
            </label>
            <input
              type="email"
              value={appInfo.email}
              onChange={(e) => setAppInfo({ ...appInfo, email: e.target.value })}
              placeholder="exemple@ecopower.com"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone size={14} className="inline mr-1" /> Téléphone
            </label>
            <input
              type="text"
              value={appInfo.phone}
              onChange={(e) => setAppInfo({ ...appInfo, phone: e.target.value })}
              placeholder="+228 97 24 04 60"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Globe size={14} className="inline mr-1" /> Site web
            </label>
            <input
              type="url"
              value={appInfo.website}
              onChange={(e) => setAppInfo({ ...appInfo, website: e.target.value })}
              placeholder="https://ecopower-web.vercel.app"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText size={14} className="inline mr-1" /> Description (optionnel)
            </label>
            <textarea
              value={appInfo.description}
              onChange={(e) => setAppInfo({ ...appInfo, description: e.target.value })}
              placeholder="Ecopower vous aide à gérer votre électricité en toute simplicité"
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Globe size={14} className="inline mr-1" /> Guide rapide (Centre d&apos;aide)
            </label>
            <input
              type="url"
              value={appInfo.guideRapideUrl}
              onChange={(e) => setAppInfo({ ...appInfo, guideRapideUrl: e.target.value })}
              placeholder="https://ecopowers.online/guide-rapide"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Globe size={14} className="inline mr-1" /> Politique de confidentialité
            </label>
            <input
              type="url"
              value={appInfo.privacyPolicyUrl}
              onChange={(e) => setAppInfo({ ...appInfo, privacyPolicyUrl: e.target.value })}
              placeholder="https://ecopowers.online/privacy-policy"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
          </>
          )}
        </AdminCardContent>
      </AdminCard>

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


