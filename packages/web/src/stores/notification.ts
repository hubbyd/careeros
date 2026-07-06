import { create } from 'zustand';
import apiClient from '@/api/client';

interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  content: string;
  isRead: number;
  metadata?: string;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  getNotifications: () => Promise<void>;
  getUnreadCount: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  getNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<Notification[]>('/notifications');
      set({ notifications: response.data, isLoading: false });
    } catch {
      set({ error: '获取通知失败', isLoading: false });
    }
  },

  getUnreadCount: async () => {
    try {
      const response = await apiClient.get<{ count: number }>('/notifications/unread/count');
      set({ unreadCount: response.data.count });
    } catch {
      set({ unreadCount: 0 });
    }
  },

  markAsRead: async (id) => {
    try {
      await apiClient.post(`/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: 1 } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch {
      set({ error: '标记为已读失败' });
    }
  },

  markAllAsRead: async () => {
    try {
      await apiClient.post('/notifications/read-all');
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: 1 })),
        unreadCount: 0,
      }));
    } catch {
      set({ error: '全部标记为已读失败' });
    }
  },

  deleteNotification: async (id) => {
    try {
      await apiClient.delete(`/notifications/${id}`);
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    } catch {
      set({ error: '删除通知失败' });
    }
  },
}));