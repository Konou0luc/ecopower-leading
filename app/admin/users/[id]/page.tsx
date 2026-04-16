'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  User as UserIcon, 
  Calendar, 
  Shield, 
  Home,
  FileText,
  Zap,
  CreditCard,
  MapPin
} from 'lucide-react';
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import adminApiService from '@/services/adminApiService';
import LoadingSpinner from '@/components/admin/ui/LoadingSpinner';
import UserLocationMap from '@/components/admin/UserLocationMap';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  statut?: string;
  homeLatitude?: number;
  homeLongitude?: number;
  homeCity?: string;
  homeCountry?: string;
  homeLocationSource?: string;
  maisonId?: string | {
    _id?: string;
    nomMaison?: string;
    adresse?: string | {
      rue?: string;
      ville?: string;
      pays?: string;
    };
  };
  maison?: {
    _id?: string;
    nomMaison?: string;
    adresse?: string | {
      rue?: string;
      ville?: string;
      pays?: string;
    };
  };
  abonnementId?: string | {
    _id?: string;
    typeAbonnement?: string;
    statut?: string;
    dateDebut?: string;
    dateFin?: string;
  };
  abonnement?: {
    _id?: string;
    typeAbonnement?: string;
    statut?: string;
    dateDebut?: string;
    dateFin?: string;
  };
  idProprietaire?: string | {
    _id?: string;
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
  };
  stats?: {
    maisons?: number;
    factures?: number;
    consommations?: number;
  };
}

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadUserDetails();
    }
  }, [userId]);

  const loadUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApiService.getUser(userId);
      if (response.data) {
        const data = response.data as any;
        setUser(data.user || data.data || data);
      }
    } catch (err: any) {
      console.error('Erreur lors du chargement des détails:', err);
      setError(err.message || 'Erreur lors du chargement des détails de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const formatAddress = (address: any): string => {
    if (!address) return 'N/A';
    if (typeof address === 'string') return address;
    if (typeof address === 'object') {
      const parts = [];
      if (address.rue) parts.push(address.rue);
      if (address.adresseRue) parts.push(address.adresseRue);
      if (address.ville) parts.push(address.ville);
      if (address.adresseVille) parts.push(address.adresseVille);
      if (address.pays) parts.push(address.pays);
      if (address.adressePays) parts.push(address.adressePays);
      return parts.length > 0 ? parts.join(', ') : 'N/A';
    }
    return 'N/A';
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !user) {
    return (
      <div className="space-y-4 md:space-y-6 w-full max-w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Détails de l'utilisateur</h1>
          </div>
        </div>
        <AdminCard>
          <AdminCardContent>
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error || 'Utilisateur non trouvé'}</p>
              <AdminButton onClick={() => router.push('/admin/users')}>
                Retour à la liste
              </AdminButton>
            </div>
          </AdminCardContent>
        </AdminCard>
      </div>
    );
  }

  const maison = user.maisonId && typeof user.maisonId === 'object' 
    ? user.maisonId 
    : user.maison;
  const abonnement = user.abonnementId && typeof user.abonnementId === 'object'
    ? user.abonnementId
    : user.abonnement;
  const proprietaire = user.idProprietaire && typeof user.idProprietaire === 'object'
    ? user.idProprietaire
    : null;

  const hasLocation = user.homeLatitude != null && user.homeLongitude != null;

  return (
    <div className="space-y-4 md:space-y-6 w-full max-w-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Retour"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Détails de l'utilisateur</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Informations complètes de l'utilisateur</p>
        </div>
      </div>

      {/* User Profile Card */}
      <AdminCard>
        <AdminCardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 bg-[#FFA800] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.prenom?.charAt(0).toUpperCase() || ''}{user.nom?.charAt(0).toUpperCase() || ''}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user.prenom} {user.nom}
              </h2>
              <p className="text-sm text-gray-500">ID: {(user as { id?: string }).id ?? user._id}</p>
            </div>
            <div className="flex gap-2">
              <AdminButton variant="outline" onClick={() => router.push(`/admin/users`)}>
                Retour
              </AdminButton>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-6 h-6 text-[#FFA800] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Email</p>
                <p className="text-base font-semibold text-gray-900">{user.email || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-6 h-6 text-[#FFA800] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Téléphone</p>
                <p className="text-base font-semibold text-gray-900">{user.telephone || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-[#FFA800] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Rôle</p>
                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                  {user.role || 'N/A'}
                </span>
              </div>
            </div>

            {user.statut && (
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <UserIcon className="w-6 h-6 text-[#FFA800] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Statut</p>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    user.statut === 'actif' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.statut}
                  </span>
                </div>
              </div>
            )}
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Geolocation Map */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle className="flex items-center gap-2">
            <MapPin className="text-[#FFA800]" size={20} />
            Position Géographique
          </AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          {hasLocation ? (
            <div className="w-full relative z-0">
              <UserLocationMap 
                latitude={user.homeLatitude!} 
                longitude={user.homeLongitude!} 
                userName={`${user.prenom} ${user.nom}`}
                city={user.homeCity}
                country={user.homeCountry}
                locationSource={user.homeLocationSource}
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded text-sm">
                  <span className="text-gray-500 block mb-1">Latitude</span>
                  <span className="font-mono text-gray-900">{user.homeLatitude}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded text-sm">
                  <span className="text-gray-500 block mb-1">Longitude</span>
                  <span className="font-mono text-gray-900">{user.homeLongitude}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
              <MapPin size={32} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">Aucune coordonnée GPS enregistrée pour cet utilisateur.</p>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>

      {/* Maison Information */}
      {maison && (
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Maison</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-[#FFA800] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-1">
                  {maison.nomMaison || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  {formatAddress(maison.adresse ?? maison)}
                </p>
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>
      )}

      {/* Abonnement Information */}
      {abonnement && (
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Abonnement</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <p className="text-base font-semibold text-gray-900">{(abonnement as { type?: string; typeAbonnement?: string }).typeAbonnement || (abonnement as { type?: string }).type || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Statut</p>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  abonnement.statut === 'actif'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {abonnement.statut || 'N/A'}
                </span>
              </div>
              {abonnement.dateDebut && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date de début</p>
                  <p className="text-base font-semibold text-gray-900">
                    {formatDate(abonnement.dateDebut)}
                  </p>
                </div>
              )}
              {abonnement.dateFin && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date de fin</p>
                  <p className="text-base font-semibold text-gray-900">
                    {formatDate(abonnement.dateFin)}
                  </p>
                </div>
              )}
            </div>
          </AdminCardContent>
        </AdminCard>
      )}

      {/* Propriétaire Information (pour les résidents) */}
      {proprietaire && (
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Propriétaire</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <div className="flex items-start gap-4">
              <UserIcon className="w-6 h-6 text-[#FFA800] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-1">
                  {proprietaire.prenom} {proprietaire.nom}
                </p>
                <p className="text-sm text-gray-600">{proprietaire.email || 'N/A'}</p>
                {proprietaire.telephone && (
                  <p className="text-sm text-gray-600">{proprietaire.telephone}</p>
                )}
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>
      )}

      {/* Statistics */}
      {user.stats && Object.keys(user.stats).length > 0 && (
        <AdminCard>
          <AdminCardHeader>
            <AdminCardTitle>Statistiques</AdminCardTitle>
          </AdminCardHeader>
          <AdminCardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.stats.maisons !== undefined && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Home className="w-8 h-8 text-[#FFA800]" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{user.stats.maisons}</p>
                    <p className="text-sm text-gray-600">Maison{user.stats.maisons > 1 ? 's' : ''}</p>
                  </div>
                </div>
              )}
              {user.stats.factures !== undefined && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-8 h-8 text-[#FFA800]" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{user.stats.factures}</p>
                    <p className="text-sm text-gray-600">Facture{user.stats.factures > 1 ? 's' : ''}</p>
                  </div>
                </div>
              )}
              {user.stats.consommations !== undefined && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Zap className="w-8 h-8 text-[#FFA800]" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{user.stats.consommations}</p>
                    <p className="text-sm text-gray-600">Consommation{user.stats.consommations > 1 ? 's' : ''}</p>
                  </div>
                </div>
              )}
            </div>
          </AdminCardContent>
        </AdminCard>
      )}

      {/* Dates */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle>Informations de compte</AdminCardTitle>
        </AdminCardHeader>
        <AdminCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.createdAt && (
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-[#FFA800] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Date de création</p>
                  <p className="text-base font-semibold text-gray-900">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            )}

            {user.updatedAt && (
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-[#FFA800] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Dernière modification</p>
                  <p className="text-base font-semibold text-gray-900">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </AdminCardContent>
      </AdminCard>
    </div>
  );
}

