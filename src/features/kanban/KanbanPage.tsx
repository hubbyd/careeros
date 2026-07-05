import { useState } from 'react'
import { useApplicationStore } from '../../stores/useApplicationStore'
import type { AppStatus, Priority } from '../../types'
import styles from './KanbanPage.module.css'

const pills: { key: AppStatus | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待投递' },
  { key: 'applied', label: '已投递' },
  { key: 'test', label: '笔试中' },
  { key: 'interview', label: '面试中' },
  { key: 'offer', label: 'Offer' },
  { key: 'rejected', label: '未通过' },
]

const priorityColor = { high: '#EF476F', medium: '#FF9F1C', low: '#06D6A0' }

export default function KanbanPage() {
  const applications = useApplicationStore((s) => s.applications)
  const addApplication = useApplicationStore((s) => s.addApplication)
  const updateStatus = useApplicationStore((s) => s.updateStatus)
  const [activePill, setActivePill] = useState<AppStatus | 'all'>('all')
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState({
    company: '',
    position: '',
    salary: '',
    priority: 'medium' as Priority,
    deadline: '',
  })

  const filtered =
    activePill === 'all' ? applications : applications.filter((a) => a.status === activePill)

  const statusLabel: Record<string, string> = {
    pending: '待投递', applied: '已投递', test: '笔试中', interview: '面试中', offer: 'Offer', rejected: '未通过',
  }

  const handleAdd = () => {
    if (!form.company || !form.position) return
    addApplication({
      company: form.company,
      position: form.position,
      salary: form.salary || '面议',
      status: 'pending',
      priority: form.priority,
      deadline: form.deadline || undefined,
      progress: 0,
      notes: '',
    })
    setForm({ company: '', position: '', salary: '', priority: 'medium', deadline: '' })
    setAddOpen(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>求职进度</h2>
        <span className={styles.count}>{applications.length} 个机会</span>
      </div>

      {/* 状态筛选 */}
      <div className={styles.pillRow}>
        {pills.map((p) => (
          <button
            key={p.key}
            className={`${styles.pill} ${activePill === p.key ? styles.pillActive : ''}`}
            onClick={() => setActivePill(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 卡片列表 */}
      <div className={styles.cardList}>
        {filtered.map((app) => (
          <div key={app.id} className={styles.appCard}>
            <div
              className={styles.priorityBar}
              style={{ background: priorityColor[app.priority] }}
            />
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <div className={styles.company}>{app.company}</div>
                <div className={styles.statusTag} data-status={app.status}>
                  {statusLabel[app.status]}
                </div>
              </div>
              <div className={styles.position}>{app.position}</div>
              <div className={styles.meta}>
                <span>💰 {app.salary}</span>
                {app.deadline && <span>⏰ {app.deadline}</span>}
              </div>
              <div className={styles.progressRow}>
                <div className={styles.progressBg}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${app.progress}%` }}
                    data-priority={app.priority}
                  />
                </div>
                <span className={styles.progressPct}>{app.progress}%</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📭</div>
            <div>暂无记录</div>
          </div>
        )}
      </div>

      {/* 添加按钮 */}
      <button className={styles.addBtn} onClick={() => setAddOpen(true)}>+ 添加机会</button>

      {/* 添加弹窗 */}
      {addOpen && (
        <div className={styles.modalOverlay} onClick={() => setAddOpen(false)}>
          <div className={styles.addModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>➕ 添加求职机会</h3>
              <button onClick={() => setAddOpen(false)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.formGroup}>
              <label>公司名称 *</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="如：腾讯"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>岗位名称 *</label>
              <input
                type="text"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                placeholder="如：前端开发工程师"
                className={styles.input}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>薪资范围</label>
                <input
                  type="text"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  placeholder="如：15-25K"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>截止日期</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>优先级</label>
              <div className={styles.priorityRow}>
                {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    className={`${styles.priorityBtn} ${form.priority === p ? styles.priorityActive : ''}`}
                    style={{ '--pc': p === 'high' ? '#EF476F' : p === 'medium' ? '#FF9F1C' : '#06D6A0' } as any}
                    onClick={() => setForm({ ...form, priority: p })}
                  >
                    {p === 'high' ? '🔴 高' : p === 'medium' ? '🟡 中' : '🟢 低'}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setAddOpen(false)}>取消</button>
              <button className={styles.submitBtn} onClick={handleAdd}>添加</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
