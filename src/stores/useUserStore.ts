import { create } from 'zustand'
import { authApi, setToken, removeToken } from '../api'
import type { UserProfile } from '../types'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt?: string
  onboarded?: boolean
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  onboarded: boolean
  completedCareerTest: boolean

  profile: UserProfile | null

  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  clearError: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
  setOnboarded: (onboarded: boolean) => void
  setCompletedCareerTest: (completed: boolean) => void
}

export const useUserStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  token: localStorage.getItem('jobsprint_token'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('jobsprint_token'),
  onboarded: false,
  completedCareerTest: localStorage.getItem('jobsprint_completed_career_test') === 'true',

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      console.log('[登录] 开始登录请求...')
      const data = await authApi.login(email, password)
      console.log('[登录] 登录成功，token已获取')
      setToken(data.token)
      console.log('[登录] 用户信息:', data.user)
      set({
        user: data.user,
        profile: mapUserToProfile(data.user),
        token: data.token,
        isAuthenticated: true,
        onboarded: data.user.onboarded || false,
        completedCareerTest: localStorage.getItem('jobsprint_completed_career_test') === 'true',
        loading: false,
      })
      console.log('[登录] 登录流程完成')
    } catch (err: any) {
      console.error('[登录] 登录失败:', err)
      const errorMessage = err.message || '登录失败，请稍后重试'
      set({ error: errorMessage, loading: false })
      throw err
    }
  },

  register: async (email, password, name) => {
    set({ loading: true, error: null })
    try {
      console.log('[注册] 开始注册请求...')
      const data = await authApi.register(email, password, name)
      console.log('[注册] 注册成功，token已获取')
      setToken(data.token)
      console.log('[注册] 用户信息:', data.user)
      set({
        user: data.user,
        profile: mapUserToProfile(data.user),
        token: data.token,
        isAuthenticated: true,
        onboarded: data.user.onboarded || false,
        completedCareerTest: false,
        loading: false,
      })
      console.log('[注册] 注册流程完成')
    } catch (err: any) {
      console.error('[注册] 注册失败:', err)
      const errorMessage = err.message || '注册失败，请稍后重试'
      set({ error: errorMessage, loading: false })
      throw err
    }
  },

  logout: () => {
    removeToken()
    localStorage.removeItem('jobsprint_completed_career_test')
    set({ user: null, profile: null, token: null, isAuthenticated: false, onboarded: false, completedCareerTest: false })
  },

  checkAuth: async () => {
    const token = get().token
    if (!token) {
      set({ isAuthenticated: false, loading: false, onboarded: false, completedCareerTest: false })
      return
    }

    try {
      set({ loading: true })
      const user = await authApi.getMe()
      set({ 
        user, 
        profile: mapUserToProfile(user), 
        isAuthenticated: true, 
        onboarded: user.onboarded || false,
        completedCareerTest: localStorage.getItem('jobsprint_completed_career_test') === 'true',
        loading: false 
      })
    } catch {
      removeToken()
      localStorage.removeItem('jobsprint_completed_career_test')
      set({ user: null, profile: null, token: null, isAuthenticated: false, onboarded: false, completedCareerTest: false, loading: false })
    }
  },

  clearError: () => set({ error: null }),

  updateProfile: (updates: Partial<UserProfile>) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    }))
  },

  setOnboarded: (onboarded: boolean) => {
    set({ onboarded })
  },

  setCompletedCareerTest: (completed: boolean) => {
    if (completed) {
      localStorage.setItem('jobsprint_completed_career_test', 'true')
    } else {
      localStorage.removeItem('jobsprint_completed_career_test')
    }
    set({ completedCareerTest: completed })
  },
}))

function mapUserToProfile(user: User): UserProfile {
  const avatars = ['👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🎓', '👩‍🎓', '🚀', '💻']
  const hash = user.name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0
  return {
    name: user.name || '',
    title: '求职中',
    avatar: user.avatar || avatars[hash % avatars.length],
    streak: 0,
    joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-CN') : '',
  }
}
