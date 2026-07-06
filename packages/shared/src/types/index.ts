export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  avatarUrl?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface CareerAssessment {
  id: number;
  userId: number;
  assessmentType: string;
  score: number | null;
  result: string;
  createdAt: string;
}

export interface Resume {
  id: number;
  userId: number;
  fileName: string;
  filePath: string;
  parsedContent: string;
  analysisResult?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewSession {
  id: number;
  userId: number;
  jobTitle: string;
  level: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestion {
  id: number;
  sessionId: number;
  question: string;
  answer?: string;
  evaluation?: string;
  score?: number;
  order: number;
  createdAt: string;
}

export interface LearningPlan {
  id: number;
  userId: number;
  title: string;
  description: string;
  content: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface GrowthRecord {
  id: number;
  userId: number;
  planId: number;
  type: string;
  content: string;
  completedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}