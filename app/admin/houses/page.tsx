'use client';

import { useEffect, useState, useCallback } from 'react';
import { Home, Plus, Search, Edit, Trash2, MapPin } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

interface House {
  _id?: string;
  id?: string;
  nomMaison: string;
  adresse?: {
    rue?: string;
    ville?: string;
    pays?: string;
  } | string;
  proprietaireId?: {
    nom: string;
    prenom: string;
    email: string;
  };
  proprietaire?: {
    nom: string;
    prenom: string;
    email: string;
  };
  nbResidents?: number;
  tarifKwh?: number;
  statut?: string;
  createdAt?: string;
}

export default function HousesPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadHouses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getHouses({ page, limit: 10, search });
      console.log('Réponse API maisons:', response);
      if (response.data) {
        // L'API retourne 'maisons' (en français) selon la structure de l'API
        const data = (response.data as Record<string, unknown>).maisons 
          || (response.data as Record<string, unknown>).houses 
          || (response.data as Record<string, unknown>).data 
          || [];
        const pagination = (response.data as Record<string, unknown>).pagination as { total?: number } | undefined;
        console.log('Données de maisons:', data);
        setHouses(Array.isArray(data) ? data : []);
        setTotal(pagination?.total || (response.data as Record<string, unknown>).total as number || 0);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setHouses([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadHouses();
  }, [loadHouses]);

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette maison ?')) return;
    
    try {
      await adminApiService.deleteHouse(id);
      loadHouses();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading && houses.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-4 md:space-y-6 w-full max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Maisons</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Gérez toutes les maisons enregistrées</p>
        </div>
        <AdminButton className="w-full sm:w-auto">
          <Plus size={18} className="mr-2" />
          Ajouter une maison
        </AdminButton>
      </div>

      {/* Search */}
      <AdminCard>
        <AdminCardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une maison..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Houses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {houses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Home size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Aucune maison trouvée</p>
          </div>
        ) : (
          houses.map((house) => {
            const owner = house.proprietaireId || house.proprietaire;
            const address = typeof house.adresse === 'string' 
              ? house.adresse 
              : house.adresse 
                ? `${house.adresse.rue || ''}, ${house.adresse.ville || ''}, ${house.adresse.pays || ''}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',')
                : 'Adresse non disponible';
            
            return (
              <AdminCard key={house._id || house.id}>
                <AdminCardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{house.nomMaison}</h3>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin size={14} />
                        <span>{address}</span>
                      </div>
                    </div>
                  </div>
                  
                  {owner && (
                    <div className="mb-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Propriétaire</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {owner.prenom} {owner.nom}
                      </p>
                      <p className="text-xs text-gray-600">{owner.email}</p>
                    </div>
                  )}

                  {(house.nbResidents !== undefined || house.tarifKwh !== undefined) && (
                    <div className="mb-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        {house.nbResidents !== undefined && (
                          <span className="text-gray-600">
                            <span className="font-semibold">{house.nbResidents}</span> résident{house.nbResidents > 1 ? 's' : ''}
                          </span>
                        )}
                        {house.tarifKwh !== undefined && (
                          <span className="text-gray-600">
                            <span className="font-semibold">{house.tarifKwh}</span> FCFA/kWh
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <button className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-semibold">
                      <Edit size={16} className="inline mr-1" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(house._id || house.id || '')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </AdminCardContent>
              </AdminCard>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {total > 10 && (
        <div className="flex items-center justify-between">
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
    </div>
  );
}


