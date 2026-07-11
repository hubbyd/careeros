import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodoStore } from '../../stores/useTodoStore'
import { useUserStore } from '../../stores/useUserStore'
import { useStudyStore } from '../../stores/useStudyStore'
import { useApplicationStore } from '../../stores/useApplicationStore'
import { useGreeting } from '../../hooks/useGreeting'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Tag from '../../components/Tag/Tag'
import { ProfileIcon, TargetIcon, BookIcon, MessageIcon, FileIcon, CheckIcon, ClockIcon, BriefcaseIcon, ZapIcon, PlusIcon, TrendingUpIcon, CalendarIcon, AwardIcon, ChevronRightIcon } from '../../components/Icons'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const { todos, addTodo, toggleTodo, removeTodo, fetchTodos } = useTodoStore()
  const { user } = useUserStore()
  const { plans, streak, sessions, fetchStreak, fetchSessions, togglePlan, addPlan } = useStudyStore()
  const { applications, fetchApplications } = useApplicationStore()
  const greeting = useGreeting()
  const navigate = useNavigate()
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [newPlanTitle, setNewPlanTitle] = useState('')
  const [newPlanSubject, setNewPlanSubject] = useState('')
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [showAddPlan, setShowAddPlan] = useState(false)

  useEffect(() => {
    fetchTodos()
    fetchStreak()
    fetchSessions()
    fetchApplications()
  }, [])

  const pendingTodos = todos.filter(t => !t.completed)
  const completedPlans = plans.filter(p => p.completed).length
  const today = new Date().toISOString().slice(0, 10)
  const todayPlans = plans.filter(p => p.date === today)
  const todayCompletedPlans = todayPlans.filter(p => p.completed).length
  const todayMinutes = sessions.filter(s => s.date === today).reduce((sum, s) => sum + s.minutes, 0)
  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0)

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle.trim())
      setNewTodoTitle('')
      setShowAddTodo(false)
    }
  }

  const handleAddPlan = () => {
    if (newPlanTitle.trim()) {
      addPlan({ title: newPlanTitle.trim(), subject: newPlanSubject || '未分类' })
      setNewPlanTitle('')
      setNewPlanSubject('')
      setShowAddPlan(false)
    }
  }

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
              <Button size="sm" onClick={() => setShowAddTodo(!showAddTodo)} icon={<PlusIcon size={16} />}>+ 添加</Button>
            </div>
            {showAddTodo && (
              <div className={styles.addTodoForm}>
                <input
                  type="text"
                  className={styles.addTodoInput}
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  placeholder="输入待办事项..."
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                />
                <div className={styles.addTodoActions}>
                  <Button size="sm" onClick={handleAddTodo}>确认</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAddTodo(false)}>取消</Button>
                </div>
              </div>
            )}
            {pendingTodos.length === 0 ? (
              <div className={styles.emptyState}>
                <CheckIcon size={32} className={styles.emptyIcon} />
                <span>今日暂无待办，真棒！</span>
              </div>
            ) : (
              <ul className={styles.todoList}>
                {pendingTodos.slice(0, 5).map(todo => (
                  <li key={todo.id} className={styles.todoItem}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      className={styles.todoCheckbox}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span className={styles.todoText}>{todo.title}</span>
                    <button className={styles.todoDelete} onClick={() => removeTodo(todo.id)}>×</button>
                  </li>
                ))}
                {pendingTodos.length > 5 && (
                  <li className={styles.todoMore}>
                    <span>还有 {pendingTodos.length - 5} 项待办...</span>
                  </li>
                )}
              </ul>
            )}
          </Card>

          <Card className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <CalendarIcon size={20} className={styles.sectionIcon} />
                今日计划
              </h2>
              <Button size="sm" onClick={() => setShowAddPlan(!showAddPlan)} icon={<PlusIcon size={16} />}>+ 添加</Button>
            </div>
            {showAddPlan && (
              <div className={styles.addPlanForm}>
                <input
                  type="text"
                  className={styles.addPlanInput}
                  value={newPlanTitle}
                  onChange={(e) => setNewPlanTitle(e.target.value)}
                  placeholder="输入计划标题..."
                  autoFocus
                />
                <input
                  type="text"
                  className={styles.addPlanInput}
                  value={newPlanSubject}
                  onChange={(e) => setNewPlanSubject(e.target.value)}
                  placeholder="科目（可选）..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlan()}
                />
                <div className={styles.addPlanActions}>
                  <Button size="sm" onClick={handleAddPlan}>确认</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAddPlan(false)}>取消</Button>
                </div>
              </div>
            )}
            <div className={styles.planProgress}>
              <ProgressBar progress={todayPlans.length > 0 ? Math.round((todayCompletedPlans / todayPlans.length) * 100) : 0} size="md" />
              <span className={styles.planProgressText}>{todayCompletedPlans}/{todayPlans.length} 已完成</span>
            </div>
            <ul className={styles.planList}>
              {todayPlans.slice(0, 4).map(plan => (
                <li key={plan.id} className={styles.planItem}>
                  <input
                    type="checkbox"
                    checked={plan.completed}
                    className={styles.planCheckbox}
                    onChange={() => togglePlan(plan.id)}
                  />
                  <span className={styles.planTitle}>{plan.title}</span>
                  <Tag color="info">{plan.subject}</Tag>
                </li>
              ))}
              {todayPlans.length === 0 && (
                <div className={styles.emptyState}>
                  <CalendarIcon size={32} className={styles.emptyIcon} />
                  <span>暂无今日计划，添加一个吧！</span>
                </div>
              )}
            </ul>
          </Card>

          <Card className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <TrendingUpIcon size={20} className={styles.sectionIcon} />
                学习统计
              </h2>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <ZapIcon size={24} className={styles.statIcon} />
                <div className={styles.statData}>
                  <span className={styles.statNum}>{streak.current}</span>
                  <span className={styles.statLabel}>连续打卡</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <ClockIcon size={24} className={styles.statIcon} />
                <div className={styles.statData}>
                  <span className={styles.statNum}>{todayMinutes}</span>
                  <span className={styles.statLabel}>今日学习(分钟)</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <BookIcon size={24} className={styles.statIcon} />
                <div className={styles.statData}>
                  <span className={styles.statNum}>{totalMinutes}</span>
                  <span className={styles.statLabel}>累计学习(分钟)</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <AwardIcon size={24} className={styles.statIcon} />
                <div className={styles.statData}>
                  <span className={styles.statNum}>{completedPlans}</span>
                  <span className={styles.statLabel}>已完成计划</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.rightPanel}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <BriefcaseIcon size={20} className={styles.sectionIcon} />
                最近申请
              </h2>
              <button className={styles.viewAll} onClick={() => window.location.href = '/kanban'}>
                查看全部 <ChevronRightIcon size={16} />
              </button>
            </div>
            {applications.length === 0 ? (
              <div className={styles.emptyState}>
                <BriefcaseIcon size={32} className={styles.emptyIcon} />
                <span>还没有求职申请</span>
              </div>
            ) : (
              <div className={styles.appList}>
                {applications.slice(0, 4).map(app => {
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
              <button className={styles.shortcutBtn} onClick={() => navigate('/career')}>
                <TargetIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>职业诊断</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => navigate('/learning')}>
                <BookIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>学习路线</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => navigate('/interview')}>
                <MessageIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>模拟面试</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => navigate('/resume')}>
                <FileIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>简历优化</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => navigate('/study')}>
                <TrendingUpIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>学习计划</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => navigate('/ai')}>
                <MessageIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>AI助手</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => navigate('/profile')}>
                <ProfileIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>个人中心</span>
              </button>
              <button className={styles.shortcutBtn} onClick={() => navigate('/kanban')}>
                <BriefcaseIcon size={28} className={styles.shortcutIcon} />
                <span className={styles.shortcutLabel}>求职看板</span>
              </button>
            </div>
          </Card>

          <Card className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <BookIcon size={20} className={styles.sectionIcon} />
                学习计划概览
              </h2>
              <button className={styles.viewAll} onClick={() => window.location.href = '/study'}>
                查看全部 <ChevronRightIcon size={16} />
              </button>
            </div>
            <div className={styles.planProgress}>
              <ProgressBar progress={plans.length > 0 ? Math.round((completedPlans / plans.length) * 100) : 0} size="md" />
              <span className={styles.planProgressText}>{completedPlans}/{plans.length} 已完成</span>
            </div>
            <ul className={styles.planList}>
              {plans.slice(0, 3).map(plan => (
                <li key={plan.id} className={styles.planItem}>
                  <input
                    type="checkbox"
                    checked={plan.completed}
                    className={styles.planCheckbox}
                    onChange={() => togglePlan(plan.id)}
                  />
                  <span className={styles.planTitle}>{plan.title}</span>
                  <Tag color="info">{plan.subject}</Tag>
                </li>
              ))}
              {plans.length === 0 && (
                <div className={styles.emptyState}>
                  <BookIcon size={32} className={styles.emptyIcon} />
                  <span>暂无学习计划</span>
                </div>
              )}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}