import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import type { StreakData, StudyPlan, StudySession } from '../types'

const today = new Date().toISOString().slice(0, 10)

interface StudyStore {
  streak: StreakData;
  sessions: StudySession[];
  plans: StudyPlan[];
  checkIn: () => void;
  addSession: (session: Omit<StudySession, 'id'>) => void;
  togglePlan: (id: string) => void;
  addPlan: (title: string, subject: string) => void;
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set, get) => ({
      streak: {
        current: 12,
        longest: 21,
        lastCheckIn: today,
        calendar: Object.fromEntries(
          Array.from({ length: 30 }, (_, i) => {
            const d = new Date()
            d.setDate(d.getDate() - i)
            return [d.toISOString().slice(0, 10), i < 12 && Math.random() > 0.2]
          })
        ),
      },
      sessions: [
        { id: '1', date: today, minutes: 120, subject: 'React', completed: true },
        { id: '2', date: today, minutes: 60, subject: '算法', completed: true },
      ],
      plans: [
        { id: '1', title: 'React Hooks 深度理解', subject: 'React', completed: false, date: today },
        { id: '2', title: 'LeetCode 动态规划专题', subject: '算法', completed: false, date: today },
        { id: '3', title: 'HTTP/3 新特性学习', subject: '网络', completed: true, date: today },
        { id: '4', title: 'CSS Grid 布局实战', subject: 'CSS', completed: false, date: today },
      ],
      checkIn: () =>
        set((state) => {
          const today = new Date().toISOString().slice(0, 10)
          if (state.streak.lastCheckIn === today) return state
          const isConsecutive =
            state.streak.lastCheckIn ===
            new Date(Date.now() - 86400000).toISOString().slice(0, 10)
          return {
            streak: {
              ...state.streak,
              current: isConsecutive ? state.streak.current + 1 : 1,
              longest: Math.max(
                state.streak.longest,
                isConsecutive ? state.streak.current + 1 : 1
              ),
              lastCheckIn: today,
              calendar: { ...state.streak.calendar, [today]: true },
            },
          }
        }),
      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, { ...session, id: uuid() }],
        })),
      togglePlan: (id) =>
        set((state) => ({
          plans: state.plans.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p)),
        })),
      addPlan: (title, subject) =>
        set((state) => ({
          plans: [
            ...state.plans,
            { id: uuid(), title, subject, completed: false, date: today },
          ],
        })),
    }),
    { name: 'jobsprint-study' },
  ),
)
