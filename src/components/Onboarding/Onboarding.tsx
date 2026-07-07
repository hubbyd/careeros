import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { authApi } from '../../api'
import { RocketIcon, TargetIcon, BookIcon, MessageIcon, FileIcon } from '../../components/Icons'
import styles from './Onboarding.module.css'

const steps = [
  {
    icon: <RocketIcon size={48} />,
    title: '欢迎来到 JobSprint',
    description: '一站式求职冲刺平台，助你高效拿到心仪 Offer！',
    color: '#6366F1',
  },
  {
    icon: <TargetIcon size={48} />,
    title: '职业诊断',
    description: '通过 AI 分析你的技能和兴趣，为你推荐最适合的职业方向。',
    color: '#8B5CF6',
  },
  {
    icon: <BookIcon size={48} />,
    title: '学习计划',
    description: '制定个性化学习路线，追踪学习进度，稳步提升竞争力。',
    color: '#EC4899',
  },
  {
    icon: <MessageIcon size={48} />,
    title: '模拟面试',
    description: 'AI 面试官随时陪练，帮你提前适应面试场景。',
    color: '#F43F5E',
  },
  {
    icon: <FileIcon size={48} />,
    title: '简历优化',
    description: 'AI 智能分析简历，提供专业优化建议，让你的简历脱颖而出。',
    color: '#F59E0B',
  },
]

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setOnboarded = useUserStore((s) => s.setOnboarded)

  const handleComplete = async () => {
    setLoading(true)
    try {
      await authApi.updateOnboarded(true)
      setOnboarded(true)
      navigate('/career')
    } catch {
      setOnboarded(true)
      navigate('/career')
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = async () => {
    setLoading(true)
    try {
      await authApi.updateOnboarded(true)
      setOnboarded(true)
      navigate('/career')
    } catch {
      setOnboarded(true)
      navigate('/career')
    } finally {
      setLoading(false)
    }
  }

  const current = steps[currentStep]

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        {steps.map((_, index) => (
          <div
            key={index}
            className={`${styles.progressDot} ${index === currentStep ? styles.active : index < currentStep ? styles.completed : ''}`}
            style={{ backgroundColor: index === currentStep ? current.color : undefined }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.icon} style={{ background: `linear-gradient(135deg, ${current.color}33 0%, ${current.color}11 100%)` }}>
          <span style={{ color: current.color }}>{current.icon}</span>
        </div>
        
        <h2 className={styles.title}>{current.title}</h2>
        <p className={styles.description}>{current.description}</p>
      </div>

      <div className={styles.buttons}>
        {currentStep === 0 && (
          <button className={styles.skipBtn} onClick={handleSkip} disabled={loading}>
            {loading ? '处理中...' : '跳过'}
          </button>
        )}
        
        {currentStep < steps.length - 1 ? (
          <button className={styles.nextBtn} onClick={() => setCurrentStep(currentStep + 1)} disabled={loading}>
            下一步
          </button>
        ) : (
          <button className={styles.startBtn} onClick={handleComplete} disabled={loading}>
            {loading ? '处理中...' : '开始使用'}
          </button>
        )}
      </div>
    </div>
  )
}