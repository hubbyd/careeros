import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import SimpleLayout from '../components/Layout/SimpleLayout'
import Onboarding from '../components/Onboarding/Onboarding'
import DashboardPage from '../features/dashboard/DashboardPage'
import KanbanPage from '../features/kanban/KanbanPage'
import StudyPage from '../features/study/StudyPage'
import InterviewPage from '../features/interview/InterviewPage'
import ProfilePage from '../features/profile/ProfilePage'
import CareerPage from '../features/career/CareerPage'
import ResumePage from '../features/resume/ResumePage'
import LearningPage from '../features/learning/LearningPage'
import AiChatPage from '../features/ai/AiChatPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import ForgotPasswordPage from '../features/auth/ForgotPasswordPage'
import ResetPasswordPage from '../features/auth/ResetPasswordPage'
import { useUserStore } from '../stores/useUserStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const onboarded = useUserStore((s) => s.onboarded)
  const loading = useUserStore((s) => s.loading)
  
  if (loading) return <div className="flex items-center justify-center min-h-screen">加载中...</div>
  
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!onboarded) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const onboarded = useUserStore((s) => s.onboarded)
  const loading = useUserStore((s) => s.loading)
  
  if (loading) return <div className="flex items-center justify-center min-h-screen">加载中...</div>
  
  if (isAuthenticated) {
    if (!onboarded) return <Navigate to="/onboarding" replace />
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

function OnboardingRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const onboarded = useUserStore((s) => s.onboarded)
  const loading = useUserStore((s) => s.loading)
  
  if (loading) return <div className="flex items-center justify-center min-h-screen">加载中...</div>
  
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (onboarded) return <Navigate to="/" replace />
  return <>{children}</>
}

function CareerRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const onboarded = useUserStore((s) => s.onboarded)
  const loading = useUserStore((s) => s.loading)
  
  if (loading) return <div className="flex items-center justify-center min-h-screen">加载中...</div>
  
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!onboarded) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/onboarding" element={<OnboardingRoute><Onboarding /></OnboardingRoute>} />
      <Route path="/career" element={<CareerRoute><SimpleLayout><CareerPage /></SimpleLayout></CareerRoute>} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="kanban" element={<KanbanPage />} />
        <Route path="study" element={<StudyPage />} />
        <Route path="interview" element={<InterviewPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="learning" element={<LearningPage />} />
        <Route path="ai" element={<AiChatPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
