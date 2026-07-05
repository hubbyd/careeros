// API 客户端 - 统一处理所有 HTTP 请求
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3002/api'

export interface ApiError {
  error: string
}

// 获取 JWT Token
function getToken(): string | null {
  return localStorage.getItem('jobsprint_token')
}

// 设置 JWT Token
export function setToken(token: string) {
  localStorage.setItem('jobsprint_token', token)
}

// 移除 JWT Token
export function removeToken() {
  localStorage.removeItem('jobsprint_token')
}

// 通用请求方法
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || '请求失败')
  }

  return data
}

// Auth API
export const authApi = {
  register: (email: string, password: string, name: string) =>
    request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request<any>('/auth/me'),
}

// Todos API
export const todoApi = {
  list: (date?: string) =>
    request<any[]>(`/todos${date ? `?date=${date}` : ''}`),

  create: (content: string, date?: string) =>
    request<any>('/todos', {
      method: 'POST',
      body: JSON.stringify({ content, date }),
    }),

  toggle: (id: string) =>
    request<any>(`/todos/${id}/toggle`, { method: 'PATCH' }),

  delete: (id: string) =>
    request<{ success: boolean }>(`/todos/${id}`, { method: 'DELETE' }),
}

// Applications API
export const applicationApi = {
  list: (status?: string) =>
    request<any[]>(`/applications${status ? `?status=${status}` : ''}`),

  create: (data: any) =>
    request<any>('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: string) =>
    request<any>(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  update: (id: string, data: any) =>
    request<any>(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ success: boolean }>(`/applications/${id}`, { method: 'DELETE' }),
}

// Study API
export const studyApi = {
  list: (date?: string, month?: string) =>
    request<any[]>(`/study${date ? `?date=${date}` : ''}${month ? `?month=${month}` : ''}`),

  checkin: (data: any) =>
    request<any>('/study/checkin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  streak: () => request<any>('/study/streak'),
}

// Questions API
export const questionApi = {
  list: (category?: string) =>
    request<any[]>(`/questions${category ? `?category=${category}` : ''}`),

  create: (data: any) =>
    request<any>('/questions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  toggleMaster: (id: string) =>
    request<any>(`/questions/${id}/master`, { method: 'PATCH' }),

  delete: (id: string) =>
    request<{ success: boolean }>(`/questions/${id}`, { method: 'DELETE' }),

  stats: () => request<any>('/questions/stats'),
}

// Career API
export const careerApi = {
  get: () => request<any>('/career'),

  submit: (data: any) =>
    request<any>('/career', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}
