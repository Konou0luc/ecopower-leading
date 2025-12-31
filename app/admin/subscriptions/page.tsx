'use client';

import { useEffect, useState } from 'react';
import { CreditCard } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getSubscriptions();
      if (response.data) {
        const data = response.data as any;
        let subscriptionsData = data.subscriptions || data.data || (Array.isArray(data) ? data : []);
        setSubscriptions(Array.isArray(subscriptionsData) ? subscriptionsData : []);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubscriptions([]);
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
        <h1 className="text-3xl font-bold text-gray-900">Abonnements</h1>
        <p className="text-gray-600 mt-1">Gérez tous les abonnements</p>
      </div>

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>{subscriptions.length} abonnement{subscriptions.length > 1 ? 's' : ''}</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun abonnement trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Utilisateur</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Type</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Date début</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Date fin</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subscriptions.map((sub) => (
                        <tr key={sub._id} className="hover:bg-gray-50">
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {sub.utilisateur?.prenom} {sub.utilisateur?.nom}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">{sub.typeAbonnement}</td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {new Date(sub.dateDebut).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {new Date(sub.dateFin).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                                sub.statut === 'actif'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {sub.statut}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}


