import { create } from 'zustand';
import apiClient from '@/api/client';

interface ChatMessage {
  id: number;
  sessionId: number;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface ChatSession {
  id: number;
  userId: number;
  chatType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  AiChatMessage?: ChatMessage[];
}

interface AiChatState {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  createSession: () => Promise<ChatSession>;
  getSessions: () => Promise<void>;
  getMessages: (sessionId: number) => Promise<void>;
  sendMessage: (sessionId: number, content: string) => Promise<void>;
  deleteSession: (id: number) => Promise<void>;
  setCurrentSession: (session: ChatSession) => void;
  clearMessages: () => void;
}

export const useAiChatStore = create<AiChatState>((set) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  isLoading: false,
  isTyping: false,
  error: null,

  createSession: async () => {
    try {
      const response = await apiClient.post<ChatSession>('/ai-chat/session', { chatType: 'general' });
      set((state) => ({
        sessions: [response.data, ...state.sessions],
        currentSession: response.data,
        messages: [],
      }));
      return response.data;
    } catch {
      set({ error: '创建会话失败' });
      throw new Error('创建会话失败');
    }
  },

  getSessions: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<ChatSession[]>('/ai-chat/sessions');
      set({ sessions: response.data, isLoading: false });
    } catch {
      set({ sessions: [], isLoading: false, error: '获取会话列表失败' });
    }
  },

  getMessages: async (sessionId) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<ChatMessage[]>(`/ai-chat/session/${sessionId}/messages`);
      set({ messages: response.data, isLoading: false });
    } catch {
      set({ messages: [], isLoading: false, error: '获取消息失败' });
    }
  },

  sendMessage: async (sessionId, content) => {
    if (!content.trim()) return;

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now(),
          sessionId,
          role: 'user',
          content,
          createdAt: new Date().toISOString(),
        },
      ],
      isTyping: true,
    }));

    try {
      const response = await apiClient.post<ChatMessage>(`/ai-chat/session/${sessionId}/message`, { content });
      set((state) => ({
        messages: [...state.messages, response.data],
        isTyping: false,
      }));
    } catch {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: Date.now() + 1,
            sessionId,
            role: 'assistant',
            content: '抱歉，我暂时无法回复，请稍后再试。',
            createdAt: new Date().toISOString(),
          },
        ],
        isTyping: false,
      }));
    }
  },

  deleteSession: async (id) => {
    try {
      await apiClient.delete(`/ai-chat/session/${id}`);
      set((state) => ({
        sessions: state.sessions.filter((s) => s.id !== id),
        currentSession: state.currentSession?.id === id ? null : state.currentSession,
        messages: state.currentSession?.id === id ? [] : state.messages,
      }));
    } catch {
      set({ error: '删除会话失败' });
    }
  },

  setCurrentSession: (session) => {
    set({ currentSession: session, messages: [] });
  },

  clearMessages: () => {
    set({ messages: [] });
  },
}));