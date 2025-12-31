'use client';

import { useEffect, useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadLogs();
  }, [search]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getLogs();
      if (response.data) {
        const data = response.data as any;
        let logsData = data.logs || data.data || (Array.isArray(data) ? data : []);
        setLogs(Array.isArray(logsData) ? logsData : []);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const getLogLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warn':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Logs système</h1>
        <p className="text-gray-600 mt-1">Consultez les logs du système</p>
      </div>

      <AdminCard>
        <AdminCardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans les logs..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </AdminCardContent>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>{logs.length} log{logs.length > 1 ? 's' : ''}</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {logs.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun log trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Date</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Niveau</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Message</th>
                        <th className="px-3 md:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Utilisateur</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {logs.map((log) => (
                        <tr key={log._id} className="hover:bg-gray-50">
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {new Date(log.createdAt || log.timestamp).toLocaleString('fr-FR')}
                          </td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getLogLevelColor(
                                log.level
                              )}`}
                            >
                              {log.level || 'INFO'}
                            </span>
                          </td>
                          <td className="px-3 md:px-4 py-3 text-sm text-gray-900 break-words">{log.message || log.description}</td>
                          <td className="px-3 md:px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {log.utilisateur?.email || log.user?.email || 'Système'}
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

