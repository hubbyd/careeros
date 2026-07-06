import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotificationPage, AiChatPage, AdminPage, HomePage, CareerPage, ResumePage, InterviewPage, LearningPage, ProfilePage } from '@/pages';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { useAuthStore } from '@/stores/auth';
import { useCareerStore } from '@/stores/career';
import { useResumeStore } from '@/stores/resume';
import { useInterviewStore } from '@/stores/interview';
import { useLearningStore } from '@/stores/learning';

const ONBOARDING_COMPLETED_KEY = 'careeros_onboarding_completed';

function App() {
  const { fetchUser } = useAuthStore();
  const { getAssessmentRecords } = useCareerStore();
  const { getResumes } = useResumeStore();
  const { getSessions } = useInterviewStore();
  const { getPlans } = useLearningStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const { user } = useAuthStore.getState();
    if (user) {
      getAssessmentRecords();
      getResumes();
      getSessions();
      getPlans();

      const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [getAssessmentRecords, getResumes, getSessions, getPlans]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    setShowOnboarding(false);
  };

  return (
    <>
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
        <Route path="/ai-chat" element={<ProtectedRoute><AiChatPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/career" element={<ProtectedRoute><CareerPage /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><ResumePage /></ProtectedRoute>} />
        <Route path="/interview" element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute><LearningPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;