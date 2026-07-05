import { useState, useEffect, useRef } from 'react'
import { useStudyStore } from '../../stores/useStudyStore'
import { useQuestionStore } from '../../stores/useQuestionStore'
import ProgressRing from '../../components/ProgressRing/ProgressRing'
import styles from './StudyPage.module.css'

const subjects = ['React', 'CSS', '算法', '网络', 'TS', '项目']

export default function StudyPage() {
  const streak = useStudyStore((s) => s.streak)
  const plans = useStudyStore((s) => s.plans)
  const togglePlan = useStudyStore((s) => s.togglePlan)
  const checkIn = useStudyStore((s) => s.checkIn)
  const masteryRate = useQuestionStore((s) => s.getMasteryRate())
  const [pomodoroOpen, setPomodoroOpen] = useState(false)

  const todayPlans = plans.filter((p) => p.date === new Date().toISOString().slice(0, 10))

  return (
    <div className={styles.page}>
      {/* Streak Hero */}
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
      </section>

      {/* 番茄钟入口 */}
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

      {/* 今日学习计划 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📚 今日学习计划</h3>
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
              <span className={styles.planSubject}>{plan.subject}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 科目掌握度 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📊 科目掌握度</h3>
        <div className={styles.subjectList}>
          {subjects.map((sub) => {
            const pct = Math.round(Math.random() * 40 + 50)
            return (
              <div key={sub} className={styles.subjectRow}>
                <span className={styles.subjectName}>{sub}</span>
                <div className={styles.subjectBarBg}>
                  <div className={styles.subjectBarFill} style={{ width: `${pct}%` }} />
                </div>
                <span className={styles.subjectPct}>{pct}%</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* 成就徽章 */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🏆 成就徽章</h3>
        <div className={styles.badgeGrid}>
          {[
            { emoji: '🔥', label: '连续7天', unlocked: true },
            { emoji: '📚', label: '刷题50', unlocked: true },
            { emoji: '🎯', label: '投递10', unlocked: true },
            { emoji: '⭐', label: 'Offer', unlocked: false },
            { emoji: '🌟', label: '连续30天', unlocked: false },
            { emoji: '💎', label: '全能选手', unlocked: false },
          ].map((b) => (
            <div key={b.label} className={`${styles.badgeItem} ${!b.unlocked ? styles.badgeLocked : ''}`}>
              <div className={styles.badgeEmoji}>{b.unlocked ? b.emoji : '🔒'}</div>
              <div className={styles.badgeLabel}>{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 番茄钟弹窗 */}
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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            setCompleted(true)
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, seconds])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  const handleStart = () => {
    if (completed) {
      setSeconds(25 * 60)
      setCompleted(false)
    }
    setRunning(true)
  }

  const handlePause = () => {
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return (
    <div>
      <div className={styles.modalHeader}>
        <h3>⏱️ 番茄钟</h3>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>
      <div className={styles.timerDisplay}>
        <ProgressRing size={180} progress={1 - seconds / (25 * 60)} color={completed ? '#06D6A0' : '#FF6B35'}>
          <div className={styles.timerText}>
            {completed ? '🎉' : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`}
          </div>
        </ProgressRing>
      </div>
      {completed && (
        <div className={styles.completedMsg}>🎉 太棒了！完成了 25 分钟专注！</div>
      )}
      <div className={styles.timerBtns}>
        {!completed && !running && (
          <button className={styles.timerBtn} onClick={handleStart}>
            ▶️ 开始
          </button>
        )}
        {!completed && running && (
          <button className={styles.timerBtn} onClick={handlePause}>
            ⏸️ 暂停
          </button>
        )}
        {completed && (
          <button className={styles.timerBtn} onClick={() => { setSeconds(25 * 60); setCompleted(false); setRunning(false) }}>
            🔄 再来一轮
          </button>
        )}
        <button className={styles.timerBtnSecondary} onClick={() => { setSeconds(25 * 60); setRunning(false); setCompleted(false) }}>
          重置
        </button>
      </div>
    </div>
  )
}
