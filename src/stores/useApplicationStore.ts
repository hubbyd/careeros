import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import { applicationApi } from '../api'
import type { JobApplication, AppStatus } from '../types'

interface ApplicationStore {
  applications: JobApplication[];
  loading: boolean;
  fetchApplications: () => Promise<void>;
  addApplication: (app: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStatus: (id: string, status: AppStatus) => void;
  updateProgress: (id: string, progress: number) => void;
  removeApplication: (id: string) => void;
  getByStatus: (status: AppStatus) => JobApplication[];
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      applications: [],
      loading: false,
      fetchApplications: async () => {
        set({ loading: true })
        try {
          const data = await applicationApi.list()
          set({ applications: data, loading: false })
        } catch {
          set({ loading: false })
        }
      },
      addApplication: async (app) => {
        const newApp: JobApplication = { ...app, id: uuid(), createdAt: Date.now(), updatedAt: Date.now() }
        set((state) => ({ applications: [...state.applications, newApp] }))
        try {
          const created = await applicationApi.create(app)
          set((state) => ({
            applications: state.applications.map(a => a.id === newApp.id ? { ...a, id: created.id } : a)
          }))
        } catch {
          set((state) => ({ applications: state.applications.filter(a => a.id !== newApp.id) }))
        }
      },
      updateStatus: async (id, status) => {
        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === id ? { ...a, status, updatedAt: Date.now() } : a
          ),
        }))
        try {
          await applicationApi.updateStatus(id, status)
        } catch {
          const app = get().applications.find(a => a.id === id)
          if (app) {
            set((state) => ({
              applications: state.applications.map((a) =>
                a.id === id ? { ...a, status: app.status } : a
              ),
            }))
          }
        }
      },
      updateProgress: (id, progress) =>
        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === id ? { ...a, progress, updatedAt: Date.now() } : a
          ),
        })),
      removeApplication: async (id) => {
        const app = get().applications.find(a => a.id === id)
        set((state) => ({ applications: state.applications.filter((a) => a.id !== id) }))
        try {
          await applicationApi.delete(id)
        } catch {
          if (app) {
            set((state) => ({ applications: [...state.applications, app] }))
          }
        }
      },
      getByStatus: (status) => get().applications.filter((a) => a.status === status),
    }),
    { name: 'jobsprint-applications' },
  ),
)