'use client';

import { useEffect, useState } from 'react';
import { UserCheck, Search } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

export default function ResidentsPage() {
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadResidents();
  }, [search]);

  const loadResidents = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getResidents({ search });
      if (response.data) {
        const data = response.data as any;
        let residentsData = data.residents || data.data || (Array.isArray(data) ? data : []);
        setResidents(Array.isArray(residentsData) ? residentsData : []);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setResidents([]);
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
        <h1 className="text-3xl font-bold text-gray-900">Résidents</h1>
        <p className="text-gray-600 mt-1">Gérez tous les résidents</p>
      </div>

      <AdminCard>
        <AdminCardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un résident..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </AdminCardContent>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>{residents.length} résident{residents.length > 1 ? 's' : ''}</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {residents.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun résident trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nom</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Téléphone</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Maison</th>
                  </tr>
                </thead>
                <tbody>
                  {residents.map((resident) => (
                    <tr key={resident._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {resident.prenom} {resident.nom}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{resident.email}</td>
                      <td className="py-3 px-4 text-gray-600">{resident.telephone}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {resident.maison?.nomMaison || 'N/A'}
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


