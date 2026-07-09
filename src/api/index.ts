// API 客户端 - 统一处理所有 HTTP 请求
const isProduction = import.meta.env.PROD
const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export const getApiBase = () => API_BASE

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

async function requestWithRetry<T>(endpoint: string, options: RequestInit = {}, retries: number = 3, delay: number = 2000): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 60000)

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      let errorMessage = `HTTP错误 ${res.status}`
      try {
        const errorData = await res.json()
        errorMessage = errorData.error || errorMessage
      } catch {
        errorMessage = res.statusText || errorMessage
      }
      
      if (res.status === 401) {
        throw new Error('登录已过期，请重新登录')
      }
      
      throw new Error(errorMessage)
    }

    try {
      const data = await res.json()
      return data
    } catch (parseError) {
      console.error('JSON解析失败:', parseError)
      throw new Error('服务器响应格式错误，请稍后重试')
    }
  } catch (error: any) {
    clearTimeout(timeoutId)
    
    if (error.name === 'AbortError') {
      if (retries > 0) {
        console.log(`请求超时，重试第 ${4 - retries} 次...`)
        await new Promise(r => setTimeout(r, delay))
        return requestWithRetry(endpoint, options, retries - 1, delay * 1.5)
      }
      throw new Error('请求超时，服务可能正在启动中，请稍后重试')
    }
    
    if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('ERR_CONNECTION_CLOSED')) {
      if (retries > 0) {
        console.log(`网络错误，重试第 ${4 - retries} 次...`)
        await new Promise(r => setTimeout(r, delay))
        return requestWithRetry(endpoint, options, retries - 1, delay * 1.5)
      }
      throw new Error('网络连接失败，请检查网络后重试')
    }
    
    console.error(`API请求失败 [${endpoint}]:`, error)
    throw error
  }
}

// 通用请求方法 - 增强错误处理、超时机制和重试逻辑
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return requestWithRetry(endpoint, options, 3, 2000)
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

  updateMe: (data: any) =>
    request<any>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  uploadAvatar: (image: string) =>
    request<any>('/auth/me/avatar', {
      method: 'POST',
      body: JSON.stringify({ image }),
    }),

  forgotPassword: (email: string) =>
    request<any>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    request<any>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),

  updateOnboarded: (onboarded: boolean) =>
    request<any>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify({ onboarded }),
    }),
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

  createSession: (jobTitle: string, company?: string, level?: string, questionCount: number = 5) =>
    request<any>('/interview/sessions', {
      method: 'POST',
      body: JSON.stringify({ jobTitle, company, level, questionCount }),
    }),

  getSessionQuestions: (sessionId: string) => request<any>(`/interview/sessions/${sessionId}`),

  createQuestion: (sessionId: string) =>
    request<any>(`/interview/sessions/${sessionId}/questions`, {
      method: 'POST',
    }),

  submitAnswer: (questionId: string, answer: string) =>
    request<any>(`/interview/questions/${questionId}/answer`, {
      method: 'POST',
      body: JSON.stringify({ answer }),
    }),

  getReport: (sessionId: string) => request<any>(`/interview/sessions/${sessionId}/report`),

  endSession: (sessionId: string) =>
    request<any>(`/interview/sessions/${sessionId}/end`, {
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

// AI API
export const aiApi = {
  models: () => request<any[]>('/ai/models'),

  chat: (messages: any[], model?: any) =>
    request<any>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, model }),
    }),

  chatStream: (messages: any[], model?: any): Promise<Response> => {
    const token = getToken()
    return fetch(`${API_BASE}/ai/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ messages, model }),
    })
  },
}
