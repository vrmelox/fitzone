import api from './api'

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'ADMIN' | 'RECEPTIONIST' | 'MEMBER';
  phone?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens?: {
    access: string;
    refresh: string;
  };
  access?: string;
  refresh?: string;
}

// Inscription
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register/', data);

  if (response.data.tokens) {
    localStorage.setItem('access_token', response.data.tokens.access);
    localStorage.setItem('refresh_token', response.data.tokens.refresh);
    // Set cookie for middleware
    document.cookie = `auth-token=${response.data.tokens.access}; path=/; max-age=86400; SameSite=Lax`;
  }

  return response.data;
};

// Connexion
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login/', data);

  // Handle both flat and nested token structures
  const tokens = response.data.tokens || {
    access: response.data.access,
    refresh: response.data.refresh
  };

  if (tokens.access && tokens.refresh) {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    // Set cookie for middleware
    document.cookie = `auth-token=${tokens.access}; path=/; max-age=86400; SameSite=Lax`;
  }

  return response.data;
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  // Remove cookie
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

// Récupérer l'utilisateur connecté
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me/');
  return response.data;
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('access_token');
};

export const getRoleRoute = (role: User['role']): string => {
  const routes = {
    'ADMIN': '/administrateur',
    'RECEPTIONIST': '/receptioniste',
    'MEMBER': '/utilisateur',
  };
  return routes[role];
};

/*
Explications :
Interfaces TypeScript :

Définissent la structure des données
User : Structure d'un utilisateur
RegisterData : Données nécessaires pour l'inscription
LoginData : Données pour la connexion
AuthResponse : Réponse de l'API (flexible pour register et login)

Fonction register :

Envoie une requête POST à /auth/register/
Si la réponse contient des tokens, les sauvegarde dans localStorage
Retourne les données (utilisateur + tokens)

Fonction login :

Envoie username + password à /auth/login/
Sauvegarde les tokens reçus
Retourne la réponse

Fonction logout :

Supprime simplement les tokens du localStorage
L'utilisateur n'est plus authentifié

Fonction getCurrentUser :

Appelle /auth/me/ (endpoint protégé)
Le token est ajouté automatiquement par l'interceptor
Retourne les infos de l'utilisateur connecté

Fonction isAuthenticated :

Vérifie si un access token existe
!! convertit en booléen (true si token existe, false sinon)
*/