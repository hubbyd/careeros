// types/todo.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  date: string;   // YYYY-MM-DD
  createdAt: number;
}

// types/application.ts
export type AppStatus = 'pending' | 'applied' | 'test' | 'interview' | 'offer' | 'rejected';
export type Priority = 'high' | 'medium' | 'low';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  salary: string;
  status: AppStatus;
  priority: Priority;
  deadline?: string;
  progress: number;
  notes: string;
  createdAt: number;
  updatedAt: number;
}

// types/study.ts
export interface StudySession {
  id: string;
  date: string;
  minutes: number;
  subject: string;
  completed: boolean;
}

export interface StreakData {
  current: number;
  longest: number;
  lastCheckIn: string;
  calendar: Record<string, boolean>;
}

export interface StudyPlan {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
  date: string;
}

// types/question.ts
export type QuestionCategory = 'tech' | 'behavior' | 'project' | 'algorithm' | 'system';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  title: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  mastered: boolean;
  viewed: number;
  notes: string;
  createdAt: number;
}

// types/career.ts
export interface MentorAnswer {
  major: string;
  education: string;
  cities: string[];
  salary: number;
  skills: string[];
  values: string;
  notes: string;
}

export interface CareerDirection {
  id: string;
  title: string;
  match: number;
  salaryRange: string;
  prospects: string;
  threshold: string;
  pros: string[];
  cons: string[];
  tags: string[];
}

// types/user.ts
export interface UserProfile {
  name: string;
  title: string;
  avatar: string;
  streak: number;
  joinDate: string;
}
