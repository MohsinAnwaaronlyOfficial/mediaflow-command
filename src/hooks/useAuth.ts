import { create } from 'zustand';
import { authApi } from '@/api/auth';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  isAuthenticated: () => boolean;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: sessionStorage.getItem('umf_token'),
  loading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const res = await authApi.login(username, password);
      const { token, user } = res.data;
      sessionStorage.setItem('umf_token', token);
      set({ user, token, loading: false });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      set({ error: message, loading: false });
      return false;
    }
  },

  logout: () => {
    sessionStorage.removeItem('umf_token');
    set({ user: null, token: null });
    window.location.href = '/login';
  },

  checkAuth: async () => {
    const token = sessionStorage.getItem('umf_token');
    if (!token) return;
    try {
      const res = await authApi.me();
      set({ user: res.data, token });
    } catch {
      sessionStorage.removeItem('umf_token');
      set({ user: null, token: null });
    }
  },

  isAuthenticated: () => !!get().token,
}));
