'use client';

import { useEffect, useState, useCallback } from 'react';
import { Zap, Search } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

interface Consumption {
  _id?: string;
  id?: string;
  dateReleve?: string;
  periode?: string;
  kwh?: number;
  releveCompteur?: number;
  montant?: number;
  residentId?: {
    _id?: string;
    nom?: string;
    prenom?: string;
    email?: string;
  };
  maisonId?: {
    nomMaison?: string;
    adresse?: string;
  };
  maison?: {
    nomMaison?: string;
  };
}

export default function ConsumptionsPage() {
  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadConsumptions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getConsumptions({ search });
      console.log('Réponse API consommations:', response);
      if (response.data) {
        // L'API retourne 'consommations' (en français) selon la structure de l'API
        const data = (response.data as Record<string, unknown>).consommations 
          || (response.data as Record<string, unknown>).consumptions 
          || (response.data as Record<string, unknown>).data 
          || [];
        console.log('Données de consommations:', data);
        setConsumptions(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setConsumptions([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadConsumptions();
  }, [loadConsumptions]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Consommations</h1>
        <p className="text-gray-600 mt-1">Gérez toutes les consommations électriques</p>
      </div>

      <AdminCard>
        <AdminCardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une consommation..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </AdminCardContent>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>{consumptions.length} consommation{consumptions.length > 1 ? 's' : ''}</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {consumptions.length === 0 ? (
            <div className="text-center py-12">
              <Zap size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucune consommation trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Date</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Résident</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Maison</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Relevé (kWh)</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Montant</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {consumptions.map((consumption) => (
                        <tr key={consumption._id || consumption.id} className="hover:bg-gray-50">
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {consumption.dateReleve 
                              ? new Date(consumption.dateReleve).toLocaleDateString('fr-FR')
                              : consumption.periode || 'N/A'}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {consumption.residentId 
                              ? `${consumption.residentId.prenom || ''} ${consumption.residentId.nom || ''}`.trim() || 'N/A'
                              : 'N/A'}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {consumption.maisonId?.nomMaison || consumption.maison?.nomMaison || consumption.maisonId?.adresse || 'N/A'}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {consumption.kwh || consumption.releveCompteur || 0} kWh
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#FFA800]">
                            {(consumption.montant || 0).toLocaleString('fr-FR')} FCFA
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


