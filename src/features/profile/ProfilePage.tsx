// @ts-nocheck
import { useUserStore } from '../../stores/useUserStore'
import { useQuestionStore } from '../../stores/useQuestionStore'
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
  Legend,
} from 'recharts'
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

export default function ProfilePage() {
  const profile = useUserStore((s) => s.profile)
  const masteryRate = useQuestionStore((s) => s.getMasteryRate())

  return (
    <div className={styles.page}>
      {/* Profile Header */}
      <section className={styles.header}>
        <div className={styles.avatar}>{profile.avatar}</div>
        <div className={styles.name}>{profile.name}</div>
        <div className={styles.title}>{profile.title}</div>
        <div className={styles.joinDate}>加入于 {profile.joinDate}</div>
      </section>

      {/* Stats Row */}
      <section className={styles.statsRow}>
        {[
          { label: '掌握率', value: `${masteryRate}%`, color: '#FF6B35' },
          { label: '打卡天数', value: `${profile.streak}`, color: '#EF476F' },
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

      {/* Radar Chart */}
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

      {/* Growth Curve */}
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

      {/* Project Experience */}
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
    </div>
  )
}
