import { useState, useEffect } from 'react'
import { interviewApi } from '../../api'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Tag from '../../components/Tag/Tag'
import { AiIcon, TargetIcon, Building2Icon, MessageSquareIcon, FileIcon, BarChart3Icon, TrophyIcon, CheckCircleIcon, XCircleIcon, LightbulbIcon, SendIcon } from '../../components/Icons'
import type { InterviewQuestion, InterviewFeedback, InterviewReport, InterviewSession } from '../../types'
import styles from './InterviewPage.module.css'

const jobOptions = [
  '前端开发工程师', '后端开发工程师', '全栈开发工程师', '算法工程师',
  '产品经理', '测试工程师', '运维工程师', '数据分析师',
]

const companyOptions = ['不限', '字节跳动', '腾讯', '阿里巴巴', '美团', '京东', '百度', '网易']
const questionTypes = ['技术基础', '算法', '系统设计', '项目经验', '行为面试']

type InterviewState = 'setup' | 'interviewing' | 'evaluating' | 'report'

interface InterviewRecord {
  question: InterviewQuestion
  answer: string
  feedback: InterviewFeedback
}

export default function InterviewPage() {
  const [state, setState] = useState<InterviewState>('setup')
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null)
  const [answer, setAnswer] = useState('')
  const [records, setRecords] = useState<InterviewRecord[]>([])
  const [report, setReport] = useState<InterviewReport | null>(null)
  const [sessionId, setSessionId] = useState('')
  const [sessionCount, setSessionCount] = useState(0)
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
      const response = await interviewApi.createSession(jobTitle, company)
      setSessionId(response.session.id)
      setSessionCount(0)
      setCurrentQuestion(response.question)
      setIsFallback(response.isFallback || false)
      setState('interviewing')
    } catch (error) {
      console.error('创建面试失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitAnswer = async () => {
    if (!answer.trim() || !currentQuestion) return
    setIsLoading(true)
    setState('evaluating')
    try {
      const response = await interviewApi.answer(sessionId, currentQuestion.question, answer, currentQuestion.questionType)
      const newRecord: InterviewRecord = { question: currentQuestion, answer, feedback: response.feedback }
      setRecords([...records, newRecord])
      setAnswer('')
      const newCount = sessionCount + 1
      setSessionCount(newCount)
      if (newCount >= 5) {
        const finishResponse = await interviewApi.finish(sessionId)
        setReport(finishResponse.report)
        setState('report')
      } else {
        setCurrentQuestion(response.nextQuestion)
        setIsFallback(response.isFallback || false)
        setState('interviewing')
      }
    } catch (error) {
      console.error('提交回答失败:', error)
    } finally {
      setIsLoading(false)
    }
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
                    <span className={styles.historyCompany}>{session.company || '不限'}</span>
                  </div>
                  <span className={styles.historyStatus}>{session.status}</span>
                </div>
                <span className={styles.historyDate}>{new Date(session.createdAt).toLocaleDateString('zh-CN')}</span>
                <button className={styles.deleteBtn} onClick={() => handleDeleteSession(session.id)}>删除</button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderInterviewing = () => {
    if (!currentQuestion) return null
    return (
      <div className={styles.interviewing}>
        <div className={styles.interviewHeader}>
          <div className={styles.interviewProgress}>
            <span className={styles.progressText}>第 {sessionCount + 1} / 5 题</span>
            <ProgressBar value={(sessionCount / 5) * 100} size="sm" />
          </div>
          <button className={styles.exitBtn} onClick={() => setState('setup')}>退出</button>
        </div>
        {isFallback && (
          <div className={styles.fallbackBanner}>
            <span className={styles.fallbackIcon}>⚠️</span>
            <span className={styles.fallbackText}>AI服务暂不可用，当前使用预设题库</span>
          </div>
        )}
        <Card className={styles.questionCard}>
          <div className={styles.questionMeta}>
            <Tag variant="purple">{currentQuestion.questionType}</Tag>
            <span className={styles.questionCount}>Q{sessionCount + 1}</span>
          </div>
          <h2 className={styles.questionText}>{currentQuestion.question}</h2>
          <div className={styles.expectedPoints}>
            <span className={styles.expectedLabel}>考察要点：</span>
            {currentQuestion.expectedPoints.map((point, i) => <Tag key={i} variant="info">{point}</Tag>)}
          </div>
        </Card>
        <Card className={styles.answerCard}>
          <textarea className={styles.answerTextarea} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="请输入你的回答..." rows={8} />
          <div className={styles.answerFooter}>
            <span className={styles.charCount}>{answer.length} 字</span>
            <span className={styles.shortcut}>Ctrl+Enter 提交</span>
          </div>
          <Button onClick={handleSubmitAnswer} disabled={!answer.trim() || isLoading}>
            {isLoading ? 'AI评估中...' : '📤 提交回答'}
          </Button>
        </Card>
        {records.length > 0 && (
          <div className={styles.previousSection}>
            <h3 className={styles.previousTitle}>📝 已答题目</h3>
            <div className={styles.previousList}>
              {records.map((record, i) => (
                <Card key={i} className={styles.previousCard}>
                  <div className={styles.previousQuestion}>
                    <span className={styles.previousNum}>Q{i + 1}</span>
                    <span className={styles.previousText}>{record.question.question.substring(0, 50)}...</span>
                  </div>
                  <div className={styles.previousScore} style={{ color: getScoreColor(record.feedback.score) }}>
                    {record.feedback.score}分
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderReport = () => {
    if (!report) return null
    return (
      <div className={styles.report}>
        <div className={styles.reportHeader}>
          <div className={styles.reportIcon}>🎉</div>
          <h1 className={styles.reportTitle}>面试报告</h1>
          <p className={styles.reportDesc}>AI为你生成的面试评估</p>
        </div>
        <Card className={styles.scoreCard}>
          <div className={styles.scoreMain}>
            <div className={styles.scoreCircle} style={{ background: getScoreColor(report.overallScore) }}>
              {report.overallScore}
            </div>
            <div className={styles.scoreInfo}>
              <span className={styles.scoreLabel}>综合评分</span>
              <span className={styles.scoreJob}>{jobTitle}</span>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className={styles.cardTitle}>📊 整体评价</h3>
          <p className={styles.summaryText}>{report.summary}</p>
        </Card>
        <div className={styles.twoCols}>
          <Card>
            <h3 className={styles.cardTitle}>💪 面试亮点</h3>
            <ul className={styles.list}>{report.strengths.map((s,i) => <li key={i} className={styles.listItem}>✓ {s}</li>)}</ul>
          </Card>
          <Card>
            <h3 className={styles.cardTitle}>📉 需要改进</h3>
            <ul className={styles.list}>{report.weaknesses.map((w,i) => <li key={i} className={styles.listItem}>✗ {w}</li>)}</ul>
          </Card>
        </div>
        <Card>
          <h3 className={styles.cardTitle}>💡 改进建议</h3>
          <ul className={styles.list}>{report.suggestions.map((s,i) => <li key={i} className={styles.listItem}>📌 {s}</li>)}</ul>
        </Card>
        <Card>
          <h3 className={styles.cardTitle}>📝 答题详情</h3>
          <div className={styles.detailList}>
            {records.map((record, i) => (
              <div key={i} className={styles.detailCard}>
                <div className={styles.detailHeader}>
                  <span className={styles.detailNum}>Q{i + 1}</span>
                  <Tag variant="purple">{record.question.questionType}</Tag>
                  <span className={styles.detailScore} style={{ color: getScoreColor(record.feedback.score) }}>
                    {record.feedback.score}分
                  </span>
                </div>
                <p className={styles.detailQuestion}>{record.question.question}</p>
                <p className={styles.detailAnswer}>{record.answer}</p>
                <div className={styles.detailFeedback}>
                  <h4>💬 面试官评价</h4>
                  <p>{record.feedback.feedback}</p>
                </div>
                {record.feedback.improvements.length > 0 && (
                  <div className={styles.detailImprovements}>
                    <h4>📌 改进建议</h4>
                    <ul>{record.feedback.improvements.map((imp,j) => <li key={j}>• {imp}</li>)}</ul>
                  </div>
                )}
                {record.feedback.sampleAnswer && (
                  <div className={styles.detailSample}>
                    <h4>🎯 参考回答</h4>
                    <p>{record.feedback.sampleAnswer}</p>
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

  return (
    <div className={styles.page}>
      {state === 'setup' && renderSetup()}
      {state === 'interviewing' && renderInterviewing()}
      {state === 'evaluating' && (
        <div className={styles.evaluating}>
          <div className={styles.loader} />
          <h2 className={styles.evaluatingTitle}>AI正在评估你的回答...</h2>
          <p className={styles.evaluatingDesc}>正在分析你的回答并生成反馈</p>
        </div>
      )}
      {state === 'report' && renderReport()}
    </div>
  )
}