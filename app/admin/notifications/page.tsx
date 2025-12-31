'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">Gérez toutes les notifications</p>
      </div>

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
                      <h3 className="font-semibold text-gray-900 mb-1">{notif.titre}</h3>
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

