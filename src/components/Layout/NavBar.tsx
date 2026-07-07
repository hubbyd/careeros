import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { HomeIcon, TargetIcon, KanbanIcon, AiIcon, InterviewIcon, LearningIcon, ProfileIcon, RocketIcon } from '../../components/Icons'
import styles from './NavBar.module.css'

type NavIcon = React.ReactNode

const navItems: { path: string; label: string; icon: NavIcon }[] = [
  { path: '/', label: '首页', icon: <HomeIcon size={20} /> },
  { path: '/career', label: '职业诊断', icon: <TargetIcon size={20} /> },
  { path: '/kanban', label: '求职看板', icon: <KanbanIcon size={20} /> },
  { path: '/ai', label: 'AI助手', icon: <AiIcon size={20} /> },
  { path: '/interview', label: '模拟面试', icon: <InterviewIcon size={20} /> },
  { path: '/learning', label: '学习计划', icon: <LearningIcon size={20} /> },
  { path: '/profile', label: '个人中心', icon: <ProfileIcon size={20} /> },
]

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const profile = useUserStore((s) => s.profile)
  const logout = useUserStore((s) => s.logout)

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.navContainer}>
        <div className={styles.logoSection} onClick={() => navigate('/')}>
          <RocketIcon size={24} className={styles.logoIcon} />
          <span className={styles.logoText}>JobSprint</span>
        </div>

        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.userSection}>
          {profile && (
            <>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{profile.name}</span>
                {profile.title && (
                  <span className={styles.userTitle}>{profile.title}</span>
                )}
              </div>
              <button className={styles.avatarBtn} onClick={() => navigate('/profile')}>
                {profile.avatar && profile.avatar.startsWith('data:image') ? (
                  <img src={profile.avatar} alt="头像" className={styles.userAvatar} />
                ) : (
                  <ProfileIcon size={32} className={styles.avatarPlaceholder} />
                )}
              </button>
              <button className={styles.logoutBtn} onClick={logout}>
                退出
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}