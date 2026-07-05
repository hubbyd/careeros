import { Outlet, useNavigate } from 'react-router-dom'
import TabBar from './TabBar'
import { useUserStore } from '../../stores/useUserStore'
import styles from './Layout.module.css'

export default function Layout() {
  const user = useUserStore((s) => s.user)
  const logout = useUserStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.logo}>🚀 求职冲刺</span>
        <div className={styles.headerRight}>
          {user && <span className={styles.userName}>{user.name}</span>}
          <button onClick={handleLogout} className={styles.logoutBtn}>退出</button>
        </div>
      </header>
      <main className={styles.pageContent}>
        <Outlet />
      </main>
      <TabBar />
    </div>
  )
}
