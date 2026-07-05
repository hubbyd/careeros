import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCareerStore } from '../../stores/useCareerStore'
import ProgressRing from '../../components/ProgressRing/ProgressRing'
import styles from './CareerPage.module.css'

const steps = [
  { id: 1, q: '你的专业领域是？', type: 'single', options: ['计算机科学', '软件工程', '电子信息', '数学/统计', '其他理工', '非理工'] },
  { id: 2, q: '最高学历？', type: 'single', options: ['博士', '硕士', '本科', '专科', '在校生'] },
  { id: 3, q: '期望工作城市？', type: 'multi', options: ['北京', '上海', '深圳', '杭州', '广州', '成都', '南京', '武汉', '远程', '不限'] },
  { id: 4, q: '期望月薪（K）？', type: 'salary' },
  { id: 5, q: '核心技能？', type: 'multi', min: 3, options: ['JavaScript', 'React', 'Vue', 'CSS/HTML', 'Node.js', 'Python', 'Java', '算法', '数据库', '网络', 'Git', '英语'] },
  { id: 6, q: '工作价值观？', type: 'single', options: ['高薪优先', '快速成长', '工作生活平衡', '做热爱的事', '稳定安全'] },
  { id: 7, q: '补充信息（选填）', type: 'text' },
]

export default function CareerPage() {
  const navigate = useNavigate()
  const { mentorAnswer, directions, assessmentDone, submitAssessment } = useCareerStore()
  const [step, setStep] = useState(mentorAnswer ? 8 : 1)
  const [answers, setAnswers] = useState<Record<number, string | string[] | number>>({
    1: '',
    2: '',
    3: [] as string[],
    4: 20,
    5: [] as string[],
    6: '',
    7: '',
  })

  const isStepDone = (n: number) => {
    if (n === 7) return true
    const a = answers[n]
    if (n === 3 || n === 5) return Array.isArray(a) && a.length >= (n === 5 ? 3 : 1)
    return a !== '' && a !== undefined
  }

  const handleNext = () => {
    if (step <= 7 && isStepDone(step)) {
      if (step === 7) {
        submitAssessment({
          major: answers[1] as string,
          education: answers[2] as string,
          cities: answers[3] as string[],
          salary: answers[4] as number,
          skills: answers[5] as string[],
          values: answers[6] as string,
          notes: answers[7] as string,
        })
        setStep(8)
      } else {
        setStep(step + 1)
      }
    }
  }

  const toggleMulti = (n: number, val: string) => {
    const curr = (answers[n] as string[]) || []
    setAnswers({ ...answers, [n]: curr.includes(val) ? curr.filter((v) => v !== val) : [...curr, val] })
  }

  if (step === 8 || assessmentDone) {
    return <ResultView directions={directions} onBack={() => navigate('/')} />
  }

  const current = steps[step - 1]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}>←</button>
        <div className={styles.headerTitle}>职业资深师咨询</div>
        <div className={styles.stepLabel}>第 {step} 步 / 共 7 步</div>
        <div className={styles.progressBg}>
          <div className={styles.progressFill} style={{ width: `${(step / 7) * 100}%` }} />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.mentorBubble}>
          <div className={styles.mentorAvatar}>👨🏫</div>
          <div className={styles.bubbleContent}>
            <div className={styles.mentorName}>林导师 · 15年经验</div>
            <div className={styles.question}>{current.q}</div>
          </div>
        </div>

        <div className={styles.options}>
          {current.type === 'single' && current.options?.map((opt) => (
            <button
              key={opt}
              className={`${styles.optCard} ${answers[current.id] === opt ? styles.optActive : ''}`}
              onClick={() => setAnswers({ ...answers, [current.id]: opt })}
            >
              {opt}
            </button>
          ))}

          {current.type === 'multi' && current.options?.map((opt) => {
            const selected = ((answers[current.id] as string[]) || []).includes(opt)
            return (
              <button
                key={opt}
                className={`${styles.optCard} ${selected ? styles.optActive : ''}`}
                onClick={() => toggleMulti(current.id, opt)}
              >
                {opt}
              </button>
            )
          })}

          {current.type === 'salary' && (
            <div className={styles.salarySlider}>
              <input
                type="range"
                min={5}
                max={80}
                value={answers[4] as number}
                onInput={(e) => setAnswers({ ...answers, 4: Number((e.target as HTMLInputElement).value) })}
                className={styles.slider}
              />
              <div className={styles.salaryVal}>{answers[4]}K</div>
            </div>
          )}

          {current.type === 'text' && (
            <textarea
              className={styles.textInput}
              placeholder="例如：有实习经验，熟悉 Vue，想做前端..."
              value={answers[7] as string}
              onInput={(e) => setAnswers({ ...answers, 7: (e.target as HTMLTextAreaElement).value })}
              rows={4}
            />
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.nextBtn}
          disabled={!isStepDone(step)}
          onClick={handleNext}
        >
          {step === 7 ? '生成规划 ✨' : '下一步'}
        </button>
      </div>
    </div>
  )
}

function ResultView({ directions, onBack }: { directions: any[]; onBack: () => void }) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>←</button>
        <div className={styles.headerTitle}>求职规划报告</div>
      </div>

      <div className={styles.body}>
        <div className={styles.resultHero}>
          <div className={styles.resultIcon}>🎉</div>
          <div className={styles.resultTitle}>规划完成！</div>
          <div className={styles.resultSub}>根据你的背景，为你推荐以下方向</div>
        </div>

        {directions.map((d) => (
          <div key={d.id} className={styles.directionCard}>
            <div className={styles.dirHeader}>
              <span className={styles.dirTitle}>{d.title}</span>
              <span className={styles.dirMatch}>匹配度 {d.match}%</span>
            </div>
            <div className={styles.dirSalary}>💰 {d.salaryRange}</div>
            <div className={styles.dirPros}>
              {d.pros.map((p: string) => (
                <span key={p} className={styles.proTag}>{p}</span>
              ))}
            </div>
            <div className={styles.dirCons}>
              {d.cons.map((c: string) => (
                <span key={c} className={styles.conTag}>{c}</span>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.roadmap}>
          <div className={styles.roadTitle}>🗺️ 4阶段行动路线</div>
          {['基础夯实(3周)', '框架进阶(4周)', '算法突击(3周)', '投递冲刺(4周)'].map((phase, i) => (
            <div key={phase} className={styles.roadItem}>
              <div className={styles.roadDot} />
              <div className={styles.roadPhase}>{phase}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
