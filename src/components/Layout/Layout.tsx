import { Outlet } from 'react-router-dom'
import TabBar from './TabBar'
import NavBar from './NavBar'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <NavBar />

      <main className={styles.pageContent}>
        <Outlet />
      </main>

      <TabBar />
    </div>
  )
}
