import { create } from 'zustand';
import { CareerAssessment } from '@aic/shared';
import apiClient from '@/api/client';

interface CareerState {
  assessments: CareerAssessment[];
  currentAssessment: CareerAssessment | null;
  isLoading: boolean;
  error: string | null;
  getAssessmentRecords: () => Promise<void>;
  createAssessment: (data: { answers: string }) => Promise<CareerAssessment>;
  getDirectionAnalysis: (data: { interests: string; skills: string; education: string }) => Promise<string>;
  getLearningPath: (data: { targetJob: string; currentLevel: string; major: string; studyTime: string }) => Promise<string>;
  getExamAdvice: (data: { examType: string; targetSchool?: string; targetPosition?: string }) => Promise<string>;
  smartAssessment: (data: { userInput: string }) => Promise<string>;
  generateThirtyDayPlan: (data: { targetJob: string; currentLevel: string; skills: string; weaknesses: string }) => Promise<string>;
  getProjectRecommendations: (data: { major: string; skills: string; targetJob: string; currentLevel: string }) => Promise<string>;
  getLeetCodeRecommendations: (data: { targetJob: string; skills: string; weaknesses: string; currentLevel: string }) => Promise<string>;
  getCompetitivenessIndex: (data: { major: string; skills: string; education: string; experience: string; certifications: string; competition: string; projects: string; targetJob: string }) => Promise<string>;
  predictOfferProbability: (data: { major: string; skills: string; education: string; experience: string; targetJob: string; companyType: string; expectedSalary: string; currentLevel: string }) => Promise<string>;
}

export const useCareerStore = create<CareerState>((set) => ({
  assessments: [],
  currentAssessment: null,
  isLoading: false,
  error: null,

  getAssessmentRecords: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<CareerAssessment[]>('/career/assessment-records');
      set({ assessments: response.data, isLoading: false });
    } catch {
      set({ error: '获取评估记录失败', isLoading: false });
    }
  },

  createAssessment: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<CareerAssessment>('/career/assessment', data);
      set({ currentAssessment: response.data, isLoading: false });
      return response.data;
    } catch {
      set({ error: '创建评估失败', isLoading: false });
      throw new Error('创建评估失败');
    }
  },

  getDirectionAnalysis: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ result: string }>('/career/direction', data);
      set({ isLoading: false });
      return response.data.result;
    } catch {
      set({ error: '获取方向分析失败', isLoading: false });
      throw new Error('获取方向分析失败');
    }
  },

  getLearningPath: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ result: string }>('/career/learning-path', data);
      set({ isLoading: false });
      return response.data.result;
    } catch {
      set({ error: '获取学习路线失败', isLoading: false });
      throw new Error('获取学习路线失败');
    }
  },

  getExamAdvice: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ result: string }>('/career/exam-advice', data);
      set({ isLoading: false });
      return response.data.result;
    } catch {
      set({ error: '获取考试建议失败', isLoading: false });
      throw new Error('获取考试建议失败');
    }
  },

  smartAssessment: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ resultData: string }>('/career/smart-assessment', data);
      set({ isLoading: false });
      return response.data.resultData;
    } catch {
      set({ error: '智能评估失败', isLoading: false });
      throw new Error('智能评估失败');
    }
  },

  generateThirtyDayPlan: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ resultData: string }>('/career/thirty-day-plan', data);
      set({ isLoading: false });
      return response.data.resultData;
    } catch {
      set({ error: '生成30天计划失败', isLoading: false });
      throw new Error('生成30天计划失败');
    }
  },

  getProjectRecommendations: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ resultData: string }>('/career/project-recommendations', data);
      set({ isLoading: false });
      return response.data.resultData;
    } catch {
      set({ error: '获取项目推荐失败', isLoading: false });
      throw new Error('获取项目推荐失败');
    }
  },

  getLeetCodeRecommendations: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ resultData: string }>('/career/leetcode-recommendations', data);
      set({ isLoading: false });
      return response.data.resultData;
    } catch {
      set({ error: '获取LeetCode推荐失败', isLoading: false });
      throw new Error('获取LeetCode推荐失败');
    }
  },

  getCompetitivenessIndex: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ resultData: string }>('/career/competitiveness-index', data);
      set({ isLoading: false });
      return response.data.resultData;
    } catch {
      set({ error: '获取竞争力指数失败', isLoading: false });
      throw new Error('获取竞争力指数失败');
    }
  },

  predictOfferProbability: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<{ resultData: string }>('/career/offer-probability', data);
      set({ isLoading: false });
      return response.data.resultData;
    } catch {
      set({ error: '预测Offer概率失败', isLoading: false });
      throw new Error('预测Offer概率失败');
    }
  },
}));