import { create } from 'zustand';
import { Resume } from '@aic/shared';
import apiClient from '@/api/client';

interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  isLoading: boolean;
  error: string | null;
  uploadResume: (file: File) => Promise<Resume>;
  getResumes: () => Promise<void>;
  analyzeResume: (id: number) => Promise<Resume>;
  deleteResume: (id: number) => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,
  error: null,

  uploadResume: async (file) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post<Resume>('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      set({ currentResume: response.data, isLoading: false });
      return response.data;
    } catch {
      set({ error: '上传简历失败', isLoading: false });
      throw new Error('上传简历失败');
    }
  },

  getResumes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<Resume[]>('/resumes');
      set({ resumes: response.data, isLoading: false });
    } catch {
      set({ error: '获取简历列表失败', isLoading: false });
    }
  },

  analyzeResume: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<Resume>(`/resumes/${id}/analyze`);
      set({ currentResume: response.data, isLoading: false });
      return response.data;
    } catch {
      set({ error: '分析简历失败', isLoading: false });
      throw new Error('分析简历失败');
    }
  },

  deleteResume: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.delete(`/resumes/${id}`);
      set((state) => ({
        resumes: state.resumes.filter((r) => r.id !== id),
        isLoading: false,
      }));
    } catch {
      set({ error: '删除简历失败', isLoading: false });
      throw new Error('删除简历失败');
    }
  },
}));