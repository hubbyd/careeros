import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import DashboardPage from '../features/dashboard/DashboardPage'
import KanbanPage from '../features/kanban/KanbanPage'
import StudyPage from '../features/study/StudyPage'
import InterviewPage from '../features/interview/InterviewPage'
import ProfilePage from '../features/profile/ProfilePage'
import CareerPage from '../features/career/CareerPage'
import ResumePage from '../features/resume/ResumePage'
import LearningPage from '../features/learning/LearningPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import { useUserStore } from '../stores/useUserStore'

// 保护路由 - 未登录则跳转登录页
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

// 公开路由 - 已登录则跳转首页
function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="kanban" element={<KanbanPage />} />
        <Route path="study" element={<StudyPage />} />
        <Route path="interview" element={<InterviewPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="career" element={<CareerPage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="learning" element={<LearningPage />} />
      </Route>
    </Routes>
  )
}
