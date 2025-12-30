'use client';

import { useEffect, useState } from 'react';
import { Users, Home, Zap, Receipt, TrendingUp, AlertTriangle } from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';

interface DashboardStats {
  utilisateurs?: {
    total: number;
    proprietaires: number;
    residents: number;
    admins: number;
  };
  maisons?: {
    total: number;
  };
  consommations?: {
    total: number;
    totalKwh: number;
    totalMontant: number;
  };
  factures?: {
    total: number;
    payees: number;
    enRetard: number;
    enAttente: number;
    revenusTotaux: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getDashboardStats();
      if (response.data) {
        setStats(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Chargement du tableau de bord..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Utilisateurs',
      value: stats?.utilisateurs?.total || 0,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      title: 'Maisons',
      value: stats?.maisons?.total || 0,
      icon: Home,
      color: 'from-green-500 to-green-600',
      change: '+5%',
    },
    {
      title: 'Consommations',
      value: stats?.consommations?.total || 0,
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      change: '+8%',
    },
    {
      title: 'Factures',
      value: stats?.factures?.total || 0,
      icon: Receipt,
      color: 'from-purple-500 to-purple-600',
      change: '+15%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre système</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <AdminCard key={index}>
              <AdminCardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={14} className="text-green-500" />
                      <span className="text-sm text-green-600 font-semibold">{card.change}</span>
                    </div>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </AdminCardContent>
            </AdminCard>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Factures Stats */}
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Factures</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payées</span>
                <span className="font-semibold text-green-600">
                  {stats?.factures?.payees || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">En attente</span>
                <span className="font-semibold text-yellow-600">
                  {stats?.factures?.enAttente || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">En retard</span>
                <span className="font-semibold text-red-600">
                  {stats?.factures?.enRetard || 0}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-semibold">Revenus totaux</span>
                  <span className="text-2xl font-bold text-[#FFA800]">
                    {stats?.factures?.revenusTotaux?.toLocaleString('fr-FR') || 0} FCFA
                  </span>
                </div>
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        {/* Utilisateurs Breakdown */}
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Répartition des utilisateurs</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Propriétaires</span>
                <span className="font-semibold text-gray-900">
                  {stats?.utilisateurs?.proprietaires || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Résidents</span>
                <span className="font-semibold text-gray-900">
                  {stats?.utilisateurs?.residents || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Administrateurs</span>
                <span className="font-semibold text-gray-900">
                  {stats?.utilisateurs?.admins || 0}
                </span>
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>
      </div>
    </div>
  );
}


