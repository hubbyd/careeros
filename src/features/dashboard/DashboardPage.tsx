import { useEffect } from 'react'
import { useTodoStore } from '../../stores/useTodoStore'
import { useUserStore } from '../../stores/useUserStore'
import { useStudyStore } from '../../stores/useStudyStore'
import { useApplicationStore } from '../../stores/useApplicationStore'
import { useGreeting } from '../../hooks/useGreeting'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Tag from '../../components/Tag/Tag'
import { ProfileIcon, TargetIcon, BookIcon, MessageIcon, FileIcon, CheckIcon, ClockIcon, BriefcaseIcon, ZapIcon, PlusIcon } from '../../components/Icons'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const { todos, addTodo, fetchTodos } = useTodoStore()
  const { user } = useUserStore()
  const { plans, streak, sessions, fetchStreak, fetchSessions } = useStudyStore()
  const { applications, fetchApplications } = useApplicationStore()
  const greeting = useGreeting()

  useEffect(() => {
    fetchTodos()
    fetchStreak()
    fetchSessions()
    fetchApplications()
  }, [])

  const pendingTodos = todos.filter(t => !t.completed)
  const completedPlans = plans.filter(p => p.completed).length
  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0)

  const getStatusTag = (status: string): { color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple'; label: string } => {
    switch (status) {
      case 'offer': return { color: 'success', label: 'Offer' }
      case 'interview': return { color: 'warning', label: '面试中' }
      case 'test': return { color: 'info', label: '测试中' }
      case 'applied': return { color: 'primary', label: '已投递' }
      case 'rejected': return { color: 'danger', label: '已拒绝' }
      default: return { color: 'info', label: '待处理' }
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.greeting}>{greeting}，{user?.name || '同学'}</h1>
          <p className={styles.date}>{new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className={styles.headerAvatar}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className={styles.avatar} />
          ) : (
            <ProfileIcon size={48} className={styles.avatarPlaceholder} />
          )}
        </div>
      </div>

      <div className={styles.quickStats}>
        <Card className={styles.statCard}>
          <ClockIcon size={28} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{pendingTodos.length}</span>
            <span className={styles.statLabel}>待办事项</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <ZapIcon size={28} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{streak.current}</span>
            <span className={styles.statLabel}>连续打卡</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <BriefcaseIcon size={28} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{applications.length}</span>
            <span className={styles.statLabel}>求职申请</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <BookIcon size={28} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{totalMinutes}</span>
            <span className={styles.statLabel}>今日学习(分钟)</span>
          </div>
        </Card>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <FileIcon size={20} className={styles.sectionIcon} />
                今日待办
              </h2>
              <Button size="sm" onClick={() => addTodo('新任务')} icon={<PlusIcon size={16} />}>+ 添加</Button>
            </div>
            {pendingTodos.length === 0 ? (
              <div className={styles.emptyState}>
                <CheckIcon size={32} className={styles.emptyIcon} />
                <span>今日暂无待办，真棒！</span>
              </div>
            ) : (
              <ul className={styles.todoList}>
                {pendingTodos.slice(0, 5).map(todo => (
                  <li key={todo.id} className={styles.todoItem}>
                    <input type="checkbox" checked={todo.completed} className={styles.todoCheckbox} />
                    <span className={styles.todoText}>{todo.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <BookIcon size={20} className={styles.sectionIcon} />
                学习计划
              </h2>
            </div>
            <div className={styles.planProgress}>
              <ProgressBar progress={plans.length > 0 ? Math.round((completedPlans / plans.length) * 100) : 0} size="md" />
              <span className={styles.planProgressText}>{completedPlans}/{plans.length} 已完成</span>
            </div>
            <ul className={styles.planList}>
              {plans.slice(0, 3).map(plan => (
                <li key={plan.id} className={styles.planItem}>
                  <input type="checkbox" checked={plan.completed} className={styles.planCheckbox} />
                  <span className={styles.planTitle}>{plan.title}</span>
                  <Tag color="info">{plan.subject}</Tag>
                </li>
              ))}
              {plans.length === 0 && (
                <div className={styles.emptyState}>
                  <FileIcon size={32} className={styles.emptyIcon} />
                  <span>暂无学习计划</span>
                </div>
              )}
            </ul>
          </Card>
        </div>

        <div className={styles.rightPanel}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <BriefcaseIcon size={20} className={styles.sectionIcon} />
                最近申请
              </h2>
            </div>
            {applications.length === 0 ? (
              <div className={styles.emptyState}>
                <BriefcaseIcon size={32} className={styles.emptyIcon} />
                <span>还没有求职申请</span>
              </div>
            ) : (
              <div className={styles.appList}>
                {applications.slice(0, 3).map(app => {
                  const statusInfo = getStatusTag(app.status)
                  return (
                    <div key={app.id} className={styles.appItem}>
                      <div className={styles.appInfo}>
                        <h4 className={styles.appCompany}>{app.company}</h4>
                        <span className={styles.appPosition}>{app.position}</span>
                      </div>
                      <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>

          <Card className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <TargetIcon size={20} className={styles.sectionIcon} />
                快捷入口
              </h2>
            </div>
            <div className={styles.shortcutGrid}>
              <button className={styles.shortcutBtn} onClick={() => window.location.href = '/career'}>
                <TargetIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>职业诊断</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => window.location.href = '/learning'}>
                <BookIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>学习路线</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => window.location.href = '/interview'}>
                <MessageIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>模拟面试</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => window.location.href = '/resume'}>
                <FileIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>简历优化</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}