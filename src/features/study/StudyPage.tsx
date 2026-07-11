import { useState, useEffect, useRef, useCallback } from 'react'
import { useStudyStore } from '../../stores/useStudyStore'
import { useQuestionStore } from '../../stores/useQuestionStore'
import { useUserStore } from '../../stores/useUserStore'
import Button from '../../components/Button/Button'
import Tag from '../../components/Tag/Tag'
import { subjects, subjectColors, subjectIcons } from '../../constants/subjects'
import { PlusIcon, CalendarIcon, TrendingUpIcon, ChevronRightIcon, ClockIcon, TargetIcon, AwardIcon, BookOpenIcon, TrashIcon, PlayIcon, PauseIcon, RotateCcwIcon, CheckIcon, XIcon, AlertCircleIcon, FlameIcon, ZapIcon, CalendarCheckIcon, RepeatIcon, SettingsIcon, Volume2Icon, VolumeXIcon } from '../../components/Icons'
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

  const [pomodoroOpen, setPomodoroOpen] = useState(false)
  const [showAddPlan, setShowAddPlan] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [newPlanTitle, setNewPlanTitle] = useState('')
  const [newPlanSubject, setNewPlanSubject] = useState('')
  const [newPlanPriority, setNewPlanPriority] = useState<'high' | 'medium' | 'low'>('medium')
  const [newPlanDueDate, setNewPlanDueDate] = useState('')
  const [newPlanRecurring, setNewPlanRecurring] = useState(false)
  const [newPlanSubtasks, setNewPlanSubtasks] = useState([''])
  const [activeTab, setActiveTab] = useState<'today' | 'all' | 'stats'>('today')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)
  const [checkingIn, setCheckingIn] = useState(false)
  const [checkInSuccess, setCheckInSuccess] = useState(false)

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
      addPlan({
        title: newPlanTitle.trim(),
        subject: newPlanSubject || '未分类',
        priority: newPlanPriority,
        dueDate: newPlanDueDate || undefined,
        recurring: newPlanRecurring,
        subtasks: newPlanSubtasks.filter(t => t.trim()).map(t => ({ id: Math.random().toString(36).substr(2, 9), title: t.trim(), completed: false })),
      })
      setNewPlanTitle('')
      setNewPlanSubject('')
      setNewPlanPriority('medium')
      setNewPlanDueDate('')
      setNewPlanRecurring(false)
      setNewPlanSubtasks([''])
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
    { emoji: '⚡', label: '番茄新手', condition: sessions.reduce((sum, s) => sum + (s.pomodoroCount || 0), 0) >= 5 },
    { emoji: '🚀', label: '番茄大师', condition: sessions.reduce((sum, s) => sum + (s.pomodoroCount || 0), 0) >= 50 },
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
      const dayPomodoros = sessions.filter(s => s.date === dateStr).reduce((sum, s) => sum + (s.pomodoroCount || 0), 0)
      data.push({ day: days[date.getDay()], minutes: dayMinutes, pomodoros: dayPomodoros, date: dateStr })
    }
    return data
  }

  const getMonthCalendar = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const calendar = []
    
    for (let i = 0; i < firstDay; i++) {
      calendar.push(null)
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      const hasCheckIn = streak.calendar[dateStr]
      const isToday = dateStr === today
      const isFuture = dateStr > today
      calendar.push({ day: i, date: dateStr, hasCheckIn, isToday, isFuture })
    }
    
    return calendar
  }

  const handleCheckIn = async () => {
    if (streak.lastCheckIn === today) return
    setCheckingIn(true)
    await checkIn()
    setCheckingIn(false)
    setCheckInSuccess(true)
    setTimeout(() => setCheckInSuccess(false), 3000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444'
      case 'medium': return '#F59E0B'
      case 'low': return '#10B981'
      default: return '#6B7280'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '高'
      case 'medium': return '中'
      case 'low': return '低'
      default: return '中'
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <div>
            <div className={styles.streakNum}><FlameIcon size={20} /> {streak.current}</div>
            <div className={styles.streakLabel}>连续打卡天</div>
          </div>
          <button 
            className={`${styles.checkInBtn} ${checkingIn ? styles.checkingIn : ''} ${checkInSuccess ? styles.checkInSuccess : ''}`} 
            onClick={handleCheckIn}
            disabled={streak.lastCheckIn === today || checkingIn}
          >
            {checkingIn ? (
              <span className={styles.spinner}></span>
            ) : checkInSuccess ? (
              <>✅ 已打卡</>
            ) : streak.lastCheckIn === today ? (
              <>✅ 今日已打卡</>
            ) : (
              <>📅 今日打卡</>
            )}
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

      <div className={styles.quickActions}>
        <button className={styles.quickActionBtn} onClick={() => setShowCalendar(true)}>
          <CalendarCheckIcon size={20} />
          <span>打卡日历</span>
        </button>
        <button className={styles.quickActionBtn} onClick={() => setPomodoroOpen(true)}>
          <ZapIcon size={20} />
          <span>番茄专注</span>
        </button>
        <button className={styles.quickActionBtn} onClick={() => setShowAddPlan(true)}>
          <PlusIcon size={20} />
          <span>添加计划</span>
        </button>
      </div>

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
                <div className={styles.addPlanRow}>
                  <select
                    className={styles.addPlanSelect}
                    value={newPlanPriority}
                    onChange={(e) => setNewPlanPriority(e.target.value as 'high' | 'medium' | 'low')}
                  >
                    <option value="high">高优先级</option>
                    <option value="medium">中优先级</option>
                    <option value="low">低优先级</option>
                  </select>
                  <input
                    type="date"
                    className={styles.addPlanInput}
                    value={newPlanDueDate}
                    onChange={(e) => setNewPlanDueDate(e.target.value)}
                  />
                </div>
                <div className={styles.addPlanRow}>
                  <label className={styles.addPlanCheckbox}>
                    <input
                      type="checkbox"
                      checked={newPlanRecurring}
                      onChange={(e) => setNewPlanRecurring(e.target.checked)}
                    />
                    <span><RepeatIcon size={14} /> 重复计划</span>
                  </label>
                </div>
                <div className={styles.addPlanSubtasks}>
                  <div className={styles.addPlanSubtasksLabel}>子任务（可选）</div>
                  {newPlanSubtasks.map((subtask, idx) => (
                    <div key={idx} className={styles.addPlanSubtaskRow}>
                      <input
                        type="text"
                        className={styles.addPlanInput}
                        value={subtask}
                        onChange={(e) => {
                          const newSubtasks = [...newPlanSubtasks]
                          newSubtasks[idx] = e.target.value
                          setNewPlanSubtasks(newSubtasks)
                        }}
                        placeholder={`子任务 ${idx + 1}`}
                      />
                      {newPlanSubtasks.length > 1 && (
                        <button 
                          className={styles.addPlanRemoveSubtask}
                          onClick={() => {
                            const newSubtasks = newPlanSubtasks.filter((_, i) => i !== idx)
                            setNewPlanSubtasks(newSubtasks)
                          }}
                        >
                          <XIcon size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    className={styles.addPlanAddSubtask}
                    onClick={() => setNewPlanSubtasks([...newPlanSubtasks, ''])}
                  >
                    <PlusIcon size={14} /> 添加子任务
                  </button>
                </div>
                <div className={styles.addPlanActions}>
                  <Button size="sm" onClick={handleAddPlan}>确认</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAddPlan(false)}>取消</Button>
                </div>
              </div>
            )}

            <div className={styles.planList}>
              {todayPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`${styles.planItem} ${plan.completed ? styles.planDone : ''}`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <input
                    type="checkbox"
                    checked={plan.completed}
                    onChange={(e) => { e.stopPropagation(); togglePlan(plan.id); }}
                    className={styles.planCheck}
                  />
                  <div className={styles.planContent}>
                    <span className={styles.planTitle}>{plan.title}</span>
                    {plan.subtasks && plan.subtasks.length > 0 && (
                      <div className={styles.planSubtasks}>
                        {plan.subtasks.slice(0, 2).map((st) => (
                          <span key={st.id} className={`${styles.planSubtask} ${st.completed ? styles.subtaskDone : ''}`}>
                            {st.completed ? <CheckIcon size={12} /> : <span className={styles.subtaskDot}>•</span>}
                            {st.title}
                          </span>
                        ))}
                        {plan.subtasks.length > 2 && (
                          <span className={styles.planSubtask}>+{plan.subtasks.length - 2} 更多</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className={styles.planMeta}>
                    <Tag color="info">{plan.subject}</Tag>
                    {plan.priority && (
                      <span 
                        className={styles.planPriority}
                        style={{ backgroundColor: getPriorityColor(plan.priority) }}
                      >
                        {getPriorityLabel(plan.priority)}
                      </span>
                    )}
                    {plan.dueDate && plan.dueDate === today && !plan.completed && (
                      <span className={styles.planDueToday}>⏰ 今日截止</span>
                    )}
                  </div>
                  <button className={styles.planDelete} onClick={(e) => { e.stopPropagation(); deletePlan(plan.id); }}>
                    <TrashIcon size={14} />
                  </button>
                </div>
              ))}
              {todayPlans.length === 0 && (
                <div className={styles.emptyState}>
                  <CalendarIcon size={32} />
                  <span>暂无今日计划</span>
                  <Button onClick={() => setShowAddPlan(true)}>添加计划</Button>
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
            <div className={styles.filterBar}>
              <select className={styles.filterSelect} onChange={(e) => {}}>
                <option value="all">全部</option>
                <option value="pending">未完成</option>
                <option value="completed">已完成</option>
              </select>
              <select className={styles.filterSelect} onChange={(e) => {}}>
                <option value="all">所有科目</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className={styles.planList}>
              {plans.slice().reverse().map((plan) => (
                <div 
                  key={plan.id} 
                  className={`${styles.planItem} ${plan.completed ? styles.planDone : ''}`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <input
                    type="checkbox"
                    checked={plan.completed}
                    onChange={(e) => { e.stopPropagation(); togglePlan(plan.id); }}
                    className={styles.planCheck}
                  />
                  <div className={styles.planContent}>
                    <span className={styles.planTitle}>{plan.title}</span>
                    {plan.subtasks && plan.subtasks.length > 0 && (
                      <div className={styles.planSubtasks}>
                        {plan.subtasks.slice(0, 2).map((st) => (
                          <span key={st.id} className={`${styles.planSubtask} ${st.completed ? styles.subtaskDone : ''}`}>
                            {st.completed ? <CheckIcon size={12} /> : <span className={styles.subtaskDot}>•</span>}
                            {st.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={styles.planMeta}>
                    <Tag color="info">{plan.subject}</Tag>
                    {plan.priority && (
                      <span 
                        className={styles.planPriority}
                        style={{ backgroundColor: getPriorityColor(plan.priority) }}
                      >
                        {getPriorityLabel(plan.priority)}
                      </span>
                    )}
                  </div>
                  <span className={styles.planDate}>{plan.date}</span>
                  <button className={styles.planDelete} onClick={(e) => { e.stopPropagation(); deletePlan(plan.id); }}>
                    <TrashIcon size={14} />
                  </button>
                </div>
              ))}
              {plans.length === 0 && (
                <div className={styles.emptyState}>
                  <BookOpenIcon size={32} />
                  <span>暂无学习计划</span>
                  <Button onClick={() => setShowAddPlan(true)}>添加计划</Button>
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
                    <div className={styles.barGroup}>
                      <div
                        className={styles.bar}
                        style={{ height: `${Math.min(item.minutes / 180 * 100, 100)}%` }}
                      />
                      <div
                        className={`${styles.bar} ${styles.barSecondary}`}
                        style={{ height: `${Math.min(item.pomodoros / 6 * 100, 100)}%` }}
                      />
                    </div>
                    <span className={styles.barLabel}>{item.day}</span>
                    <span className={styles.barValue}>{item.minutes}min</span>
                  </div>
                ))}
              </div>
              <div className={styles.chartLegend}>
                <span><span className={styles.legendDot}></span> 学习时长</span>
                <span><span className={styles.legendDotSecondary}></span> 番茄数</span>
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
              <div className={styles.statCard}>
                <ZapIcon size={24} />
                <div>
                  <div className={styles.statNum}>{sessions.reduce((sum, s) => sum + (s.pomodoroCount || 0), 0)}</div>
                  <div className={styles.statLabel}>番茄钟完成</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <TargetIcon size={24} />
                <div>
                  <div className={styles.statNum}>{Math.round((completedPlans / plans.length) * 100) || 0}%</div>
                  <div className={styles.statLabel}>计划完成率</div>
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

      {selectedPlan && (
        <div className={styles.modalOverlay} onClick={() => setSelectedPlan(null)}>
          <div className={styles.planDetailModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{selectedPlan.title}</h3>
              <button onClick={() => setSelectedPlan(null)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.planDetailContent}>
              <div className={styles.planDetailRow}>
                <span className={styles.planDetailLabel}>科目</span>
                <Tag color="info">{selectedPlan.subject}</Tag>
              </div>
              <div className={styles.planDetailRow}>
                <span className={styles.planDetailLabel}>优先级</span>
                <span 
                  className={styles.planPriority}
                  style={{ backgroundColor: getPriorityColor(selectedPlan.priority || 'medium') }}
                >
                  {getPriorityLabel(selectedPlan.priority || 'medium')}
                </span>
              </div>
              <div className={styles.planDetailRow}>
                <span className={styles.planDetailLabel}>日期</span>
                <span>{selectedPlan.date}</span>
              </div>
              {selectedPlan.dueDate && (
                <div className={styles.planDetailRow}>
                  <span className={styles.planDetailLabel}>截止日期</span>
                  <span>{selectedPlan.dueDate}</span>
                </div>
              )}
              {selectedPlan.recurring && (
                <div className={styles.planDetailRow}>
                  <span className={styles.planDetailLabel}>重复</span>
                  <span><RepeatIcon size={14} /> 每日重复</span>
                </div>
              )}
              {selectedPlan.subtasks && selectedPlan.subtasks.length > 0 && (
                <div className={styles.planDetailSection}>
                  <h4>子任务</h4>
                  <div className={styles.planDetailSubtasks}>
                    {selectedPlan.subtasks.map((st) => (
                      <div key={st.id} className={styles.planDetailSubtask}>
                        <input
                          type="checkbox"
                          checked={st.completed}
                          onChange={() => {
                            const updatedPlans = plans.map(p => 
                              p.id === selectedPlan.id 
                                ? { ...p, subtasks: p.subtasks?.map(s => s.id === st.id ? { ...s, completed: !s.completed } : s) }
                                : p
                            )
                            useStudyStore.getState().setPlans(updatedPlans)
                            setSelectedPlan({ ...selectedPlan, subtasks: selectedPlan.subtasks?.map(s => s.id === st.id ? { ...s, completed: !s.completed } : s) })
                          }}
                        />
                        <span className={st.completed ? styles.subtaskDone : ''}>{st.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className={styles.planDetailActions}>
                <Button onClick={() => { togglePlan(selectedPlan.id); setSelectedPlan(null); }}>
                  {selectedPlan.completed ? '标记未完成' : '标记完成'}
                </Button>
                <Button variant="outline" onClick={() => { deletePlan(selectedPlan.id); setSelectedPlan(null); }}>
                  删除
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCalendar && (
        <div className={styles.modalOverlay} onClick={() => setShowCalendar(false)}>
          <div className={styles.calendarModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📅 打卡日历</h3>
              <button onClick={() => setShowCalendar(false)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.calendarContent}>
              <div className={styles.calendarHeader}>
                <span>🔥 连续 {streak.current} 天</span>
                <span>🏆 最长 {streak.longest} 天</span>
              </div>
              <div className={styles.calendarGrid}>
                <div className={styles.calendarWeekdays}>
                  {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                    <div key={day} className={styles.calendarWeekday}>{day}</div>
                  ))}
                </div>
                <div className={styles.calendarDays}>
                  {getMonthCalendar().map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`${styles.calendarDay} ${item?.isToday ? styles.calendarToday : ''} ${item?.isFuture ? styles.calendarFuture : ''}`}
                    >
                      {item && (
                        <>
                          <span>{item.day}</span>
                          {item.hasCheckIn && <CheckIcon size={12} className={styles.calendarCheck} />}
                          {item.isToday && !item.hasCheckIn && <AlertCircleIcon size={12} className={styles.calendarAlert} />}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.calendarLegend}>
                <span><span className={styles.calendarLegendDot}></span> 已打卡</span>
                <span><span className={styles.calendarLegendAlert}></span> 今日未打卡</span>
                <span><span className={styles.calendarLegendFuture}></span> 未来日期</span>
              </div>
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
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [customizeOpen, setCustomizeOpen] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const addStudyMinutes = useStudyStore((s) => s.addStudyMinutes)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    if (running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setRunning(false)
    } else {
      setRunning(true)
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
            }
            setRunning(false)
            handleComplete()
            return mode === 'work' ? breakDuration * 60 : workDuration * 60
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const handleComplete = () => {
    if (mode === 'work') {
      setPomodoroCount((prev) => prev + 1)
      addStudyMinutes(workDuration)
      setMode('break')
    } else {
      setMode('work')
    }
    setCompleted(true)
    setTimeout(() => setCompleted(false), 1500)
  }

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setRunning(false)
    setSeconds(mode === 'work' ? workDuration * 60 : breakDuration * 60)
  }

  const applySettings = () => {
    setSeconds(mode === 'work' ? workDuration * 60 : breakDuration * 60)
    setCustomizeOpen(false)
  }

  const progress = (seconds / (mode === 'work' ? workDuration * 60 : breakDuration * 60)) * 100

  return (
    <div className={styles.pomodoroContent}>
      <div className={styles.pomodoroHeader}>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
        <div className={styles.pomodoroMode}>
          <button 
            className={`${styles.modeBtn} ${mode === 'work' ? styles.modeActive : ''}`}
            onClick={() => { setMode('work'); resetTimer(); }}
          >
            专注
          </button>
          <button 
            className={`${styles.modeBtn} ${mode === 'break' ? styles.modeActive : ''}`}
            onClick={() => { setMode('break'); resetTimer(); }}
          >
            休息
          </button>
        </div>
        <button 
          className={styles.settingsBtn}
          onClick={() => setCustomizeOpen(!customizeOpen)}
        >
          <SettingsIcon size={18} />
        </button>
      </div>

      {customizeOpen && (
        <div className={styles.pomodoroSettings}>
          <div className={styles.settingRow}>
            <label>专注时长（分钟）</label>
            <input
              type="number"
              min="1"
              max="120"
              value={workDuration}
              onChange={(e) => setWorkDuration(Math.max(1, Math.min(120, parseInt(e.target.value) || 25)))}
            />
          </div>
          <div className={styles.settingRow}>
            <label>休息时长（分钟）</label>
            <input
              type="number"
              min="1"
              max="60"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Math.max(1, Math.min(60, parseInt(e.target.value) || 5)))}
            />
          </div>
          <div className={styles.settingRow}>
            <label>声音提醒</label>
            <button 
              className={`${styles.soundToggle} ${soundEnabled ? styles.soundOn : ''}`}
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2Icon size={16} /> : <VolumeXIcon size={16} />}
            </button>
          </div>
          <Button size="sm" onClick={applySettings}>应用</Button>
        </div>
      )}

      <div className={styles.pomodoroMain}>
        <div className={styles.pomodoroRing}>
          <svg className={styles.pomodoroSvg} viewBox="0 0 100 100">
            <circle
              className={styles.pomodoroCircleBg}
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className={`${styles.pomodoroCircle} ${mode === 'work' ? styles.workColor : styles.breakColor}`}
              cx="50"
              cy="50"
              r="45"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${(1 - progress / 100) * 2 * Math.PI * 45}`}
            />
          </svg>
          <div className={`${styles.pomodoroTime} ${completed ? styles.completed : ''}`}>
            {formatTime(seconds)}
          </div>
        </div>
        <div className={styles.pomodoroStatus}>
          <span>{mode === 'work' ? '🎯 专注中' : '☕ 休息中'}</span>
          <span className={styles.pomodoroCount}>已完成 {pomodoroCount} 个番茄</span>
        </div>
      </div>

      <div className={styles.pomodoroControls}>
        <button className={styles.controlBtn} onClick={resetTimer}>
          <RotateCcwIcon size={20} />
          <span>重置</span>
        </button>
        <button className={`${styles.controlBtn} ${styles.controlBtnPrimary}`} onClick={toggleTimer}>
          {running ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
          <span>{running ? '暂停' : '开始'}</span>
        </button>
        <button className={styles.controlBtn} onClick={onClose}>
          <XIcon size={20} />
          <span>关闭</span>
        </button>
      </div>

      <div className={styles.pomodoroTips}>
        <div className={styles.tip}>💡 保持专注，完成当前番茄再休息</div>
        <div className={styles.tip}>🔥 4个番茄后可以休息更长时间</div>
      </div>
    </div>
  )
}