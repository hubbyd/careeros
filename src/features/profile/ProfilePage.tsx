import { useState, useEffect } from 'react'
import { useUserStore } from '../../stores/useUserStore'
import { useQuestionStore } from '../../stores/useQuestionStore'
import { useStudyStore } from '../../stores/useStudyStore'
import { growthApi } from '../../api'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { GrowthRecord } from '../../types'
import styles from './ProfilePage.module.css'

const radarData = [
  { skill: 'JavaScript', value: 82 },
  { skill: 'React', value: 78 },
  { skill: 'CSS', value: 70 },
  { skill: '算法', value: 55 },
  { skill: '系统设计', value: 42 },
  { skill: '沟通表达', value: 88 },
]

const growthData = [
  { month: '3月', score: 45 },
  { month: '4月', score: 52 },
  { month: '5月', score: 61 },
  { month: '6月', score: 68 },
  { month: '7月', score: 75 },
]

const typeIcons: Record<string, string> = {
  diagnosis: '🎯',
  resume: '📄',
  interview: '💬',
  learning: '📚',
  study: '📖',
  checkin: '✅',
  application: '📝',
}

const typeLabels: Record<string, string> = {
  diagnosis: '职业诊断',
  resume: '简历优化',
  interview: '模拟面试',
  learning: '学习计划',
  study: '学习打卡',
  checkin: '打卡',
  application: '职位投递',
}

export default function ProfilePage() {
  const profile = useUserStore((s) => s.profile)
  const masteryRate = useQuestionStore((s) => s.getMasteryRate())
  const streak = useStudyStore((s) => s.streak.current)
  const [records, setRecords] = useState<GrowthRecord[]>([])

  useEffect(() => {
    growthApi.records().then(data => {
      setRecords(data)
    }).catch(() => {})
  }, [])

  const handleDeleteRecord = async (id: string) => {
    try {
      await growthApi.deleteRecord(id)
      setRecords(records.filter(r => r.id !== id))
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const parseContent = (content: string) => {
    try {
      const parsed = JSON.parse(content)
      if (typeof parsed === 'object') {
        return parsed
      }
    } catch {}
    return content
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return '今天'
    if (days === 1) return '昨天'
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString('zh-CN')
  }

  if (!profile) return null

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className={styles.avatar}>{profile.avatar}</div>
        <div className={styles.name}>{profile.name}</div>
        <div className={styles.title}>{profile.title}</div>
        <div className={styles.joinDate}>加入于 {profile.joinDate}</div>
      </section>

      <section className={styles.statsRow}>
        {[
          { label: '掌握率', value: `${masteryRate}%`, color: '#FF6B35' },
          { label: '打卡天数', value: `${streak}`, color: '#EF476F' },
          { label: '投递数', value: '12', color: '#118AB2' },
          { label: 'Offer', value: '1', color: '#06D6A0' },
        ].map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statVal} style={{ color: s.color }}>
              {s.value}
            </div>
            <div className={styles.statLbl}>{s.label}</div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📡 能力雷达图</h3>
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={100}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="能力值"
                dataKey="value"
                stroke="#FF6B35"
                fill="#FF6B35"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📈 月度成长曲线</h3>
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={growthData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B35" />
                  <stop offset="100%" stopColor="#FF9F1C" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🗂️ 项目经历</h3>
        <div className={styles.projectCard}>
          <div className={styles.projectName}>JobSprint 求职冲刺 App</div>
          <div className={styles.projectRole}>前端开发 · 个人项目</div>
          <div className={styles.projectDesc}>
            独立设计并开发个人求职管理 App，包含 6 大功能模块，采用 React + Zustand 架构。
          </div>
          <div className={styles.projectTags}>
            {['React', 'TypeScript', 'Vite', 'Recharts'].map((t) => (
              <span key={t} className={styles.projectTag}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📝 成长记录</h3>
        {records.length === 0 ? (
          <div className={styles.emptyRecords}>
            <span>🌱</span>
            <span>暂无成长记录</span>
          </div>
        ) : (
          <div className={styles.recordList}>
            {records.map(record => {
              const content = parseContent(record.content)
              const icon = typeIcons[record.type] || '📌'
              const label = typeLabels[record.type] || record.type
              
              return (
                <div key={record.id} className={styles.recordItem}>
                  <div className={styles.recordIcon}>{icon}</div>
                  <div className={styles.recordContent}>
                    <div className={styles.recordHeader}>
                      <span className={styles.recordLabel}>{label}</span>
                      <span className={styles.recordDate}>{formatDate(record.createdAt)}</span>
                    </div>
                    <p className={styles.recordText}>
                      {typeof content === 'object' && content.summary 
                        ? content.summary 
                        : typeof content === 'object' && content.type
                          ? content.type
                          : content}
                    </p>
                    {typeof content === 'object' && content.matches && content.matches.length > 0 && (
                      <div className={styles.recordTags}>
                        {content.matches.slice(0, 3).map((m: any, i: number) => (
                          <span key={i} className={styles.recordTag}>{m}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className={styles.recordDelete} onClick={() => handleDeleteRecord(record.id)}>
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}