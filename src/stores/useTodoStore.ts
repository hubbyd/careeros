import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import { todoApi } from '../api'
import type { Todo } from '../types'

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  getTodayTodos: () => Todo[];
}

const today = new Date().toISOString().slice(0, 10)

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      loading: false,
      fetchTodos: async () => {
        set({ loading: true })
        try {
          const data = await todoApi.list()
          set({ todos: data, loading: false })
        } catch {
          set({ loading: false })
        }
      },
      addTodo: async (title) => {
        const newTodo: Todo = { id: uuid(), title, completed: false, date: today, createdAt: Date.now() }
        set((state) => ({ todos: [...state.todos, newTodo] }))
        try {
          const created = await todoApi.create(title, today)
          set((state) => ({
            todos: state.todos.map(t => t.id === newTodo.id ? { ...t, id: created.id } : t)
          }))
        } catch {
          set((state) => ({ todos: state.todos.filter(t => t.id !== newTodo.id) }))
        }
      },
      toggleTodo: async (id) => {
        const todo = get().todos.find(t => t.id === id)
        if (!todo) return
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        }))
        try {
          await todoApi.toggle(id)
        } catch {
          set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
          }))
        }
      },
      removeTodo: async (id) => {
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }))
        try {
          await todoApi.delete(id)
        } catch {
          const todo = get().todos.find(t => t.id === id)
          if (todo) {
            set((state) => ({ todos: [...state.todos, todo] }))
          }
        }
      },
      getTodayTodos: () => get().todos.filter((t) => t.date === today),
    }),
    { name: 'jobsprint-todos' },
  ),
)