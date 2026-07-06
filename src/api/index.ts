// API 客户端 - 统一处理所有 HTTP 请求
const isProduction = import.meta.env.PROD
const API_BASE = isProduction 
  ? 'https://careeros-zvfg.onrender.com/api' 
  : (import.meta.env.VITE_API_URL || 'http://localhost:3002/api')

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

  diagnosis: (data: { skills: any[]; interests: string[]; personality: any[]; education: string; major: string; experience?: string }) =>
    request<any>('/career/diagnosis', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

// Resume API
export const resumeApi = {
  list: () => request<any[]>('/resume'),

  get: (id: string) => request<any>(`/resume/${id}`),

  analyze: (content: string, targetJob?: string) =>
    request<any>('/resume/analyze', {
      method: 'POST',
      body: JSON.stringify({ content, targetJob }),
    }),

  optimize: (content: string, targetJob?: string, resumeId?: string) =>
    request<any>('/resume/optimize', {
      method: 'POST',
      body: JSON.stringify({ content, targetJob, resumeId }),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/resume/${id}`, { method: 'DELETE' }),
}

// Interview API
export const interviewApi = {
  sessions: () => request<any[]>('/interview/sessions'),

  getSession: (id: string) => request<any>(`/interview/sessions/${id}`),

  createSession: (jobTitle: string, company?: string) =>
    request<any>('/interview/sessions', {
      method: 'POST',
      body: JSON.stringify({ jobTitle, company }),
    }),

  answer: (sessionId: string, question: string, answer: string, questionType?: string) =>
    request<any>(`/interview/sessions/${sessionId}/answer`, {
      method: 'POST',
      body: JSON.stringify({ question, answer, questionType }),
    }),

  finish: (sessionId: string) =>
    request<any>(`/interview/sessions/${sessionId}/finish`, {
      method: 'POST',
    }),

  deleteSession: (id: string) =>
    request<{ message: string }>(`/interview/sessions/${id}`, { method: 'DELETE' }),
}

// Learning API
export const learningApi = {
  plans: () => request<any[]>('/learning/plans'),

  getPlan: (id: string) => request<any>(`/learning/plans/${id}`),

  createPlan: (targetJob: string, timeline?: string, currentSkills?: string[]) =>
    request<any>('/learning/plans', {
      method: 'POST',
      body: JSON.stringify({ targetJob, timeline, currentSkills }),
    }),

  updatePlan: (id: string, progress?: number, tasks?: any[]) =>
    request<any>(`/learning/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ progress, tasks }),
    }),

  deletePlan: (id: string) =>
    request<{ message: string }>(`/learning/plans/${id}`, { method: 'DELETE' }),
}

// Growth API
export const growthApi = {
  records: () => request<any[]>('/growth/records'),

  createRecord: (type: string, content: any) =>
    request<any>('/growth/records', {
      method: 'POST',
      body: JSON.stringify({ type, content }),
    }),

  deleteRecord: (id: string) =>
    request<{ message: string }>(`/growth/records/${id}`, { method: 'DELETE' }),
}
