import { useState, useEffect, useRef } from 'react'
import { useStudyStore } from '../../stores/useStudyStore'
import { useQuestionStore } from '../../stores/useQuestionStore'
import { useUserStore } from '../../stores/useUserStore'
import ProgressRing from '../../components/ProgressRing/ProgressRing'
import Button from '../../components/Button/Button'
import Tag from '../../components/Tag/Tag'
import { subjects, subjectColors, subjectIcons } from '../../constants/subjects'
import { PlusIcon, CalendarIcon, TrendingUpIcon, ChevronRightIcon, ClockIcon, TargetIcon, AwardIcon, BookOpenIcon, TrashIcon, PlayIcon, PauseIcon, RotateCcwIcon } from '../../components/Icons'
import styles from './StudyPage.module.css'

export default function StudyPage() {
  const streak = useStudyStore((s) => s.streak)
  const plans = useStudyStore((s) => s.plans)
  const sessions = useStudyStore((s) => s.sessions)
  const togglePlan = useStudyStore((s) => s.togglePlan)
  const addPlan = useStudyStore((s) => s.addPlan)
  const deletePlan = useStudyStore((s) => s.deletePlan)
  const addStudyMinutes = useStudyStore((s) => s.addStudyMinutes)
  const checkIn = useStudyStore((s) => s.checkIn)
  const fetchStreak = useStudyStore((s) => s.fetchStreak)
  const fetchSessions = useStudyStore((s) => s.fetchSessions)
  const user = useUserStore((s) => s.user)
  
  const [pomodoroOpen, setPomodoroOpen] = useState(false)
  const [showAddPlan, setShowAddPlan] = useState(false)
  const [newPlanTitle, setNewPlanTitle] = useState('')
  const [newPlanSubject, setNewPlanSubject] = useState('')
  const [activeTab, setActiveTab] = useState<'today' | 'all' | 'stats'>('today')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  useEffect(() => {
    fetchStreak()
    fetchSessions()
  }, [])

  const today = new Date().toISOString().slice(0, 10)
  const todayPlans = plans.filter((p) => p.date === today)
  const completedPlans = plans.filter((p) => p.completed).length
  const todayCompleted = todayPlans.filter((p) => p.completed).length
  const todayMinutes = sessions.filter((s) => s.date === today).reduce((sum, s) => sum + s.minutes, 0)
  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0)

  const handleAddPlan = () => {
    if (newPlanTitle.trim()) {
      addPlan(newPlanTitle.trim(), newPlanSubject || '未分类')
      setNewPlanTitle('')
      setNewPlanSubject('')
      setShowAddPlan(false)
    }
  }

  const getSubjectStats = (subject: string) => {
    const questions = useQuestionStore.getState().questions
    const subQuestions = questions.filter((q) => q.category === subject.toLowerCase() || q.title.includes(subject))
    const mastered = subQuestions.filter((q) => q.mastered).length
    const pct = subQuestions.length > 0 ? Math.round((mastered / subQuestions.length) * 100) : 0
    return { count: subQuestions.length, mastered, pct }
  }

  const unlockedBadges = [
    { emoji: '🔥', label: '连续7天', condition: streak.current >= 7 },
    { emoji: '📚', label: '刷题50', condition: useQuestionStore.getState().questions.filter(q => q.mastered).length >= 50 },
    { emoji: '🎯', label: '连续打卡', condition: streak.current >= 3 },
    { emoji: '⭐', label: '学习达人', condition: totalMinutes >= 500 },
    { emoji: '🌟', label: '连续30天', condition: streak.current >= 30 },
    { emoji: '💎', label: '全能选手', condition: subjects.every(s => getSubjectStats(s).pct >= 80) },
    { emoji: '🎖️', label: '百日冲刺', condition: streak.longest >= 100 },
    { emoji: '🏅', label: '坚持不懈', condition: streak.current >= 14 },
  ]

  const getWeeklyData = () => {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const now = new Date()
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().slice(0, 10)
      const dayMinutes = sessions.filter(s => s.date === dateStr).reduce((sum, s) => sum + s.minutes, 0)
      data.push({ day: days[date.getDay()], minutes: dayMinutes })
    }
    return data
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <div>
            <div className={styles.streakNum}>🔥 {streak.current}</div>
            <div className={styles.streakLabel}>连续打卡天</div>
          </div>
          <button className={styles.checkInBtn} onClick={checkIn}>
            ✅ 打卡
          </button>
        </div>
        <div className={styles.streakSub}>
          最长记录 {streak.longest} 天，继续加油！
        </div>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <ClockIcon size={16} />
            <span>{todayMinutes}分钟</span>
          </div>
          <div className={styles.heroStat}>
            <BookOpenIcon size={16} />
            <span>{completedPlans}计划完成</span>
          </div>
          <div className={styles.heroStat}>
            <TargetIcon size={16} />
            <span>{totalMinutes}分钟累计</span>
          </div>
        </div>
      </section>

      <section className={styles.pomoCard} onClick={() => setPomodoroOpen(true)}>
        <div className={styles.pomoLeft}>
          <div className={styles.pomoIcon}>⏱️</div>
          <div>
            <div className={styles.pomoTitle}>番茄钟</div>
            <div className={styles.pomoSub}>专注 25 分钟</div>
          </div>
        </div>
        <div className={styles.pomoArrow}>→</div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>📚 学习计划</h3>
          <div className={styles.tabBar}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'today' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('today')}
            >
              今日
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('all')}
            >
              全部
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'stats' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              统计
            </button>
          </div>
        </div>

        {activeTab === 'today' && (
          <div>
            <div className={styles.planProgress}>
              <div className={styles.planProgressBarBg}>
                <div
                  className={styles.planProgressBarFill}
                  style={{ width: `${todayPlans.length > 0 ? (todayCompleted / todayPlans.length) * 100 : 0}%` }}
                />
              </div>
              <span className={styles.planProgressText}>{todayCompleted}/{todayPlans.length} 完成</span>
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
                <select
                  className={styles.addPlanSelect}
                  value={newPlanSubject}
                  onChange={(e) => setNewPlanSubject(e.target.value)}
                >
                  <option value="">选择科目</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className={styles.addPlanActions}>
                  <Button size="sm" onClick={handleAddPlan}>确认</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAddPlan(false)}>取消</Button>
                </div>
              </div>
            )}

            <div className={styles.planList}>
              {todayPlans.map((plan) => (
                <label key={plan.id} className={styles.planItem}>
                  <input
                    type="checkbox"
                    checked={plan.completed}
                    onChange={() => togglePlan(plan.id)}
                    className={styles.planCheck}
                  />
                  <span className={`${styles.planTitle} ${plan.completed ? styles.planDone : ''}`}>
                    {plan.title}
                  </span>
                  <Tag color="info">{plan.subject}</Tag>
                  <button className={styles.planDelete} onClick={(e) => { e.preventDefault(); deletePlan(plan.id); }}>
                    <TrashIcon size={14} />
                  </button>
                </label>
              ))}
              {todayPlans.length === 0 && (
                <div className={styles.emptyState}>
                  <CalendarIcon size={32} />
                  <span>暂无今日计划</span>
                </div>
              )}
            </div>

            <Button className={styles.addPlanBtn} onClick={() => setShowAddPlan(!showAddPlan)} icon={<PlusIcon size={16} />}>
              {showAddPlan ? '取消添加' : '+ 添加计划'}
            </Button>
          </div>
        )}

        {activeTab === 'all' && (
          <div className={styles.allPlans}>
            <div className={styles.allPlansSummary}>
              <span>共 {plans.length} 个计划</span>
              <span>{completedPlans} 已完成</span>
            </div>
            <div className={styles.planList}>
              {plans.slice().reverse().map((plan) => (
                <label key={plan.id} className={styles.planItem}>
                  <input
                    type="checkbox"
                    checked={plan.completed}
                    onChange={() => togglePlan(plan.id)}
                    className={styles.planCheck}
                  />
                  <span className={`${styles.planTitle} ${plan.completed ? styles.planDone : ''}`}>
                    {plan.title}
                  </span>
                  <Tag color="info">{plan.subject}</Tag>
                  <span className={styles.planDate}>{plan.date}</span>
                  <button className={styles.planDelete} onClick={(e) => { e.preventDefault(); deletePlan(plan.id); }}>
                    <TrashIcon size={14} />
                  </button>
                </label>
              ))}
              {plans.length === 0 && (
                <div className={styles.emptyState}>
                  <BookOpenIcon size={32} />
                  <span>暂无学习计划</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className={styles.statsSection}>
            <div className={styles.weeklyChart}>
              <h4 className={styles.chartTitle}>📈 本周学习时长</h4>
              <div className={styles.barChart}>
                {getWeeklyData().map((item) => (
                  <div key={item.day} className={styles.barItem}>
                    <div
                      className={styles.bar}
                      style={{ height: `${Math.min(item.minutes / 180 * 100, 100)}%` }}
                    />
                    <span className={styles.barLabel}>{item.day}</span>
                    <span className={styles.barValue}>{item.minutes}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.statsCards}>
              <div className={styles.statCard}>
                <ClockIcon size={24} />
                <div>
                  <div className={styles.statNum}>{totalMinutes}</div>
                  <div className={styles.statLabel}>累计学习(分钟)</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <TrendingUpIcon size={24} />
                <div>
                  <div className={styles.statNum}>{streak.longest}</div>
                  <div className={styles.statLabel}>最长连续打卡</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <BookOpenIcon size={24} />
                <div>
                  <div className={styles.statNum}>{plans.length}</div>
                  <div className={styles.statLabel}>总计划数</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <AwardIcon size={24} />
                <div>
                  <div className={styles.statNum}>{unlockedBadges.filter(b => b.condition).length}</div>
                  <div className={styles.statLabel}>解锁徽章</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>📊 科目掌握度</h3>
        </div>
        <div className={styles.subjectList}>
          {subjects.map((sub: string) => {
            const stats = getSubjectStats(sub)
            return (
              <div
                key={sub}
                className={styles.subjectRow}
                onClick={() => setSelectedSubject(selectedSubject === sub ? null : sub)}
              >
                <span className={styles.subjectIcon}>{subjectIcons[sub]}</span>
                <span className={styles.subjectName}>{sub}</span>
                <div className={styles.subjectBarBg}>
                  <div
                    className={styles.subjectBarFill}
                    style={{ width: `${stats.pct}%`, background: subjectColors[sub] || 'var(--primary)' }}
                  />
                </div>
                <span className={styles.subjectPct}>{stats.pct}%</span>
                <ChevronRightIcon size={16} className={styles.subjectArrow} />
              </div>
            )
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🏆 成就徽章</h3>
        <div className={styles.badgeGrid}>
          {unlockedBadges.map((b) => (
            <div key={b.label} className={`${styles.badgeItem} ${!b.condition ? styles.badgeLocked : ''}`}>
              <div className={styles.badgeEmoji}>{b.condition ? b.emoji : '🔒'}</div>
              <div className={styles.badgeLabel}>{b.label}</div>
              {!b.condition && (
                <div className={styles.badgeProgress}>努力解锁中...</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {selectedSubject && (
        <div className={styles.modalOverlay} onClick={() => setSelectedSubject(null)}>
          <div className={styles.subjectModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📚 {selectedSubject}</h3>
              <button onClick={() => setSelectedSubject(null)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.subjectDetail}>
              <div className={styles.subjectDetailStat}>
                <span>总题数</span>
                <span className={styles.subjectDetailNum}>{getSubjectStats(selectedSubject).count}</span>
              </div>
              <div className={styles.subjectDetailStat}>
                <span>已掌握</span>
                <span className={styles.subjectDetailNum}>{getSubjectStats(selectedSubject).mastered}</span>
              </div>
              <div className={styles.subjectDetailStat}>
                <span>掌握度</span>
                <span className={styles.subjectDetailNum}>{getSubjectStats(selectedSubject).pct}%</span>
              </div>
              <div className={styles.subjectDetailProgress}>
                <div className={styles.subjectDetailBarBg}>
                  <div
                    className={styles.subjectDetailBarFill}
                    style={{
                      width: `${getSubjectStats(selectedSubject).pct}%`,
                      background: subjectColors[selectedSubject] || 'var(--primary)'
                    }}
                  />
                </div>
              </div>
              <Button onClick={() => { setSelectedSubject(null); window.location.href = '/learning' }}>
                开始学习 →
              </Button>
            </div>
          </div>
        </div>
      )}

      {pomodoroOpen && (
        <div className={styles.modalOverlay} onClick={() => setPomodoroOpen(false)}>
          <div className={styles.pomoModal} onClick={(e) => e.stopPropagation()}>
            <PomodoroContent onClose={() => setPomodoroOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

function PomodoroContent({ onClose }: { onClose: () => void }) {
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const addStudyMinutes = useStudyStore((s) => s.addStudyMinutes)

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            setCompleted(true)
            if (mode === 'work') {
              addStudyMinutes(25)
            }
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, seconds, mode, addStudyMinutes])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  const handleStart = () => {
    if (completed) {
      if (mode === 'work') {
        setSeconds(5 * 60)
        setMode('break')
      } else {
        setSeconds(25 * 60)
        setMode('work')
      }
      setCompleted(false)
    }
    setRunning(true)
  }

  const handlePause = () => {
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleReset = () => {
    setSeconds(mode === 'work' ? 25 * 60 : 5 * 60)
    setRunning(false)
    setCompleted(false)
  }

  const handleSwitchMode = () => {
    setMode(mode === 'work' ? 'break' : 'work')
    setSeconds(mode === 'work' ? 5 * 60 : 25 * 60)
    setRunning(false)
    setCompleted(false)
  }

  return (
    <div>
      <div className={styles.modalHeader}>
        <h3>⏱️ {mode === 'work' ? '专注时间' : '休息时间'}</h3>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>
      <div className={styles.timerDisplay}>
        <ProgressRing
          size={180}
          progress={1 - seconds / (mode === 'work' ? 25 * 60 : 5 * 60)}
          color={mode === 'work' ? '#FF6B35' : '#06D6A0'}
        >
          <div className={styles.timerText}>
            {completed ? '🎉' : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`}
          </div>
        </ProgressRing>
      </div>
      {completed && (
        <div className={styles.completedMsg}>
          {mode === 'work' ? '🎉 太棒了！完成了 25 分钟专注！' : '☕ 休息结束，准备开始学习！'}
        </div>
      )}
      <div className={styles.timerBtns}>
        {!completed && !running && (
          <button className={styles.timerBtn} onClick={handleStart}>
            ▶️ {mode === 'work' ? '开始专注' : '开始休息'}
          </button>
        )}
        {!completed && running && (
          <button className={styles.timerBtn} onClick={handlePause}>
            ⏸️ 暂停
          </button>
        )}
        {completed && (
          <button className={styles.timerBtn} onClick={handleStart}>
            {mode === 'work' ? '☕ 休息5分钟' : '🔄 开始新的一轮'}
          </button>
        )}
        <button className={styles.timerBtnSecondary} onClick={handleReset}>
          重置
        </button>
        <button className={styles.timerBtnSecondary} onClick={handleSwitchMode}>
          {mode === 'work' ? '切换休息' : '切换专注'}
        </button>
      </div>
    </div>
  )
}