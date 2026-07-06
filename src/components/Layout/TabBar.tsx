import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useStudyStore } from '../../stores/useStudyStore'
import styles from './TabBar.module.css'

const tabs = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/kanban', label: '求职', icon: '📋' },
  { path: '/study', label: '学习', icon: '⏱️' },
  { path: '/interview', label: '面试', icon: '🎤' },
  { path: '/profile', label: '我的', icon: '👤' },
] as const

export default function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const streakCurrent = useStudyStore((s) => s.streak.current)

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab.path}
          className={`${styles.tabItem} ${isActive(tab.path) ? styles.active : ''}`}
          onClick={() => navigate(tab.path)}
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          <span className={styles.tabLabel}>{tab.label}</span>
          {tab.path === '/study' && streakCurrent >= 7 && (
            <span className={styles.streakBadge}>{streakCurrent}</span>
          )}
        </button>
      ))}
    </nav>
  )
}
