export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  createdAt: number;
}

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

export interface StudySession {
  id: string;
  date: string;
  minutes: number;
  subject: string;
  completed: boolean;
  pomodoroCount?: number;
}

export interface StreakData {
  current: number;
  longest: number;
  lastCheckIn: string;
  calendar: Record<string, boolean>;
}

export interface PlanSubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
  date: string;
  priority?: 'high' | 'medium' | 'low';
  dueDate?: string;
  recurring?: boolean;
  subtasks?: PlanSubtask[];
}

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

export interface UserProfile {
  name: string;
  title: string;
  avatar: string;
  streak: number;
  joinDate: string;
  createdAt?: string;
  bio?: string;
  location?: string;
  education?: string;
  experience?: string;
  skills?: string[];
}

export interface CareerMatch {
  title: string;
  match: number;
  salaryRange: string;
  prospects: string;
  threshold: string;
  pros: string[];
  cons: string[];
  tags: string[];
}

export interface DiagnosisResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  matches: CareerMatch[];
}

export interface CareerAssessment {
  id: string;
  userId: string;
  major: string;
  education: string;
  cities: string;
  expectedSalary: number;
  skills: string;
  values: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeAnalysis {
  score: number;
  dimensions: { name: string; score: number; comment: string }[];
  suggestions: string[];
}

export interface Resume {
  id: string;
  userId: string;
  content: string;
  targetJob?: string;
  analysisScore: number;
  analysisResult?: string;
  optimizedContent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestion {
  id: string;
  sessionId: string;
  question: string;
  answer?: string;
  evaluation?: string;
  score?: number;
  nextQuestion?: string;
  createdAt: string;
}

export interface InterviewFeedback {
  score: number;
  feedback: string;
  improvements: string[];
  sampleAnswer: string;
}

export interface InterviewReport {
  session: {
    id: string;
    jobTitle: string;
    company: string;
    level: string;
  };
  questions: {
    id: string;
    question: string;
    answer?: string;
    score?: number;
    evaluation?: string;
  }[];
  summary: string;
  averageScore: number;
}

export interface InterviewSession {
  id: string;
  userId: string;
  jobTitle: string;
  company: string;
  level: string;
  status: string;
  questionCount?: number;
  report?: string;
  createdAt: string;
  updatedAt: string;
  interviewQuestions?: InterviewQuestion[];
}

export interface LearningPhase {
  phase: string;
  duration: string;
  objectives: string[];
  tasks: string[];
}

export interface LearningPlanResult {
  phases: LearningPhase[];
  milestones: string[];
  resources: string[];
}

export interface LearningPlan {
  id: string;
  userId: string;
  targetJob: string;
  timeline: string;
  phases: string;
  tasks: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface GrowthRecord {
  id: string;
  userId: string;
  type: string;
  content: string;
  createdAt: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface PersonalityItem {
  trait: string;
  score: number;
}

export interface MentorAnswer {
  [key: string]: any;
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