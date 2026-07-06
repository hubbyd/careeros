import { create } from 'zustand';
import { InterviewSession, InterviewQuestion } from '@aic/shared';
import apiClient from '@/api/client';

interface InterviewState {
  sessions: InterviewSession[];
  currentSession: InterviewSession | null;
  questions: InterviewQuestion[];
  isLoading: boolean;
  error: string | null;
  createSession: (data: { jobTitle: string; level: string }) => Promise<InterviewSession>;
  getSessions: () => Promise<void>;
  getSessionQuestions: (sessionId: number) => Promise<void>;
  submitAnswer: (questionId: number, answer: string) => Promise<InterviewQuestion>;
  getReport: (sessionId: number) => Promise<string>;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  sessions: [],
  currentSession: null,
  questions: [],
  isLoading: false,
  error: null,

  createSession: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<InterviewSession>('/interview/sessions', data);
      set({ currentSession: response.data, isLoading: false });
      return response.data;
    } catch {
      set({ error: '创建面试会话失败', isLoading: false });
      throw new Error('创建面试会话失败');
    }
  },

  getSessions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<InterviewSession[]>('/interview/sessions');
      set({ sessions: response.data, isLoading: false });
    } catch {
      set({ error: '获取面试会话失败', isLoading: false });
    }
  },

  getSessionQuestions: async (sessionId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<InterviewQuestion[]>(`/interview/questions?sessionId=${sessionId}`);
      set({ questions: response.data, isLoading: false });
    } catch {
      set({ error: '获取面试问题失败', isLoading: false });
    }
  },

  submitAnswer: async (questionId, answer) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<InterviewQuestion>(`/interview/questions/${questionId}/answer`, { answer });
      set((state) => ({
        questions: state.questions.map((q) => (q.id === questionId ? response.data : q)),
        isLoading: false,
      }));
      return response.data;
    } catch {
      set({ error: '提交答案失败', isLoading: false });
      throw new Error('提交答案失败');
    }
  },

  getReport: async (sessionId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<{ report: string }>(`/interview/sessions/${sessionId}/report`);
      set({ isLoading: false });
      return response.data.report;
    } catch {
      set({ error: '获取面试报告失败', isLoading: false });
      throw new Error('获取面试报告失败');
    }
  },
}));