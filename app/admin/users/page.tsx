'use client';

import { useEffect, useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getUsers({ page, limit: 10, search });
      if (response.data) {
        const data = response.data as any;
        setUsers(data.users || data.data || Array.isArray(data) ? data : []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    
    try {
      await adminApiService.deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading && users.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gérez tous les utilisateurs du système</p>
        </div>
        <AdminButton>
          <Plus size={18} className="mr-2" />
          Ajouter un utilisateur
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
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Users Table */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>{total} utilisateur{total > 1 ? 's' : ''}</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun utilisateur trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nom</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Téléphone</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rôle</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">
                          {user.prenom} {user.nom}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-gray-600">{user.telephone}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-600 hover:text-[#FFA800] hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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


