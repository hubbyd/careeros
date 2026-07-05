import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import type { Question, QuestionCategory } from '../types'

interface QuestionStore {
  questions: Question[];
  toggleMastered: (id: string) => void;
  getByCategory: (cat: QuestionCategory) => Question[];
  getMasteryRate: () => number;
  addQuestion: (q: Omit<Question, 'id' | 'createdAt' | 'viewed'>) => void;
}

const mockQuestions: Question[] = [
  { id: '1', title: 'React useEffect 清理函数何时执行？', category: 'tech', difficulty: 'medium', mastered: true, viewed: 128, notes: '', createdAt: Date.now() },
  { id: '2', title: 'Virtual DOM 的 Diff 算法原理', category: 'tech', difficulty: 'hard', mastered: false, viewed: 89, notes: '', createdAt: Date.now() },
  { id: '3', title: 'CSS BFC 是什么？如何触发？', category: 'tech', difficulty: 'easy', mastered: true, viewed: 203, notes: '', createdAt: Date.now() },
  { id: '4', title: '自我介绍 + 项目经历介绍', category: 'behavior', difficulty: 'easy', mastered: true, viewed: 312, notes: '', createdAt: Date.now() },
  { id: '5', title: '你最大的缺点是什么？', category: 'behavior', difficulty: 'medium', mastered: false, viewed: 267, notes: '', createdAt: Date.now() },
  { id: '6', title: '为什么选择我们公司？', category: 'behavior', difficulty: 'easy', mastered: true, viewed: 198, notes: '', createdAt: Date.now() },
  { id: '7', title: '介绍一个你解决的技术难题', category: 'project', difficulty: 'medium', mastered: false, viewed: 156, notes: '', createdAt: Date.now() },
  { id: '8', title: '项目中遇到的最大挑战', category: 'project', difficulty: 'medium', mastered: true, viewed: 178, notes: '', createdAt: Date.now() },
  { id: '9', title: '两数之和（LeetCode 1）', category: 'algorithm', difficulty: 'easy', mastered: true, viewed: 456, notes: '', createdAt: Date.now() },
  { id: '10', title: 'LRU 缓存（LeetCode 146）', category: 'algorithm', difficulty: 'hard', mastered: false, viewed: 234, notes: '', createdAt: Date.now() },
  { id: '11', title: '微服务 vs 单体架构', category: 'system', difficulty: 'medium', mastered: false, viewed: 145, notes: '', createdAt: Date.now() },
  { id: '12', title: 'RESTful API 设计原则', category: 'system', difficulty: 'easy', mastered: true, viewed: 289, notes: '', createdAt: Date.now() },
]

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set, get) => ({
      questions: mockQuestions,
      toggleMastered: (id) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, mastered: !q.mastered } : q
          ),
        })),
      getByCategory: (cat) => get().questions.filter((q) => q.category === cat),
      getMasteryRate: () => {
        const qs = get().questions
        if (qs.length === 0) return 0
        return Math.round((qs.filter((q) => q.mastered).length / qs.length) * 100)
      },
      addQuestion: (q) =>
        set((state) => ({
          questions: [...state.questions, { ...q, id: uuid(), createdAt: Date.now(), viewed: 0 }],
        })),
    }),
    { name: 'jobsprint-questions' },
  ),
)
