'use client';

import { useEffect, useState } from 'react';
import { Receipt, Search, Download } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import adminApiService from '@/services/adminApiService';
import { generateInvoicePdf } from '@/services/pdfService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

interface Bill {
  _id: string;
  numeroFacture?: string;
  residentId?: {
    _id?: string;
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
  };
  maisonId?: {
    nomMaison?: string;
    adresse?: string;
  };
  maison?: {
    nomMaison?: string;
  };
  consommationId?: {
    _id?: string;
    kwh?: number;
    mois?: number;
    annee?: number;
  };
  montantTotal?: number;
  montant?: number;
  statut?: string;
  dateFacture?: string;
  dateEmission?: string;
  facturePdf?: string;
  url?: string;
  details?: {
    prixKwh?: number;
    fraisFixes?: number;
  };
}

export default function BillingPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);

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

  const handleDownloadBill = async (bill: Bill) => {
    try {
      setDownloading(bill._id);
      
      // Afficher un indicateur de chargement
      const loadingMessage = document.createElement('div');
      loadingMessage.textContent = 'Génération du PDF en cours...';
      loadingMessage.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999;';
      document.body.appendChild(loadingMessage);

      // Récupérer les informations complètes du résident
      const residentsResponse = await adminApiService.getResidents({
        page: 1,
        limit: 100,
      });

      let residentFullData = null;
      if (residentsResponse.data) {
        const data = residentsResponse.data as any;
        const residents = data.residents || data.data || [];
        residentFullData = residents.find((r: any) => r._id === bill.residentId?._id);
      }

      if (!residentFullData || !bill.residentId) {
        document.body.removeChild(loadingMessage);
        alert('Erreur : Résident non trouvé');
        setDownloading(null);
        return;
      }

      // Récupérer la consommation associée à cette facture
      const consumptionResponse = await adminApiService.getConsumptions({
        page: 1,
        limit: 100,
      });

      if (!consumptionResponse.data) {
        document.body.removeChild(loadingMessage);
        alert('Erreur lors de la récupération de la consommation');
        setDownloading(null);
        return;
      }

      // Trouver la consommation correspondante
      const data = consumptionResponse.data as any;
      const consumptions = data.consommations || data.data || [];
      const consumption = consumptions.find((c: any) => {
        if (bill.consommationId) {
          return c._id === bill.consommationId._id ||
            (c.mois === bill.consommationId.mois && 
             c.annee === bill.consommationId.annee &&
             c.residentId?._id === bill.residentId._id);
        }
        return false;
      });

      if (!consumption) {
        document.body.removeChild(loadingMessage);
        alert('Consommation non trouvée pour cette période');
        setDownloading(null);
        return;
      }

      // Préparer les données pour le PDF
      const residentData = {
        _id: bill.residentId._id || residentFullData._id,
        nom: bill.residentId.nom || residentFullData.nom || '',
        prenom: bill.residentId.prenom || residentFullData.prenom || '',
        email: bill.residentId.email || residentFullData.email || '',
        telephone: residentFullData.telephone || bill.residentId.telephone || 'N/A',
      };

      const consumptionData = {
        kwh: consumption.kwh || bill.consommationId?.kwh || 0,
        mois: consumption.mois || bill.consommationId?.mois || new Date().getMonth() + 1,
        annee: consumption.annee || bill.consommationId?.annee || new Date().getFullYear(),
        previousIndex: consumption.previousIndex,
        currentIndex: consumption.currentIndex,
      };

      const billData = {
        _id: bill._id,
        numeroFacture: bill.numeroFacture,
        montant: bill.montant || bill.montantTotal || 0,
        dateEmission: bill.dateEmission || bill.dateFacture || new Date().toISOString(),
        datePaiement: undefined,
        statut: bill.statut || 'en attente',
        consommationId: {
          _id: bill.consommationId?._id || consumption._id,
          kwh: consumptionData.kwh,
          mois: consumptionData.mois,
          annee: consumptionData.annee,
        },
        details: bill.details,
      };

      const maisonName = bill.maisonId?.nomMaison || bill.maison?.nomMaison || 'N/A';

      // Générer le PDF
      await generateInvoicePdf(billData, residentData, consumptionData, maisonName);

      document.body.removeChild(loadingMessage);
    } catch (err: any) {
      console.error('Erreur téléchargement:', err);
      alert('Erreur lors de la génération de la facture: ' + (err.message || 'Erreur inconnue'));
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-4 md:space-y-6 w-full max-w-full">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Factures</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Gérez toutes les factures</p>
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
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Numéro</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Date</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Résident</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Maison</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Montant</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Statut</th>
                        <th className="px-3 md:px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bills.map((bill) => (
                        <tr key={bill._id} className="hover:bg-gray-50">
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                            #{bill.numeroFacture || bill._id?.slice(-6)}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {bill.dateFacture 
                              ? new Date(bill.dateFacture).toLocaleDateString('fr-FR')
                              : bill.dateEmission 
                              ? new Date(bill.dateEmission).toLocaleDateString('fr-FR')
                              : 'N/A'}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {bill.residentId 
                              ? `${bill.residentId.prenom || ''} ${bill.residentId.nom || ''}`.trim() || 'N/A'
                              : 'N/A'}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {bill.maisonId?.nomMaison || bill.maison?.nomMaison || 'N/A'}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#FFA800]">
                            {(bill.montantTotal || bill.montant || 0).toLocaleString('fr-FR')} FCFA
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
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
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => handleDownloadBill(bill)}
                              disabled={downloading === bill._id}
                              className="p-2 text-gray-600 hover:text-[#FFA800] hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Télécharger la facture"
                            >
                              {downloading === bill._id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FFA800]"></div>
                              ) : (
                                <Download size={18} />
                              )}
                            </button>
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


