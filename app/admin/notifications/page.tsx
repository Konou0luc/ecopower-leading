'use client';

import { useEffect, useState } from 'react';
import { Bell, Send, Plus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    message: '',
    title: '',
    role: '' as '' | 'proprietaire' | 'resident' | 'admin'
  });
  const [broadcastLoading, setBroadcastLoading] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<any>(null);
  const [broadcastError, setBroadcastError] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getNotifications();
      if (response.data) {
        const data = response.data as any;
        let notificationsData = data.notifications || data.data || (Array.isArray(data) ? data : []);
        setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!broadcastForm.message.trim()) {
      setBroadcastError('Le message est requis');
      return;
    }

    if (!broadcastForm.title.trim()) {
      setBroadcastError('Le titre est requis');
      return;
    }

    setBroadcastLoading(true);
    setBroadcastError(null);
    setBroadcastResult(null);

    try {
      const payload: any = {
        message: broadcastForm.message.trim(),
        title: broadcastForm.title.trim()
      };

      if (broadcastForm.role) {
        payload.role = broadcastForm.role;
      }

      const response = await adminApiService.broadcastNotification(payload);

      if (response.data) {
        setBroadcastResult(response.data);
        // Réinitialiser le formulaire
        setBroadcastForm({
          message: '',
          title: '',
          role: ''
        });
        // Recharger les notifications
        loadNotifications();
        // Masquer le formulaire après 3 secondes
        setTimeout(() => {
          setShowForm(false);
          setBroadcastResult(null);
        }, 3000);
      }
    } catch (err: any) {
      setBroadcastError(err.message || 'Erreur lors de l\'envoi de la notification');
      console.error('Erreur broadcast:', err);
    } finally {
      setBroadcastLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Gérez toutes les notifications</p>
        </div>
        <AdminButton onClick={() => setShowForm(!showForm)}>
          <Plus size={18} className="mr-2" />
          {showForm ? 'Annuler' : 'Nouvelle notification'}
        </AdminButton>
      </div>

      {/* Message d'erreur */}
      {broadcastError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-3">
          <AlertCircle size={20} />
          <p>{broadcastError}</p>
        </div>
      )}

      {/* Résultat de l'envoi */}
      {broadcastResult && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <CheckCircle size={20} />
            Notification envoyée avec succès !
          </h3>
          <div className="text-sm text-green-700 space-y-1">
            <p><strong>Total:</strong> {broadcastResult.summary.total} utilisateur(s)</p>
            <p><strong>Succès:</strong> {broadcastResult.summary.success}</p>
            <p><strong>Échecs:</strong> {broadcastResult.summary.failed}</p>
            <p><strong>Taux de succès:</strong> {broadcastResult.summary.successRate}</p>
          </div>
        </div>
      )}

      {/* Formulaire d'envoi */}
      {showForm && (
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Envoyer une notification à tous les utilisateurs</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <form onSubmit={handleBroadcastSubmit} className="space-y-4">
              {/* Titre */}
              <div>
                <label htmlFor="broadcast-title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre de la notification <span className="text-red-500">*</span>
                </label>
                <input
                  id="broadcast-title"
                  type="text"
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  placeholder="Entrez le titre de la notification"
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="broadcast-message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="broadcast-message"
                  value={broadcastForm.message}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                  placeholder="Entrez votre message de notification..."
                  rows={6}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {broadcastForm.message.length} caractère(s)
                </p>
              </div>

              {/* Filtre par rôle */}
              <div>
                <label htmlFor="broadcast-role" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cibler un rôle spécifique (optionnel)
                </label>
                <select
                  id="broadcast-role"
                  value={broadcastForm.role}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, role: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
                >
                  <option value="">Tous les utilisateurs</option>
                  <option value="proprietaire">Propriétaires uniquement</option>
                  <option value="resident">Résidents uniquement</option>
                  <option value="admin">Admins uniquement</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Si aucun rôle n'est sélectionné, la notification sera envoyée à tous les utilisateurs avec un deviceToken
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <AdminButton
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setBroadcastForm({
                      message: '',
                      title: '',
                      role: ''
                    });
                    setBroadcastError(null);
                    setBroadcastResult(null);
                  }}
                  disabled={broadcastLoading}
                >
                  <X size={18} className="mr-2" />
                  Annuler
                </AdminButton>
                <AdminButton
                  type="submit"
                  className="flex items-center gap-2"
                  disabled={broadcastLoading || !broadcastForm.message.trim() || !broadcastForm.title.trim()}
                >
                  {broadcastLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer
                    </>
                  )}
                </AdminButton>
              </div>
            </form>
          </AdminCardContent>
        </AdminCard>
      )}

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>{notifications.length} notification{notifications.length > 1 ? 's' : ''}</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucune notification trouvée</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{notif.titre}</h3>
                        {notif.type && (
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            notif.type === 'error' ? 'bg-red-100 text-red-800' :
                            notif.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            notif.type === 'success' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {notif.type}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notif.createdAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                    {!notif.lue && (
                      <span className="w-2 h-2 bg-[#FFA800] rounded-full"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}

