import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import type { Todo } from '../types'

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  getTodayTodos: () => Todo[];
}

const today = new Date().toISOString().slice(0, 10)

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [
        { id: '1', title: '完成 React 性能优化学习', completed: false, date: today, createdAt: Date.now() },
        { id: '2', title: '投递 3 份岗位', completed: false, date: today, createdAt: Date.now() },
        { id: '3', title: '刷 20 道算法题', completed: true, date: today, createdAt: Date.now() },
        { id: '4', title: '复习 HTTP 缓存机制', completed: false, date: today, createdAt: Date.now() },
      ],
      addTodo: (title) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: uuid(), title, completed: false, date: today, createdAt: Date.now() },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
      getTodayTodos: () => get().todos.filter((t) => t.date === today),
    }),
    { name: 'jobsprint-todos' },
  ),
)
