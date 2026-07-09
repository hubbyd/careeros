import { useState, useEffect } from 'react'
import { interviewApi } from '../../api'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Tag from '../../components/Tag/Tag'
import { AiIcon, TargetIcon, Building2Icon, MessageSquareIcon, FileIcon, BarChart3Icon, TrophyIcon, CheckCircleIcon, XCircleIcon, LightbulbIcon, SendIcon } from '../../components/Icons'
import type { InterviewQuestion, InterviewSession, InterviewReport } from '../../types'
import styles from './InterviewPage.module.css'

const jobOptions = [
  '前端开发工程师', '后端开发工程师', '全栈开发工程师', '算法工程师',
  '产品经理', '测试工程师', '运维工程师', '数据分析师',
]

const companyOptions = ['不限', '字节跳动', '腾讯', '阿里巴巴', '美团', '京东', '百度', '网易']

const levelOptions = [
  { value: 'entry', label: '校招/初级' },
  { value: 'junior', label: '初级工程师' },
  { value: 'mid', label: '中级工程师' },
  { value: 'senior', label: '高级工程师' },
]

const questionCountOptions = [
  { value: 3, label: '3题 (快速)' },
  { value: 5, label: '5题 (标准)' },
  { value: 8, label: '8题 (深入)' },
]

type InterviewState = 'setup' | 'interviewing' | 'evaluating' | 'report'

