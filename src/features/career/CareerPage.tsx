import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { careerApi } from '../../api'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Tag from '../../components/Tag/Tag'
import type { DiagnosisResult, CareerMatch, SkillItem, PersonalityItem } from '../../types'
import styles from './CareerPage.module.css'

const skillCategories = [
  { name: '编程语言', skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'Rust', 'Swift'] },
  { name: '前端框架', skills: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js'] },
  { name: '后端技术', skills: ['Node.js', 'Spring Boot', 'Django', 'Flask', '微服务', 'Docker'] },
  { name: '数据库', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite'] },
  { name: '其他技能', skills: ['算法', '数据结构', '网络', '操作系统', 'Git', '英语'] },
]

const interestOptions = [
  'Web开发', '移动开发', '数据分析', '人工智能', '系统架构', '安全',
  '产品设计', '测试', 'DevOps', '技术写作', '创业', '教育',
]

const personalityTraits = [
  { trait: '逻辑思维', desc: '善于分析和推理' },
  { trait: '创造力', desc: '善于创新和思考' },
  { trait: '沟通能力', desc: '善于表达和交流' },
  { trait: '团队协作', desc: '善于团队合作' },
  { trait: '抗压能力', desc: '能够应对压力' },
  { trait: '学习能力', desc: '快速学习新技能' },
  { trait: '责任心', desc: '对工作负责' },
  { trait: '好奇心', desc: '对新技术充满好奇' },
]

type Step = 'intro' | 'skills' | 'interests' | 'personality' | 'info' | 'analyzing' | 'result'

export default function CareerPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('intro')
  const [skills, setSkills] = useState<SkillItem[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [personality, setPersonality] = useState<PersonalityItem[]>([])
  const [education, setEducation] = useState('')
  const [major, setMajor] = useState('')
  const [experience, setExperience] = useState('')
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    careerApi.get().then(data => {
      if (data.length > 0) {
        const latest = data[0]
        try {
          const summary = JSON.parse(latest.summary)
          setResult(summary)
          setStep('result')
        } catch {}
      }
    }).catch(() => {})
  }, [])

  const handleSkillChange = (skillName: string, level: number) => {
    const existing = skills.find(s => s.name === skillName)
    if (existing) {
      if (level === 0) {
        setSkills(skills.filter(s => s.name !== skillName))
      } else {
        setSkills(skills.map(s => s.name === skillName ? { ...s, level } : s))
      }
    } else if (level > 0) {
      setSkills([...skills, { name: skillName, level }])
    }
  }

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest))
    } else {
      setInterests([...interests, interest])
    }
  }

  const handlePersonalityChange = (trait: string, score: number) => {
    const existing = personality.find(p => p.trait === trait)
    if (existing) {
      setPersonality(personality.map(p => p.trait === trait ? { ...p, score } : p))
    } else {
      setPersonality([...personality, { trait, score }])
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setStep('analyzing')
    try {
      const response = await careerApi.diagnosis({
        skills,
        interests,
        personality,
        education,
        major,
        experience,
      })
      setResult(response.result)
      setStep('result')
    } catch (error) {
      console.error('诊断失败:', error)
      setStep('intro')
    } finally {
      setIsLoading(false)
    }
  }

  const getStepProgress = () => {
    switch (step) {
      case 'intro': return 0
      case 'skills': return 20
      case 'interests': return 40
      case 'personality': return 60
      case 'info': return 80
      case 'analyzing': return 90
      case 'result': return 100
      default: return 0
    }
  }

  const renderIntro = () => (
    <div className={styles.intro}>
      <div className={styles.introIcon}>🤖</div>
      <h1 className={styles.introTitle}>AI职业诊断</h1>
      <p className={styles.introDesc}>通过AI智能分析你的能力、兴趣和性格，为你推荐最适合的职业方向</p>
      <div className={styles.introFeatures}>
        <div className={styles.featureItem}><span>🎯</span><span>精准能力评估</span></div>
        <div className={styles.featureItem}><span>💡</span><span>智能职业匹配</span></div>
        <div className={styles.featureItem}><span>📈</span><span>个性化建议</span></div>
      </div>
      <Button size="lg" onClick={() => setStep('skills')}>开始诊断 →</Button>
    </div>
  )

  const renderSkills = () => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>🎯 能力自评</h2>
      <p className={styles.sectionDesc}>请评估你的各项技能水平（0-10分）</p>
      {skillCategories.map(category => (
        <div key={category.name} className={styles.skillCategory}>
          <h3 className={styles.categoryTitle}>{category.name}</h3>
          <div className={styles.skillGrid}>
            {category.skills.map(skill => {
              const rating = skills.find(s => s.name === skill)?.level || 0
              return (
                <div key={skill} className={styles.skillItem}>
                  <div className={styles.skillName}>{skill}</div>
                  <div className={styles.ratingSlider}>
                    {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                      <button key={i} className={`${styles.ratingBtn} ${i <= rating ? styles.ratingActive : ''}`} onClick={() => handleSkillChange(skill, i)} />
                    ))}
                  </div>
                  <div className={styles.ratingValue}>{rating}</div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <div className={styles.sectionFooter}>
        <Button variant="outline" onClick={() => setStep('intro')}>← 上一步</Button>
        <Button onClick={() => setStep('interests')} disabled={skills.length === 0}>下一步 →</Button>
      </div>
    </div>
  )

  const renderInterests = () => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>❤️ 兴趣调查</h2>
      <p className={styles.sectionDesc}>请选择你感兴趣的领域（可多选）</p>
      <div className={styles.tagGrid}>
        {interestOptions.map(interest => (
          <button key={interest} className={`${styles.tagBtn} ${interests.includes(interest) ? styles.tagActive : ''}`} onClick={() => toggleInterest(interest)}>
            {interest}
          </button>
        ))}
      </div>
      <div className={styles.sectionFooter}>
        <Button variant="outline" onClick={() => setStep('skills')}>← 上一步</Button>
        <Button onClick={() => setStep('personality')} disabled={interests.length === 0}>下一步 →</Button>
      </div>
    </div>
  )

  const renderPersonality = () => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>🌟 性格测试</h2>
      <p className={styles.sectionDesc}>请评估你的各项性格特质（0-10分）</p>
      <div className={styles.personalityGrid}>
        {personalityTraits.map(trait => {
          const score = personality.find(p => p.trait === trait.trait)?.score || 5
          return (
            <div key={trait.trait} className={styles.personalityItem}>
              <div className={styles.personalityHeader}>
                <span className={styles.personalityName}>{trait.trait}</span>
                <span className={styles.personalityScore}>{score}</span>
              </div>
              <div className={styles.personalityDesc}>{trait.desc}</div>
              <input type="range" min={0} max={10} value={score} onChange={(e) => handlePersonalityChange(trait.trait, Number(e.target.value))} className={styles.personalitySlider} />
            </div>
          )
        })}
      </div>
      <div className={styles.sectionFooter}>
        <Button variant="outline" onClick={() => setStep('interests')}>← 上一步</Button>
        <Button onClick={() => setStep('info')}>下一步 →</Button>
      </div>
    </div>
  )

  const renderInfo = () => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>📝 基本信息</h2>
      <p className={styles.sectionDesc}>请填写你的基本背景信息</p>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>学历</label>
          <select value={education} onChange={(e) => setEducation(e.target.value)} className={styles.formSelect}>
            <option value="">请选择学历</option>
            <option value="专科">专科</option>
            <option value="本科">本科</option>
            <option value="硕士">硕士</option>
            <option value="博士">博士</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>专业</label>
          <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className={styles.formInput} placeholder="请输入你的专业" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>相关经验（选填）</label>
          <textarea value={experience} onChange={(e) => setExperience(e.target.value)} className={styles.formTextarea} placeholder="例如：有2年前端开发经验..." rows={4} />
        </div>
      </div>
      <div className={styles.sectionFooter}>
        <Button variant="outline" onClick={() => setStep('personality')}>← 上一步</Button>
        <Button onClick={handleSubmit} disabled={!education || !major}>开始AI分析 →</Button>
      </div>
    </div>
  )

  const renderAnalyzing = () => (
    <div className={styles.analyzing}>
      <div className={styles.loader} />
      <h2 className={styles.analyzingTitle}>AI正在分析...</h2>
      <p className={styles.analyzingDesc}>正在根据你的信息进行职业匹配分析</p>
      <ProgressBar progress={90} size="lg" />
    </div>
  )

  const renderResult = () => {
    if (!result) return null
    const getScoreColor = (score: number) => {
      if (score >= 80) return '#10b981'
      if (score >= 60) return '#f59e0b'
      return '#ef4444'
    }
    return (
      <div className={styles.result}>
        <div className={styles.resultHeader}>
          <div className={styles.resultIcon}>🎉</div>
          <h1 className={styles.resultTitle}>职业诊断报告</h1>
          <p className={styles.resultDesc}>AI为你分析的职业建议</p>
        </div>
        <Card className={styles.summaryCard}>
          <h3 className={styles.cardTitle}>📊 综合分析</h3>
          <p className={styles.summaryText}>{result.summary}</p>
        </Card>
        <div className={styles.twoCols}>
          <Card>
            <h3 className={styles.cardTitle}>💪 你的优势</h3>
            <ul className={styles.list}>{result.strengths.map((s,i) => <li key={i} className={styles.listItem}>✓ {s}</li>)}</ul>
          </Card>
          <Card>
            <h3 className={styles.cardTitle}>📉 需要改进</h3>
            <ul className={styles.list}>{result.weaknesses.map((w,i) => <li key={i} className={styles.listItem}>✗ {w}</li>)}</ul>
          </Card>
        </div>
        <Card>
          <h3 className={styles.cardTitle}>💡 行动建议</h3>
          <ul className={styles.list}>{result.suggestions.map((s,i) => <li key={i} className={styles.listItem}>📌 {s}</li>)}</ul>
        </Card>
        <Card>
          <h3 className={styles.cardTitle}>🎯 推荐职业方向</h3>
          <div className={styles.matchList}>
            {result.matches.map((match: CareerMatch, i) => (
              <div key={i} className={styles.matchCard}>
                <div className={styles.matchHeader}>
                  <span className={styles.matchTitle}>{match.title}</span>
                  <span className={styles.matchScore} style={{ color: getScoreColor(match.match) }}>{match.match}%</span>
                </div>
                <div className={styles.matchInfo}>
                  <div className={styles.matchRow}><span className={styles.matchLabel}>薪资范围</span><span className={styles.matchValue}>{match.salaryRange}</span></div>
                  <div className={styles.matchRow}><span className={styles.matchLabel}>发展前景</span><span className={styles.matchValue}>{match.prospects}</span></div>
                  <div className={styles.matchRow}><span className={styles.matchLabel}>入门门槛</span><span className={styles.matchValue}>{match.threshold}</span></div>
                </div>
                <div className={styles.matchTags}>
                  <div className={styles.tagGroup}>
                    <span className={styles.tagGroupTitle}>优点</span>
                    {match.pros.map((p,j) => <Tag key={j} color="success">{p}</Tag>)}
                  </div>
                  <div className={styles.tagGroup}>
                    <span className={styles.tagGroupTitle}>挑战</span>
                    {match.cons.map((c,j) => <Tag key={j} color="warning">{c}</Tag>)}
                  </div>
                </div>
                <div className={styles.matchBottomTags}>
                  {match.tags.map((tag,j) => <Tag key={j}>{tag}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className={styles.resultFooter}>
          <Button variant="outline" onClick={() => setStep('intro')}>重新诊断</Button>
          <Button onClick={() => navigate('/learning')}>生成学习路线 →</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.progressBarWrapper}>
        <ProgressBar progress={getStepProgress()} size="md" />
      </div>
      {step === 'intro' && renderIntro()}
      {step === 'skills' && renderSkills()}
      {step === 'interests' && renderInterests()}
      {step === 'personality' && renderPersonality()}
      {step === 'info' && renderInfo()}
      {step === 'analyzing' && renderAnalyzing()}
      {step === 'result' && renderResult()}
    </div>
  )
}