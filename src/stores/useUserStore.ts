import { create } from 'zustand'
import { authApi, setToken, removeToken } from '../api'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean

  // 兼容旧代码：profile 返回 user 对象
  profile: User | null

  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useUserStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null, // 兼容旧代码
  token: localStorage.getItem('jobsprint_token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('jobsprint_token'),

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const data = await authApi.login(email, password)
      setToken(data.token)
      set({
        user: data.user,
        profile: data.user, // 兼容旧代码
        token: data.token,
        isAuthenticated: true,
        loading: false,
      })
    } catch (err: any) {
      set({ error: err.message || '登录失败', loading: false })
      throw err
    }
  },

  register: async (email, password, name) => {
    set({ loading: true, error: null })
    try {
      const data = await authApi.register(email, password, name)
      setToken(data.token)
      set({
        user: data.user,
        profile: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      })
    } catch (err: any) {
      set({ error: err.message || '注册失败', loading: false })
      throw err
    }
  },

  logout: () => {
    removeToken()
    set({ user: null, token: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    const token = get().token
    if (!token) {
      set({ isAuthenticated: false, loading: false })
      return
    }

    try {
      set({ loading: true })
      const user = await authApi.getMe()
      set({ user, profile: user, isAuthenticated: true, loading: false })
    } catch {
      removeToken()
      set({ user: null, profile: null, token: null, isAuthenticated: false, loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
