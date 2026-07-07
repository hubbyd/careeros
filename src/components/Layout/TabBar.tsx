import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { useStudyStore } from '../../stores/useStudyStore'
import { HomeIcon, KanbanIcon, AiIcon, InterviewIcon, ProfileIcon } from '../../components/Icons'
import styles from './TabBar.module.css'

type TabIcon = React.ReactNode

const tabs: { path: string; label: string; icon: TabIcon }[] = [
  { path: '/', label: '首页', icon: <HomeIcon size={24} /> },
  { path: '/kanban', label: '求职', icon: <KanbanIcon size={24} /> },
  { path: '/ai', label: 'AI助手', icon: <AiIcon size={24} /> },
  { path: '/interview', label: '面试', icon: <InterviewIcon size={24} /> },
  { path: '/profile', label: '我的', icon: <ProfileIcon size={24} /> },
]

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
          {tab.path === '/ai' && (
            <span className={styles.aiBadge}>NEW</span>
          )}
        </button>
      ))}
    </nav>
  )
}