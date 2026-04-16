'use client';

import { useEffect, useState } from 'react';
import { UserCheck, Search, Trash2 } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { DeleteConfirmModal } from '@/components/admin/ui/DeleteConfirmModal';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

export default function ResidentsPage() {
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [residentToDelete, setResidentToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    loadResidents();
  }, [page, search]);

  const loadResidents = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getResidents({ page, limit: 10, search });
      if (response.data) {
        const data = response.data as any;
        const residentsData = data.residents || data.data || (Array.isArray(data) ? data : []);
        const list = Array.isArray(residentsData) ? residentsData : [];
        setResidents(
          list.map((r: { id?: string; _id?: string; [key: string]: unknown }) => ({
            ...r,
            id: r.id ?? r._id ?? '',
          }))
        );
        setTotal(data.pagination?.total || data.total || 0);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setResidents([]);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setResidentToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!residentToDelete) return;
    
    try {
      setIsDeleting(true);
      // Wait for backend endpoint if not fully compatible, but using deleteUser as resident is a user
      await adminApiService.deleteUser(residentToDelete);
      setNotification({ message: 'Résident supprimé avec succès.', type: 'success' });
      setDeleteModalOpen(false);
      setResidentToDelete(null);
      loadResidents();
    } catch (error) {
      console.error('Erreur:', error);
      setNotification({ message: 'Erreur lors de la suppression du résident.', type: 'error' });
      setDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  if (loading && residents.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6 relative">
      {/* Notifications */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer le résident"
        message="Êtes-vous sûr de vouloir supprimer ce résident ? Cette action supprimera également ses consommations et factures associées."
        isLoading={isDeleting}
      />

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
          <AdminCardTitle>{total} résident{total > 1 ? 's' : ''}</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {residents.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun résident trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Nom</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Email</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Téléphone</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Maison</th>
                        <th className="px-3 md:px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {residents.map((resident) => (
                        <tr key={resident.id} className="hover:bg-gray-50">
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {resident.prenom} {resident.nom}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">{resident.email}</td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">{resident.telephone}</td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {resident.maison?.nomMaison || 'N/A'}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => confirmDelete(resident.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                              title="Supprimer"
                            >
                              <Trash2 size={18} />
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


