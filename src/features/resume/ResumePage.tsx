import { useState, useEffect } from 'react'
import { resumeApi } from '../../api'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Tag from '../../components/Tag/Tag'
import type { Resume, ResumeAnalysis } from '../../types'
import styles from './ResumePage.module.css'

type Tab = 'analyze' | 'optimize' | 'history'

const sampleResume = `张三
前端开发工程师

教育背景
2020-2024 清华大学 软件工程专业 本科

专业技能
JavaScript、TypeScript、React、Vue、HTML、CSS
Node.js、Git、Webpack

项目经历
2023年 校园二手交易平台
负责前端页面开发，使用React技术栈

实习经历
2023年 字节跳动 前端开发实习生
参与业务系统开发`

export default function ResumePage() {
  const [tab, setTab] = useState<Tab>('analyze')
  const [resumeContent, setResumeContent] = useState(sampleResume)
  const [targetJob, setTargetJob] = useState('')
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [optimizedContent, setOptimizedContent] = useState('')
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    resumeApi.list().then(data => {
      setResumes(data)
    }).catch(() => {})
  }, [])

  const handleAnalyze = async () => {
    if (!resumeContent.trim()) return
    setIsAnalyzing(true)
    try {
      const response = await resumeApi.analyze(resumeContent, targetJob)
      setAnalysis(response.analysis)
      setResumes([response.resume, ...resumes])
    } catch (error) {
      console.error('分析失败:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleOptimize = async () => {
    if (!resumeContent.trim()) return
    setIsOptimizing(true)
    try {
      const response = await resumeApi.optimize(resumeContent, targetJob)
      setOptimizedContent(response.optimizedContent)
    } catch (error) {
      console.error('优化失败:', error)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await resumeApi.delete(id)
      setResumes(resumes.filter(r => r.id !== id))
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { text: '优秀', color: '#10b981' }
    if (score >= 80) return { text: '良好', color: '#3b82f6' }
    if (score >= 60) return { text: '及格', color: '#f59e0b' }
    return { text: '需改进', color: '#ef4444' }
  }

  const renderAnalyzeTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.inputSection}>
        <div className={styles.inputHeader}>
          <h2 className={styles.sectionTitle}>📄 简历内容</h2>
          <span className={styles.charCount}>{resumeContent.length} 字</span>
        </div>
        <textarea
          className={styles.resumeTextarea}
          value={resumeContent}
          onChange={(e) => setResumeContent(e.target.value)}
          placeholder="请粘贴你的简历内容..."
          rows={12}
        />
        <div className={styles.targetJobInput}>
          <label className={styles.inputLabel}>目标岗位（选填）</label>
          <input
            type="text"
            className={styles.textInput}
            value={targetJob}
            onChange={(e) => setTargetJob(e.target.value)}
            placeholder="例如：前端开发工程师"
          />
        </div>
        <Button className={styles.analyzeBtn} onClick={handleAnalyze} disabled={isAnalyzing || !resumeContent.trim()}>
          {isAnalyzing ? 'AI分析中...' : '🤖 AI分析简历'}
        </Button>
      </div>

      {analysis && (
        <div className={styles.resultSection}>
          <Card className={styles.scoreCard}>
            <div className={styles.scoreHeader}>
              <div className={styles.scoreCircle} style={{ background: getScoreColor(analysis.score) }}>
                {analysis.score}
              </div>
              <div className={styles.scoreInfo}>
                <span className={styles.scoreLevel} style={{ color: getScoreLevel(analysis.score).color }}>
                  {getScoreLevel(analysis.score).text}
                </span>
                <span className={styles.scoreLabel}>简历综合评分</span>
              </div>
            </div>
          </Card>

          <Card className={styles.dimensionsCard}>
            <h3 className={styles.cardTitle}>📊 分项评分</h3>
            <div className={styles.dimensionsList}>
              {analysis.dimensions.map((dim, i) => (
                <div key={i} className={styles.dimensionItem}>
                  <div className={styles.dimensionHeader}>
                    <span className={styles.dimensionName}>{dim.name}</span>
                    <span className={styles.dimensionScore} style={{ color: getScoreColor(dim.score) }}>
                      {dim.score}分
                    </span>
                  </div>
                  <ProgressBar value={dim.score} size="sm" />
                  <p className={styles.dimensionComment}>{dim.comment}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.suggestionsCard}>
            <h3 className={styles.cardTitle}>💡 优化建议</h3>
            <ul className={styles.suggestionsList}>
              {analysis.suggestions.map((s, i) => (
                <li key={i} className={styles.suggestionItem}>
                  <span className={styles.suggestionIcon}>📌</span>
                  <span className={styles.suggestionText}>{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  )

  const renderOptimizeTab = () => (
    <div className={styles.tabContent}>
      <div className={styles.inputSection}>
        <div className={styles.inputHeader}>
          <h2 className={styles.sectionTitle}>📝 原始简历</h2>
          <span className={styles.charCount}>{resumeContent.length} 字</span>
        </div>
        <textarea
          className={styles.resumeTextarea}
          value={resumeContent}
          onChange={(e) => setResumeContent(e.target.value)}
          placeholder="请粘贴你的简历内容..."
          rows={10}
        />
        <div className={styles.targetJobInput}>
          <label className={styles.inputLabel}>目标岗位</label>
          <input
            type="text"
            className={styles.textInput}
            value={targetJob}
            onChange={(e) => setTargetJob(e.target.value)}
            placeholder="例如：前端开发工程师"
          />
        </div>
        <Button className={styles.analyzeBtn} onClick={handleOptimize} disabled={isOptimizing || !resumeContent.trim()}>
          {isOptimizing ? 'AI优化中...' : '✨ AI优化简历'}
        </Button>
      </div>

      {optimizedContent && (
        <Card className={styles.optimizedCard}>
          <h3 className={styles.cardTitle}>🎯 优化后简历</h3>
          <pre className={styles.optimizedContent}>{optimizedContent}</pre>
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(optimizedContent)}>
            📋 复制内容
          </Button>
        </Card>
      )}
    </div>
  )

  const renderHistoryTab = () => (
    <div className={styles.tabContent}>
      {resumes.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>📄</span>
          <p className={styles.emptyText}>暂无简历记录</p>
          <Button variant="outline" onClick={() => setTab('analyze')}>去分析简历</Button>
        </div>
      ) : (
        <div className={styles.historyList}>
          {resumes.map(resume => (
            <Card key={resume.id} className={styles.historyCard}>
              <div className={styles.historyHeader}>
                <div className={styles.historyInfo}>
                  <span className={styles.historyTitle}>
                    {resume.targetJob || '未指定目标岗位'}
                  </span>
                  <span className={styles.historyDate}>
                    {new Date(resume.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                {resume.analysisScore > 0 && (
                  <span className={styles.historyScore} style={{ color: getScoreColor(resume.analysisScore) }}>
                    {resume.analysisScore}分
                  </span>
                )}
              </div>
              <p className={styles.historyPreview}>
                {resume.content.substring(0, 100)}...
              </p>
              <div className={styles.historyActions}>
                {resume.optimizedContent && (
                  <Button variant="outline" size="sm" onClick={() => {
                    setOptimizedContent(resume.optimizedContent!)
                    setTab('optimize')
                  }}>
                    查看优化
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => handleDelete(resume.id)}>
                  删除
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  const tabs = [
    { id: 'analyze' as Tab, label: 'AI分析', icon: '📊' },
    { id: 'optimize' as Tab, label: 'AI优化', icon: '✨' },
    { id: 'history' as Tab, label: '历史记录', icon: '📋' },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.tabs}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className={styles.tabIcon}>{t.icon}</span>
            <span className={styles.tabLabel}>{t.label}</span>
          </button>
        ))}
      </div>

      {tab === 'analyze' && renderAnalyzeTab()}
      {tab === 'optimize' && renderOptimizeTab()}
      {tab === 'history' && renderHistoryTab()}
    </div>
  )
}