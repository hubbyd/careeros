import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import type { JobApplication, AppStatus } from '../types'

interface ApplicationStore {
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStatus: (id: string, status: AppStatus) => void;
  updateProgress: (id: string, progress: number) => void;
  removeApplication: (id: string) => void;
  getByStatus: (status: AppStatus) => JobApplication[];
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      applications: [
        {
          id: '1', company: '字节跳动', position: '前端开发工程师', salary: '18-30K',
          status: 'interview', priority: 'high', deadline: '2026-07-20',
          progress: 60, notes: '三轮技术面已完成，等待 HR 面',
          createdAt: Date.now(), updatedAt: Date.now(),
        },
        {
          id: '2', company: '美团', position: 'React 开发', salary: '15-25K',
          status: 'applied', priority: 'medium', deadline: '2026-07-15',
          progress: 30, notes: '简历已投递，等待笔试通知',
          createdAt: Date.now(), updatedAt: Date.now(),
        },
        {
          id: '3', company: '腾讯', position: '前端实习生', salary: '200/天',
          status: 'pending', priority: 'high', deadline: '2026-07-12',
          progress: 10, notes: '需要内推码',
          createdAt: Date.now(), updatedAt: Date.now(),
        },
        {
          id: '4', company: '阿里', position: '全栈开发', salary: '20-35K',
          status: 'offer', priority: 'high', deadline: '',
          progress: 100, notes: 'Offer 已收到，截止日期 7/30',
          createdAt: Date.now(), updatedAt: Date.now(),
        },
        {
          id: '5', company: '小米', position: '前端工程师', salary: '15-22K',
          status: 'rejected', priority: 'low', deadline: '',
          progress: 100, notes: '简历未通过筛选',
          createdAt: Date.now(), updatedAt: Date.now(),
        },
      ],
      addApplication: (app) =>
        set((state) => ({
          applications: [
            ...state.applications,
            { ...app, id: uuid(), createdAt: Date.now(), updatedAt: Date.now() },
          ],
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === id ? { ...a, status, updatedAt: Date.now() } : a
          ),
        })),
      updateProgress: (id, progress) =>
        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === id ? { ...a, progress, updatedAt: Date.now() } : a
          ),
        })),
      removeApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((a) => a.id !== id),
        })),
      getByStatus: (status) => get().applications.filter((a) => a.status === status),
    }),
    { name: 'jobsprint-applications' },
  ),
)
