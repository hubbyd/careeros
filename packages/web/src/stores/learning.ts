import { create } from 'zustand';
import { LearningPlan, GrowthRecord } from '@aic/shared';
import apiClient from '@/api/client';

interface LearningState {
  plans: LearningPlan[];
  currentPlan: LearningPlan | null;
  growthRecords: GrowthRecord[];
  isLoading: boolean;
  error: string | null;
  generatePlan: (data: { targetJob: string; currentLevel: string; studyTime: string }) => Promise<LearningPlan>;
  getPlans: () => Promise<void>;
  getPlanById: (id: number) => Promise<LearningPlan>;
  updateProgress: (id: number, progress: number) => Promise<LearningPlan>;
  addGrowthRecord: (data: { planId: number; type: string; content: string }) => Promise<GrowthRecord>;
  getGrowthRecords: (planId?: number) => Promise<void>;
}

export const useLearningStore = create<LearningState>((set) => ({
  plans: [],
  currentPlan: null,
  growthRecords: [],
  isLoading: false,
  error: null,

  generatePlan: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<LearningPlan>('/learning/plans/generate', data);
      set({ currentPlan: response.data, isLoading: false });
      return response.data;
    } catch {
      set({ error: '生成学习计划失败', isLoading: false });
      throw new Error('生成学习计划失败');
    }
  },

  getPlans: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<LearningPlan[]>('/learning/plans');
      set({ plans: response.data, isLoading: false });
    } catch {
      set({ error: '获取学习计划失败', isLoading: false });
    }
  },

  getPlanById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<LearningPlan>(`/learning/plans/${id}`);
      set({ currentPlan: response.data, isLoading: false });
      return response.data;
    } catch {
      set({ error: '获取学习计划详情失败', isLoading: false });
      throw new Error('获取学习计划详情失败');
    }
  },

  updateProgress: async (id, progress) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.put<LearningPlan>(`/learning/plans/${id}/progress`, { progress });
      set((state) => ({
        plans: state.plans.map((p) => (p.id === id ? response.data : p)),
        currentPlan: state.currentPlan?.id === id ? response.data : state.currentPlan,
        isLoading: false,
      }));
      return response.data;
    } catch {
      set({ error: '更新进度失败', isLoading: false });
      throw new Error('更新进度失败');
    }
  },

  addGrowthRecord: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<GrowthRecord>('/learning/growth', data);
      set((state) => ({
        growthRecords: [response.data, ...state.growthRecords],
        isLoading: false,
      }));
      return response.data;
    } catch {
      set({ error: '添加成长记录失败', isLoading: false });
      throw new Error('添加成长记录失败');
    }
  },

  getGrowthRecords: async (planId) => {
    set({ isLoading: true, error: null });
    try {
      const url = planId ? `/learning/growth?planId=${planId}` : '/learning/growth';
      const response = await apiClient.get<GrowthRecord[]>(url);
      set({ growthRecords: response.data, isLoading: false });
    } catch {
      set({ error: '获取成长记录失败', isLoading: false });
    }
  },
}));