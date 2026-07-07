import TabBar from './TabBar'
import NavBar from './NavBar'
import styles from './Layout.module.css'

interface SimpleLayoutProps {
  children: React.ReactNode
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.pageContent}>
        {children}
      </main>
      <TabBar />
    </div>
  )
}