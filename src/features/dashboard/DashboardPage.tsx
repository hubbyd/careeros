import { useTodoStore } from '../../stores/useTodoStore'
import { useUserStore } from '../../stores/useUserStore'
import { useStudyStore } from '../../stores/useStudyStore'
import { useApplicationStore } from '../../stores/useApplicationStore'
import styles from './DashboardPage.module.css'

const quotes = [
  '今天的努力，是明天 Offer 的底气 💪',
  '每一次投递，都离梦想更近一步 🚀',
  '算法题不会？刷！面试紧张？练！🔥',
  '你比昨天的自己更强，这就够了 ⭐',
  '大厂不是终点，成长才是永恒 🌱',
]

export default function DashboardPage() {
  const todayTodos = useTodoStore((s) => s.getTodayTodos())
  const toggleTodo = useTodoStore((s) => s.toggleTodo)
  const profile = useUserStore((s) => s.profile)
  const streak = useStudyStore((s) => s.streak)
  const applications = useApplicationStore((s) => s.applications)
  const quote = quotes[Math.floor(Date.now() / 86400000) % quotes.length]

  const completedTodos = todayTodos.filter((t) => t.completed).length
  const todoRate = todayTodos.length > 0 ? Math.round((completedTodos / todayTodos.length) * 100) : 0

  const activeApps = applications.filter((a) => !['offer', 'rejected'].includes(a.status)).length
  const totalStudyMinutes = 186 // mock

  return (
    <div className={styles.page}>
      {/* Hero 激励卡 */}
      <section className={styles.heroCard}>
        <div className={styles.heroBg1} />
        <div className={styles.heroBg2} />
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <div>
              <div className={styles.heroGreeting}>Hi，{profile.name.split('').pop()} 👋</div>
              <div className={styles.heroSub}>今天也要冲鸭！</div>
            </div>
            <div className={styles.streakBadge}>
              <span className={styles.fire}>🔥</span>
              <span className={styles.streakNum}>{streak.current}</span>
              <span className={styles.streakLabel}>天</span>
            </div>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNum}>{activeApps}</div>
              <div className={styles.statLabel}>进行中</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statNum}>{todoRate}%</div>
              <div className={styles.statLabel}>任务完成</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statNum}>{Math.round(totalStudyMinutes / 60)}h</div>
              <div className={styles.statLabel}>本周学习</div>
            </div>
          </div>
        </div>
      </section>

      {/* 快捷入口 */}
      <section className={styles.quickGrid}>
        {[
          { emoji: '📋', label: '求职看板', to: '/kanban' },
          { emoji: '⏱️', label: '学习打卡', to: '/study' },
          { emoji: '🎤', label: '模拟面试', to: '/interview' },
          { emoji: '👨🏫', label: '职业咨询', to: '/career' },
        ].map((q) => (
          <a key={q.to} href={q.to} className={styles.quickItem}>
            <div className={styles.quickIcon}>{q.emoji}</div>
            <div className={styles.quickLabel}>{q.label}</div>
          </a>
        ))}
      </section>

      {/* 今日待办 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📌 今日待办</h3>
        <div className={styles.todoList}>
          {todayTodos.length === 0 && (
            <div className={styles.empty}>今天没有任务，享受自由时光 ✨</div>
          )}
          {todayTodos.map((todo) => (
            <label key={todo.id} className={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className={styles.todoCheck}
              />
              <span className={`${styles.todoTitle} ${todo.completed ? styles.todoDone : ''}`}>
                {todo.title}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* 本周进度 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📊 本周进度</h3>
        <div className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <span>任务完成率</span>
            <span className={styles.progressPct}>{todoRate}%</span>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${todoRate}%` }} />
          </div>
          <div className={styles.progressHeader} style={{ marginTop: 16 }}>
            <span>投递进度</span>
            <span className={styles.progressPct}>
              {applications.filter((a) => a.status !== 'pending').length}/{applications.length}
            </span>
          </div>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{
                width: `${applications.length > 0 ? Math.round(applications.filter((a) => a.status !== 'pending').length / applications.length * 100) : 0}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* 每日金句 */}
      <section className={styles.section}>
        <div className={styles.quoteCard}>
          <span className={styles.quoteIcon}>💡</span>
          <p className={styles.quoteText}>{quote}</p>
        </div>
      </section>
    </div>
  )
}
