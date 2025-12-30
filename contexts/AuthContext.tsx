'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'admin' | 'super-admin' | 'proprietaire';
  firstLogin?: boolean;
  abonnementId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecopower-api.vercel.app';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.role === 'admin' || parsedUser.role === 'super-admin') {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('admin_access_token');
          localStorage.removeItem('admin_refresh_token');
          localStorage.removeItem('admin_user');
        }
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          motDePasse: password,
        }),
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (!isJson) {
        const text = await response.text();
        console.error('Réponse non-JSON:', text);
        throw new Error('Réponse invalide du serveur');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      if (data.user && (data.user.role === 'admin' || data.user.role === 'super-admin')) {
        localStorage.setItem('admin_access_token', data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('admin_refresh_token', data.refreshToken);
        }
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        setUser(data.user);
        return true;
      } else {
        throw new Error('Accès refusé. Droits administrateur requis.');
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('admin_refresh_token');
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        logout();
        return false;
      }

      const data = await response.json();
      localStorage.setItem('admin_access_token', data.accessToken);
      return true;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};


