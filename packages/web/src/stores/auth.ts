import { create } from 'zustand';
import { User, LoginResponse, STORAGE_KEYS } from '@aic/shared';
import apiClient from '@/api/client';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
      const { access_token, user } = response.data;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: '登录失败，请检查邮箱和密码', isLoading: false });
      throw error;
    }
  },

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<LoginResponse>('/auth/register', {
        username,
        email,
        password,
      });
      const { access_token, user } = response.data;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: '注册失败，请重试', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  },

  setUser: (user: User) => {
    set({ user });
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
  },

  fetchUser: async () => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await apiClient.get<User>('/auth/me');
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(response.data));
      set({ user: response.data, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));