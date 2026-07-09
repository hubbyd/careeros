import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import { studyApi } from '../api'
import type { StreakData, StudyPlan, StudySession } from '../types'

const today = new Date().toISOString().slice(0, 10)

interface StudyStore {
  streak: StreakData;
  sessions: StudySession[];
  plans: StudyPlan[];
  loading: boolean;
  fetchStreak: () => Promise<void>;
  fetchSessions: () => Promise<void>;
  checkIn: () => void;
  addSession: (session: Omit<StudySession, 'id'>) => void;
  togglePlan: (id: string) => void;
  addPlan: (title: string, subject: string) => void;
  deletePlan: (id: string) => void;
  addStudyMinutes: (minutes: number) => void;
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set, get) => ({
      streak: {
        current: 0,
        longest: 0,
        lastCheckIn: '',
        calendar: {},
      },
      sessions: [],
      plans: [],
      loading: false,
      fetchStreak: async () => {
        try {
          const data = await studyApi.streak()
          set({ streak: data })
        } catch {}
      },
      fetchSessions: async () => {
        set({ loading: true })
        try {
          const data = await studyApi.list()
          set({ sessions: data, loading: false })
        } catch {
          set({ loading: false })
        }
      },
      checkIn: async () => {
        const state = get()
        if (state.streak.lastCheckIn === today) return
        try {
          const data = await studyApi.checkin({ date: today, minutes: 30 })
          set({ streak: data })
        } catch {}
        set((state) => {
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
        })
      },
      addSession: async (session) => {
        const newSession: StudySession = { ...session, id: uuid() }
        set((state) => ({ sessions: [...state.sessions, newSession] }))
      },
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
      deletePlan: (id) =>
        set((state) => ({
          plans: state.plans.filter((p) => p.id !== id),
        })),
      addStudyMinutes: async (minutes) => {
        set((state) => {
          const todaySession = state.sessions.find(s => s.date === today)
          if (todaySession) {
            return {
              sessions: state.sessions.map(s => 
                s.date === today ? { ...s, minutes: s.minutes + minutes } : s
              ),
            }
          } else {
            const newSession: StudySession = { 
              id: uuid(), 
              date: today, 
              minutes,
              subject: '学习',
              completed: true
            }
            return {
              sessions: [...state.sessions, newSession],
            }
          }
        })
        try {
          await studyApi.checkin({ date: today, minutes })
        } catch {}
      },
    }),
    { name: 'jobsprint-study' },
  ),
)