export default function InterviewPage() {
  const [state, setState] = useState<InterviewState>('setup')
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [level, setLevel] = useState('entry')
  const [questionCount, setQuestionCount] = useState(5)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [report, setReport] = useState<InterviewReport | null>(null)
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null)
  const [sessions, setSessions] = useState<InterviewSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    interviewApi.sessions().then(data => setSessions(data)).catch(() => {})
  }, [])

  const handleStartInterview = async () => {
    if (!jobTitle) return
    setIsLoading(true)
    try {
      const session = await interviewApi.createSession(jobTitle, company, level, questionCount)
      setCurrentSession(session)
      const loadedQuestions = await loadSessionQuestions(session.id)
      setCurrentQuestionIndex(0)
      setAnswer('')
      if (loadedQuestions.length > 0) {
        setState('interviewing')
      } else {
        console.error('问题列表为空')
        alert('创建面试失败，请重试')
      }
    } catch (error: any) {
      console.error('创建面试失败:', error)
      const errorMsg = error?.message || '创建面试失败'
      if (errorMsg.includes('网络') || errorMsg.includes('timeout') || errorMsg.includes('fetch')) {
        alert('网络连接失败，请检查网络后重试')
      } else if (errorMsg.includes('登录已过期')) {
        alert('登录已过期，请重新登录')
        window.location.href = '/login'
      } else {
        alert(errorMsg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const loadSessionQuestions = async (sessionId: string): Promise<InterviewQuestion[]> => {
    try {
      const sessionData = await interviewApi.getSession(sessionId)
      const questionsData = sessionData.interviewQuestions || []
      setQuestions(questionsData)
      return questionsData
    } catch (error) {
      console.error('获取问题失败:', error)
      return []
    }
  }

  const handleSubmitAnswer = async () => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion || !answer.trim()) return
    setIsLoading(true)
    setState('evaluating')
    try {
      await interviewApi.submitAnswer(currentQuestion.id, answer)
      setAnswer('')
      const loadedQuestions = await loadSessionQuestions(currentSession!.id)
      if (currentQuestionIndex < loadedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setState('interviewing')
      } else {
        setState('report')
      }
    } catch (error: any) {
      console.error('提交回答失败:', error)
      const errorMsg = error?.message || '提交回答失败'
      if (errorMsg.includes('网络') || errorMsg.includes('timeout') || errorMsg.includes('fetch')) {
        alert('网络连接失败，请检查网络后重试')
      } else if (errorMsg.includes('登录已过期')) {
        alert('登录已过期，请重新登录')
        window.location.href = '/login'
      } else {
        alert(errorMsg)
      }
      setState('interviewing')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateReport = async () => {
    if (!currentSession) return
    setIsLoading(true)
    try {
      const reportData = await interviewApi.getReport(currentSession.id)
      setReport(reportData)
    } catch (error) {
      console.error('生成报告失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEndInterview = async () => {
    if (!currentSession) return
    setIsLoading(true)
    try {
      await interviewApi.endSession(currentSession.id)
      await handleGenerateReport()
      setState('report')
    } catch (error) {
      console.error('结束面试失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewSession = async (session: InterviewSession) => {
    setCurrentSession(session)
    await loadSessionQuestions(session.id)
    setCurrentQuestionIndex(0)
    setAnswer('')
    setState('interviewing')
  }

  const handleDeleteSession = async (id: string) => {
    try {
      await interviewApi.deleteSession(id)
      setSessions(sessions.filter(s => s.id !== id))
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const renderSetup = () => (
    <div className={styles.setup}>
      <div className={styles.setupIcon}>🤖</div>
      <h1 className={styles.setupTitle}>AI模拟面试</h1>
      <p className={styles.setupDesc}>AI扮演面试官，模拟真实面试场景，实时给出专业反馈</p>
      <Card className={styles.setupCard}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>🎯 目标岗位 *</label>
          <div className={styles.formOptions}>
            {jobOptions.map(job => (
              <button key={job} className={`${styles.formOpt} ${jobTitle === job ? styles.formOptActive : ''}`} onClick={() => setJobTitle(job)}>
                {job}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>🏢 目标公司</label>
          <div className={styles.formOptions}>
            {companyOptions.map(c => (
              <button key={c} className={`${styles.formOpt} ${company === c ? styles.formOptActive : ''}`} onClick={() => setCompany(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>📊 职位级别</label>
          <div className={styles.formOptions}>
            {levelOptions.map(l => (
              <button key={l.value} className={`${styles.formOpt} ${level === l.value ? styles.formOptActive : ''}`} onClick={() => setLevel(l.value)}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>📝 题目数量</label>
          <div className={styles.formOptions}>
            {questionCountOptions.map(q => (
              <button key={q.value} className={`${styles.formOpt} ${questionCount === q.value ? styles.formOptActive : ''}`} onClick={() => setQuestionCount(q.value)}>
                {q.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.setupFeatures}>
          <div className={styles.featureBox}><span>💬</span><span>真实面试场景</span></div>
          <div className={styles.featureBox}><span>📝</span><span>实时反馈评估</span></div>
          <div className={styles.featureBox}><span>📊</span><span>完整面试报告</span></div>
        </div>
        <Button size="lg" onClick={handleStartInterview} disabled={!jobTitle || isLoading}>
          {isLoading ? '准备中...' : '🚀 开始面试'}
        </Button>
      </Card>
      <div className={styles.historySection}>
        <h2 className={styles.historyTitle}>📋 历史面试记录</h2>
        {sessions.length === 0 ? (
          <div className={styles.emptyHistory}><span>💭</span><span>暂无面试记录</span></div>
        ) : (
          <div className={styles.historyList}>
            {sessions.map(session => (
              <Card key={session.id} className={styles.historyCard}>
                <div className={styles.historyHeader}>
                  <div className={styles.historyInfo}>
                    <span className={styles.historyJob}>{session.jobTitle}</span>
                    <span className={styles.historyCompany}>{session.company || '不限'} | {levelOptions.find(l => l.value === session.level)?.label || session.level}</span>
                  </div>
                  <span className={styles.historyStatus}>{session.status === 'completed' ? '已完成' : session.status === 'in_progress' ? '进行中' : '待开始'}</span>
                </div>
                <span className={styles.historyDate}>{new Date(session.createdAt).toLocaleDateString('zh-CN')} | {session.questionCount || 0} 题</span>
                <div className={styles.historyActions}>
                  <button className={styles.viewBtn} onClick={() => handleViewSession(session)}>查看详情</button>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteSession(session.id)}>删除</button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderInterviewing = () => {
    if (!currentSession || questions.length === 0) return null
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return null

    return (
      <div className={styles.interviewing}>
        <div className={styles.interviewHeader}>
          <div className={styles.interviewProgress}>
            <span className={styles.progressText}>第 {currentQuestionIndex + 1} / {questions.length} 题</span>
            <ProgressBar value={(currentQuestionIndex / questions.length) * 100} size="sm" />
          </div>
          <button className={styles.exitBtn} onClick={() => setState('setup')}>退出</button>
        </div>
        <Card className={styles.questionCard}>
          <div className={styles.questionMeta}>
            <Tag variant="purple">{currentQuestion.evaluation ? '已回答' : '待回答'}</Tag>
            <span className={styles.questionCount}>Q{currentQuestionIndex + 1}</span>
          </div>
          <h2 className={styles.questionText}>{currentQuestion.question}</h2>
        </Card>
        <Card className={styles.answerCard}>
          <textarea 
            className={styles.answerTextarea} 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            placeholder="请输入你的回答..." 
            rows={8}
            disabled={!!currentQuestion.answer}
          />
          <div className={styles.answerFooter}>
            <span className={styles.charCount}>{answer.length} 字</span>
            <span className={styles.shortcut}>Ctrl+Enter 提交</span>
          </div>
          {!currentQuestion.answer ? (
            <Button onClick={handleSubmitAnswer} disabled={!answer.trim() || isLoading}>
              {isLoading ? 'AI评估中...' : '📤 提交回答'}
            </Button>
          ) : (
            <div className={styles.answerSubmitted}>
              <div className={styles.feedbackSection}>
                <div className={styles.feedbackHeader}>
                  <h4>💬 AI评价</h4>
                  {currentQuestion.score !== undefined && (
                    <span className={styles.feedbackScore} style={{ color: getScoreColor(currentQuestion.score) }}>
                      {currentQuestion.score}分
                    </span>
                  )}
                </div>
                {currentQuestion.evaluation && (
                  <p className={styles.feedbackText}>{currentQuestion.evaluation}</p>
                )}
              </div>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>下一题 →</Button>
              ) : (
                <Button onClick={handleEndInterview}>结束面试并生成报告</Button>
              )}
            </div>
          )}
        </Card>
        {questions.length > 1 && (
          <div className={styles.previousSection}>
            <h3 className={styles.previousTitle}>📝 题目列表</h3>
            <div className={styles.previousList}>
              {questions.map((q, i) => (
                <Card 
                  key={q.id} 
                  className={`${styles.previousCard} ${i === currentQuestionIndex ? styles.previousCardActive : ''}`}
                  onClick={() => {
                    if (q.answer || i <= currentQuestionIndex) {
                      setCurrentQuestionIndex(i)
                      setAnswer(q.answer || '')
                    }
                  }}
                >
                  <div className={styles.previousQuestion}>
                    <span className={styles.previousNum}>Q{i + 1}</span>
                    <span className={styles.previousText}>{q.question.substring(0, 50)}...</span>
                  </div>
                  {q.score !== undefined && (
                    <span className={styles.previousScore} style={{ color: getScoreColor(q.score) }}>
                      {q.score}分
                    </span>
                  )}
                  {q.answer && !q.score && (
                    <span className={styles.previousPending}>评估中</span>
                  )}
                  {!q.answer && i > currentQuestionIndex && (
                    <span className={styles.previousLocked}>🔒</span>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderReport = () => {
    if (!report) {
      return (
        <div className={styles.evaluating}>
          <div className={styles.loader} />
          <h2 className={styles.evaluatingTitle}>生成面试报告中...</h2>
          <p className={styles.evaluatingDesc}>AI正在分析你的表现</p>
        </div>
      )
    }

    return (
      <div className={styles.report}>
        <div className={styles.reportHeader}>
          <div className={styles.reportIcon}>🎉</div>
          <h1 className={styles.reportTitle}>面试报告</h1>
          <p className={styles.reportDesc}>AI为你生成的面试评估</p>
        </div>
        <Card className={styles.scoreCard}>
          <div className={styles.scoreMain}>
            <div className={styles.scoreCircle} style={{ background: getScoreColor(report.averageScore) }}>
              {report.averageScore}
            </div>
            <div className={styles.scoreInfo}>
              <span className={styles.scoreLabel}>综合评分</span>
              <span className={styles.scoreJob}>{report.session.jobTitle}</span>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className={styles.cardTitle}>📊 整体评价</h3>
          <div className={styles.summaryText}>{report.summary}</div>
        </Card>
        <Card>
          <h3 className={styles.cardTitle}>📝 答题详情</h3>
          <div className={styles.detailList}>
            {report.questions.map((q, i) => (
              <div key={q.id} className={styles.detailCard}>
                <div className={styles.detailHeader}>
                  <span className={styles.detailNum}>Q{i + 1}</span>
                  <Tag variant={q.score && q.score >= 60 ? 'success' : 'danger'}>
                    {q.score ? `${q.score}分` : '未回答'}
                  </Tag>
                </div>
                <p className={styles.detailQuestion}>{q.question}</p>
                {q.answer && (
                  <p className={styles.detailAnswer}>{q.answer}</p>
                )}
                {q.evaluation && (
                  <div className={styles.detailFeedback}>
                    <h4>💬 面试官评价</h4>
                    <p>{q.evaluation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
        <div className={styles.reportFooter}>
          <Button variant="outline" onClick={() => setState('setup')}>返回首页</Button>
          <Button onClick={handleStartInterview}>再来一次 →</Button>
        </div>
      </div>
    )
  }

  const renderEvaluating = () => (
    <div className={styles.evaluating}>
      <div className={styles.loader} />
      <h2 className={styles.evaluatingTitle}>AI正在评估你的回答...</h2>
      <p className={styles.evaluatingDesc}>正在分析你的回答并生成反馈</p>
    </div>
  )

  return (
    <div className={styles.page}>
      {state === 'setup' && renderSetup()}
      {state === 'interviewing' && renderInterviewing()}
      {state === 'evaluating' && renderEvaluating()}
      {state === 'report' && renderReport()}
    </div>
  )
}