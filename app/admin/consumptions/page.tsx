'use client';

import { useEffect, useState, useCallback } from 'react';
import { Zap, Search, Filter } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
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
  annee?: number;
  mois?: number;
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
  const [yearFilter, setYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Generate years (current year back to 2020)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  // Months
  const months = [
    { value: '1', label: 'Janvier' }, { value: '2', label: 'Février' },
    { value: '3', label: 'Mars' }, { value: '4', label: 'Avril' },
    { value: '5', label: 'Mai' }, { value: '6', label: 'Juin' },
    { value: '7', label: 'Juillet' }, { value: '8', label: 'Août' },
    { value: '9', label: 'Septembre' }, { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' }, { value: '12', label: 'Décembre' }
  ];

  const loadConsumptions = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams: any = { page, limit: 10, search };
      if (yearFilter) queryParams.annee = yearFilter;
      if (monthFilter) queryParams.mois = monthFilter;
      
      const response = await adminApiService.getConsumptions(queryParams);
      if (response.data) {
        // L'API retourne 'consommations' (en français) selon la structure de l'API
        const data = (response.data as Record<string, unknown>).consommations 
          || (response.data as Record<string, unknown>).consumptions 
          || (response.data as Record<string, unknown>).data 
          || [];
        const pagination = (response.data as Record<string, unknown>).pagination as { total?: number } | undefined;
        setConsumptions(Array.isArray(data) ? data : []);
        setTotal(pagination?.total || (response.data as Record<string, unknown>).total as number || 0);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setConsumptions([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, yearFilter, monthFilter]);

  useEffect(() => {
    loadConsumptions();
  }, [loadConsumptions]);

  if (loading && consumptions.length === 0) {
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une consommation..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative w-32">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent appearance-none"
                >
                  <option value="">Année</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative w-40">
                <select
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="w-full pl-4 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent appearance-none"
                >
                  <option value="">Mois</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </AdminCardContent>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>{total} consommation{total > 1 ? 's' : ''}</AdminCardTitle>
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
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Période/Date</th>
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
                              : consumption.annee && consumption.mois
                              ? `${consumption.mois.toString().padStart(2, '0')}/${consumption.annee}`
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

          {/* Pagination */}
          {total > 10 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Page {page} sur {Math.ceil(total / 10)}
              </p>
              <div className="flex gap-2">
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Précédent
                </AdminButton>
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= Math.ceil(total / 10)}
                >
                  Suivant
                </AdminButton>
              </div>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}


