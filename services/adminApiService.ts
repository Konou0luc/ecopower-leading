const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecopower-api.vercel.app';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

class AdminApiService {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_access_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (!isJson) {
        const text = await response.text();
        throw new Error(`Réponse invalide: ${text}`);
      }

      const data = await response.json();

      if (!response.ok) {
        // Gestion spécifique des erreurs 404
        if (response.status === 404) {
          throw new Error(data.message || 'Route non trouvée. Vérifiez que l\'API backend est accessible.');
        }
        // Gestion des erreurs 401 (non autorisé)
        if (response.status === 401) {
          // Nettoyer le token et rediriger vers login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_access_token');
            localStorage.removeItem('admin_refresh_token');
            localStorage.removeItem('admin_user');
            window.location.href = '/admin/login';
          }
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        throw new Error(data.message || data.error || `Erreur HTTP ${response.status}`);
      }

      return { data };
    } catch (error: unknown) {
      console.error('Erreur API:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Une erreur inconnue s\'est produite');
    }
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/admin/dashboard/stats');
  }

  // Users
  async getUsers(params?: { page?: number; limit?: number; search?: string }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    
    return this.request(`/admin/users?${query.toString()}`);
  }

  async getUser(id: string) {
    return this.request(`/admin/users/${id}`);
  }

  async createUser(userData: Record<string, unknown>) {
    return this.request('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: Record<string, unknown>) {
    return this.request(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Houses
  async getHouses(params?: { page?: number; limit?: number; search?: string }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    
    return this.request(`/admin/houses?${query.toString()}`);
  }

  async getHouse(id: string) {
    return this.request(`/admin/houses/${id}`);
  }

  async createHouse(houseData: Record<string, unknown>) {
    return this.request('/admin/houses', {
      method: 'POST',
      body: JSON.stringify(houseData),
    });
  }

  async updateHouse(id: string, houseData: Record<string, unknown>) {
    return this.request(`/admin/houses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(houseData),
    });
  }

  async deleteHouse(id: string) {
    return this.request(`/admin/houses/${id}`, {
      method: 'DELETE',
    });
  }

  // Residents
  async getResidents(params?: { page?: number; limit?: number; search?: string }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    
    return this.request(`/admin/residents?${query.toString()}`);
  }

  // Consumptions
  async getConsumptions(params?: { page?: number; limit?: number; search?: string }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    
    return this.request(`/admin/consumptions?${query.toString()}`);
  }

  // Billing
  async getBills(params?: { page?: number; limit?: number; search?: string; statut?: string }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    if (params?.statut) query.append('statut', params.statut);
    
    const queryString = query.toString();
    return this.request(`/admin/bills${queryString ? `?${queryString}` : ''}`);
  }

  // Subscriptions
  async getSubscriptions(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    return this.request(`/admin/subscriptions?${query.toString()}`);
  }

  // Notifications
  async getNotifications(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    return this.request(`/admin/notifications?${query.toString()}`);
  }

  // Logs
  async getLogs(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    return this.request(`/admin/logs?${query.toString()}`);
  }

  // Settings
  async getSettings() {
    return this.request('/admin/settings');
  }

  async updateSettings(settings: Record<string, unknown>) {
    return this.request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }
}

const adminApiService = new AdminApiService();
export default adminApiService;


