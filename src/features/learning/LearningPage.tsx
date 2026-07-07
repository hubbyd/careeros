import { useState, useEffect } from 'react'
import { learningApi } from '../../api'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Tag from '../../components/Tag/Tag'
import { SearchIcon, BookIcon } from '../../components/Icons'
import type { LearningPlan } from '../../types'
import styles from './LearningPage.module.css'

export default function LearningPage() {
  const [plans, setPlans] = useState<LearningPlan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<LearningPlan | null>(null)
  const [activeTab, setActiveTab] = useState<'discover' | 'my'>('discover')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    learningApi.plans().then(data => {
      setPlans(data)
    }).catch(() => {})
  }, [])

  const handleCreatePlan = async () => {
    setIsLoading(true)
    try {
      const response = await learningApi.createPlan('前端开发工程师')
      setPlans([response, ...plans])
      setSelectedPlan(response)
    } catch (error) {
      console.error('创建计划失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProgress = async (id: string, progress: number) => {
    setIsLoading(true)
    try {
      await learningApi.updatePlan(id, progress)
      setPlans(plans.map(p => p.id === id ? { ...p, progress } : p))
    } catch (error) {
      console.error('更新进度失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePlan = async (id: string) => {
    try {
      await learningApi.deletePlan(id)
      setPlans(plans.filter(p => p.id !== id))
      if (selectedPlan?.id === id) {
        setSelectedPlan(null)
      }
    } catch (error) {
      console.error('删除计划失败:', error)
    }
  }

  const renderDiscover = () => (
    <div className={styles.discover}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>📚 学习路线</h1>
        <p className={styles.sectionDesc}>探索适合你的学习路径</p>
      </div>

      <Card className={styles.createCard}>
        <div className={styles.createIcon}>✨</div>
        <div className={styles.createContent}>
          <h3 className={styles.createTitle}>创建专属学习计划</h3>
          <p className={styles.createDesc}>根据你的目标岗位，AI为你生成个性化学习路线</p>
        </div>
        <Button size="lg" onClick={handleCreatePlan} disabled={isLoading}>
          {isLoading ? '创建中...' : '🚀 创建计划'}
        </Button>
      </Card>

      <div className={styles.pathList}>
        {plans.map(plan => (
          <Card key={plan.id} className={styles.pathCard}>
            <div className={styles.pathHeader}>
              <div className={styles.pathIcon}>🎯</div>
              <div className={styles.pathInfo}>
                <h3 className={styles.pathTitle}>{plan.targetJob}</h3>
                <span className={styles.pathTimeline}>⏱️ {plan.timeline || '自定义时间'}</span>
              </div>
            </div>
            
            <div className={styles.pathProgress}>
              <ProgressBar value={plan.progress || 0} size="sm" />
              <span className={styles.progressText}>{plan.progress || 0}%</span>
            </div>

            <div className={styles.pathActions}>
              <Button size="sm" onClick={() => setSelectedPlan(plan)}>查看详情</Button>
              <Button size="sm" variant="outline" onClick={() => handleDeletePlan(plan.id)}>删除</Button>
            </div>
          </Card>
        ))}
      </div>

      {plans.length === 0 && (
        <div className={styles.emptyState}>
          <span>📚</span>
          <p>还没有学习计划</p>
          <Button onClick={handleCreatePlan}>创建第一个计划 →</Button>
        </div>
      )}
    </div>
  )

  const renderMyLearning = () => (
    <div className={styles.myLearning}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>📝 我的学习</h1>
      </div>

      {plans.length > 0 ? (
        <div className={styles.pathList}>
          {plans.map(plan => (
            <Card key={plan.id} className={styles.pathCard}>
              <div className={styles.pathHeader}>
                <div className={styles.pathIcon}>🎯</div>
                <div className={styles.pathInfo}>
                  <h3 className={styles.pathTitle}>{plan.targetJob}</h3>
                  <span className={styles.pathDate}>{new Date(plan.createdAt).toLocaleDateString('zh-CN')}</span>
                </div>
              </div>
              <div className={styles.pathProgress}>
                <ProgressBar value={plan.progress || 0} size="sm" />
                <span className={styles.progressText}>{plan.progress || 0}%</span>
              </div>
              <Button onClick={() => setSelectedPlan(plan)}>查看详情 →</Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span>📚</span>
          <p>还没有开始学习</p>
          <Button onClick={() => setActiveTab('discover')}>去探索 →</Button>
        </div>
      )}
    </div>
  )

  const renderPlanDetail = () => {
    if (!selectedPlan) return null

    return (
      <div className={styles.pathDetail}>
        <div className={styles.detailHeader}>
          <button className={styles.backBtn} onClick={() => setSelectedPlan(null)}>← 返回</button>
          <div className={styles.detailTitle}>
            <span className={styles.detailIcon}>🎯</span>
            <h1>{selectedPlan.targetJob}</h1>
          </div>
        </div>

        <Card className={styles.detailInfo}>
          <div className={styles.detailMeta}>
            <div className={styles.detailMetaItem}>
              <span>⏱️</span>
              <span>{selectedPlan.timeline || '自定义时间'}</span>
            </div>
            <div className={styles.detailMetaItem}>
              <span>📊</span>
              <span>进度 {selectedPlan.progress || 0}%</span>
            </div>
            <div className={styles.detailMetaItem}>
              <span>📅</span>
              <span>创建于 {new Date(selectedPlan.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
          </div>
          <div className={styles.detailProgress}>
            <span className={styles.detailProgressLabel}>学习进度</span>
            <div className={styles.detailProgressBar}>
              <ProgressBar value={selectedPlan.progress || 0} size="lg" />
              <span className={styles.detailProgressText}>{selectedPlan.progress || 0}%</span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={selectedPlan.progress || 0}
            onChange={(e) => handleUpdateProgress(selectedPlan.id, Number(e.target.value))}
            className={styles.progressSlider}
          />
        </Card>

        {selectedPlan.phases && (
          <Card className={styles.courseList}>
            <h3 className={styles.courseListTitle}>📝 学习阶段</h3>
            <div className={styles.phases}>
              {JSON.parse(selectedPlan.phases).map((phase: any, index: number) => (
                <div key={index} className={styles.phaseCard}>
                  <div className={styles.phaseHeader}>
                    <span className={styles.phaseNumber}>{index + 1}</span>
                    <span className={styles.phaseName}>{phase.phase}</span>
                  </div>
                  <span className={styles.phaseDuration}>⏱️ {phase.duration}</span>
                  <h4 className={styles.phaseObjectives}>目标：</h4>
                  <ul className={styles.phaseList}>
                    {phase.objectives.map((obj: string, i: number) => (
                      <li key={i} className={styles.phaseItem}>✓ {obj}</li>
                    ))}
                  </ul>
                  <h4 className={styles.phaseTasks}>任务：</h4>
                  <ul className={styles.phaseList}>
                    {phase.tasks.map((task: string, i: number) => (
                      <li key={i} className={styles.phaseItem}>• {task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedPlan.tasks && (
          <Card className={styles.courseList}>
            <h3 className={styles.courseListTitle}>✅ 任务列表</h3>
            <div className={styles.tasks}>
              {JSON.parse(selectedPlan.tasks).map((task: any, index: number) => (
                <div key={index} className={styles.taskItem}>
                  <input type="checkbox" checked={task.completed} className={styles.taskCheckbox} />
                  <span className={styles.taskText}>{task.title}</span>
                  <Tag variant={task.completed ? 'success' : 'info'}>{task.subject}</Tag>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {selectedPlan ? (
        renderPlanDetail()
      ) : (
        <>
          <div className={styles.tabs}>
            {[
              { key: 'discover', label: '探索', icon: <SearchIcon size={20} /> },
              { key: 'my', label: '我的学习', icon: <BookIcon size={20} /> },
            ].map(tab => (
              <button
                key={tab.key}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.key as 'discover' | 'my')}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === 'discover' && renderDiscover()}
          {activeTab === 'my' && renderMyLearning()}
        </>
      )}
    </div>
  )
}