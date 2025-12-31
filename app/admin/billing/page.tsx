'use client';

import { useEffect, useState } from 'react';
import { Receipt, Search, Download } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

export default function BillingPage() {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadBills();
  }, [search]);

  const loadBills = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApiService.getBills({ search });
      if (response.data) {
        // L'API retourne 'factures' selon l'ancien service
        const data = response.data as any;
        let billsData = data.factures || data.bills || data.data || (Array.isArray(data) ? data : []);
        setBills(Array.isArray(billsData) ? billsData : []);
      }
    } catch (err: any) {
      console.error('Erreur:', err);
      setError(err.message || 'Erreur lors du chargement des factures');
      setBills([]);
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
        <h1 className="text-3xl font-bold text-gray-900">Factures</h1>
        <p className="text-gray-600 mt-1">Gérez toutes les factures</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p className="font-semibold">Erreur</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <AdminCard>
        <AdminCardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une facture..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </AdminCardContent>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>{bills.length} facture{bills.length > 1 ? 's' : ''}</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {bills.length === 0 ? (
            <div className="text-center py-12">
              <Receipt size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucune facture trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Numéro</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Maison</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Montant</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill) => (
                    <tr key={bill._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        #{bill.numeroFacture || bill._id?.slice(-6)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {bill.dateFacture 
                          ? new Date(bill.dateFacture).toLocaleDateString('fr-FR')
                          : bill.dateEmission 
                          ? new Date(bill.dateEmission).toLocaleDateString('fr-FR')
                          : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {bill.maisonId?.nomMaison || bill.maison?.nomMaison || 'N/A'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#FFA800]">
                        {(bill.montantTotal || bill.montant || 0).toLocaleString('fr-FR')} FCFA
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            bill.statut === 'payee' || bill.statut === 'payée'
                              ? 'bg-green-100 text-green-800'
                              : bill.statut === 'enRetard' || bill.statut === 'en retard'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {bill.statut || 'En attente'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end">
                          <button className="p-2 text-gray-600 hover:text-[#FFA800] hover:bg-gray-100 rounded-lg transition-colors">
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}


