// // src/lib/api.ts
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// class ApiClient {
//   private baseURL: string
//   private token: string | null = null

//   constructor(baseURL: string) {
//     this.baseURL = baseURL
//   }

//   setToken(token: string) {
//     this.token = token
//   }

//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<ApiResponse<T>> {
//     const url = `${this.baseURL}${endpoint}`
//     const headers = {
//       'Content-Type': 'application/json',
//       ...(this.token && { Authorization: `Bearer ${this.token}` }),
//       ...options.headers,
//     }

//     try {
//       const response = await fetch(url, {
//         ...options,
//         headers,
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || 'Erreur API')
//       }

//       return data
//     } catch (error) {
//       console.error('API Error:', error)
//       throw error
//     }
//   }

//   // Auth
//   async login(credentials: LoginCredentials) {
//     return this.request<{ user: User; token: string }>('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify(credentials),
//     })
//   }

//   async register(data: RegisterData) {
//     return this.request<{ user: User; token: string }>('/auth/register', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     })
//   }

//   // Members
//   async getMembers(page = 1, limit = 10) {
//     return this.request<PaginatedResponse<Member>>(`/members?page=${page}&limit=${limit}`)
//   }

//   async getMember(id: string) {
//     return this.request<Member>(`/members/${id}`)
//   }

//   async createMember(data: Partial<Member>) {
//     return this.request<Member>('/members', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     })
//   }

//   // Dashboard
//   async getDashboardStats() {
//     return this.request<DashboardStats>('/dashboard/stats')
//   }

//   // Payments
//   async createPayment(data: { memberId: string; amount: number }) {
//     return this.request<{ clientSecret: string }>('/payments', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     })
//   }
// }

// export const api = new ApiClient(API_BASE_URL)

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer le refresh token automatiquement
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 et pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        // Retry la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh a échoué, déconnecter l'utilisateur
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
/*
```

**Explications détaillées :**

**`API_URL`** : 
- Lit l'URL de l'API depuis les variables d'environnement Next.js
- Si absente, utilise `http://localhost:8000/api` par défaut
- `NEXT_PUBLIC_` permet d'exposer la variable côté client (navigateur)

**`axios.create()`** :
- Crée une instance Axios personnalisée avec une configuration de base
- `baseURL` : Toutes les requêtes commenceront par cette URL
- `headers` : Headers par défaut pour toutes les requêtes

**Premier Intercepteur (Request)** :
- S'exécute **avant** chaque requête
- Récupère le token d'accès depuis `localStorage`
- L'ajoute automatiquement au header `Authorization: Bearer <token>`
- Tu n'as plus à gérer ça manuellement dans chaque requête

**Deuxième Intercepteur (Response)** :
- S'exécute **après** chaque réponse
- Si la réponse est OK, la retourne telle quelle
- Si erreur 401 (Non autorisé = token expiré) :
  1. Récupère le refresh token
  2. Appelle `/auth/refresh/` pour obtenir un nouveau access token
  3. Sauvegarde le nouveau token
  4. **Retry automatiquement** la requête originale
  5. Si le refresh échoue (refresh token expiré), déconnecte l'utilisateur

**Analogie :**
Imagine un garde à l'entrée d'un bâtiment :
- **Request interceptor** = Il vérifie ton badge avant de te laisser entrer
- **Response interceptor** = Si ton badge est expiré, il le renouvelle automatiquement

---

### 3. Créer les variables d'environnement Next.js

**Crée un fichier `frontend/.env.local` :**
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api*/