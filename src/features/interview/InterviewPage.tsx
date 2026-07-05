import { useState } from 'react'
import { useQuestionStore } from '../../stores/useQuestionStore'
import type { QuestionCategory } from '../../types'
import styles from './InterviewPage.module.css'

const categories: { key: QuestionCategory; label: string; emoji: string }[] = [
  { key: 'tech', label: '技术', emoji: '💻' },
  { key: 'behavior', label: '行为', emoji: '🗣️' },
  { key: 'project', label: '项目', emoji: '🏗️' },
  { key: 'algorithm', label: '算法', emoji: '🔢' },
  { key: 'system', label: '系统', emoji: '🏛️' },
]

const difficultyColor = { easy: '#06D6A0', medium: '#FF9F1C', hard: '#EF476F' }
const difficultyLabel = { easy: '简单', medium: '中等', hard: '困难' }

export default function InterviewPage() {
  const questions = useQuestionStore((s) => s.questions)
  const toggleMastered = useQuestionStore((s) => s.toggleMastered)
  const masteryRate = useQuestionStore((s) => s.getMasteryRate())
  const [activeCat, setActiveCat] = useState<QuestionCategory | 'all'>('all')
  const [aiOpen, setAiOpen] = useState(false)

  const filtered = activeCat === 'all' ? questions : questions.filter((q) => q.category === activeCat)

  return (
    <div className={styles.page}>
      {/* AI 模拟面试入口 */}
      <section className={styles.aiCard} onClick={() => setAiOpen(true)}>
        <div className={styles.aiLeft}>
          <div className={styles.aiIcon}>🤖</div>
          <div>
            <div className={styles.aiTitle}>AI 模拟面试</div>
            <div className={styles.aiSub}>和 AI 来一场真实技术面试</div>
          </div>
        </div>
        <button className={styles.aiBtn} onClick={(e) => { e.stopPropagation(); setAiOpen(true) }}>开始 →</button>
      </section>

      {/* AI 面试弹窗 */}
      {aiOpen && (
        <div className={styles.modalOverlay} onClick={() => setAiOpen(false)}>
          <div className={styles.aiModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>🤖 AI 模拟面试</h3>
              <button onClick={() => setAiOpen(false)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.aiSetup}>
              <div className={styles.setupGroup}>
                <label>面试方向</label>
                <div className={styles.setupOptions}>
                  {['前端', '后端', '全栈', '算法'].map((dir) => (
                    <button key={dir} className={styles.setupOpt}>{dir}</button>
                  ))}
                </div>
              </div>
              <div className={styles.setupGroup}>
                <label>难度</label>
                <div className={styles.setupOptions}>
                  {['入门', '初级', '中级', '高级'].map((d) => (
                    <button key={d} className={styles.setupOpt}>{d}</button>
                  ))}
                </div>
              </div>
              <button className={styles.startAiBtn} onClick={() => alert('🚧 AI 模拟面试功能开发中，敬请期待！')}>
                🚀 开始面试
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 掌握度总览 */}
      <section className={styles.masteryCard}>
        <div className={styles.masteryHeader}>
          <span>总掌握度</span>
          <span className={styles.masteryPct}>{masteryRate}%</span>
        </div>
        <div className={styles.masteryBarBg}>
          <div className={styles.masteryBarFill} style={{ width: `${masteryRate}%` }} />
        </div>
      </section>

      {/* 分类 Tab */}
      <div className={styles.catRow}>
        <button
          className={`${styles.catTab} ${activeCat === 'all' ? styles.catActive : ''}`}
          onClick={() => setActiveCat('all')}
        >
          全部
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            className={`${styles.catTab} ${activeCat === c.key ? styles.catActive : ''}`}
            onClick={() => setActiveCat(c.key)}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* 题目列表 */}
      <div className={styles.questionList}>
        {filtered.map((q) => (
          <div key={q.id} className={styles.questionCard}>
            <div className={styles.questionTop}>
              <span
                className={styles.difficulty}
                style={{ color: difficultyColor[q.difficulty] }}
              >
                ● {difficultyLabel[q.difficulty]}
              </span>
              <button
                className={`${styles.masterBtn} ${q.mastered ? styles.masterDone : ''}`}
                onClick={() => toggleMastered(q.id)}
              >
                {q.mastered ? '✅ 已掌握' : '📖 标记掌握'}
              </button>
            </div>
            <div className={styles.questionTitle}>{q.title}</div>
            <div className={styles.questionMeta}>
              <span>👁️ {q.viewed}</span>
              <span>{categories.find((c) => c.key === q.category)?.emoji} {categories.find((c) => c.key === q.category)?.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
