import { useState } from 'react'
import { useApplicationStore } from '../../stores/useApplicationStore'
import type { AppStatus, Priority, JobApplication } from '../../types'
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
  const removeApplication = useApplicationStore((s) => s.removeApplication)
  const [activePill, setActivePill] = useState<AppStatus | 'all'>('all')
  const [addOpen, setAddOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    company: '',
    position: '',
    salary: '',
    priority: 'medium' as Priority,
    deadline: '',
    notes: '',
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
      notes: form.notes,
    })
    setForm({ company: '', position: '', salary: '', priority: 'medium', deadline: '', notes: '' })
    setAddOpen(false)
  }

  const handleOpenDetail = (app: JobApplication) => {
    setSelectedApp(app)
    setDetailOpen(true)
    setEditing(false)
  }

  const handleEdit = () => {
    if (!selectedApp) return
    setForm({
      company: selectedApp.company,
      position: selectedApp.position,
      salary: selectedApp.salary,
      priority: selectedApp.priority,
      deadline: selectedApp.deadline || '',
      notes: selectedApp.notes,
    })
    setEditing(true)
  }

  const handleSave = () => {
    if (!selectedApp || !form.company || !form.position) return
    const appList = useApplicationStore.getState().applications
    const index = appList.findIndex((a) => a.id === selectedApp.id)
    if (index !== -1) {
      useApplicationStore.getState().applications[index] = {
        ...selectedApp,
        ...form,
        updatedAt: Date.now(),
      }
    }
    setEditing(false)
    setSelectedApp({ ...selectedApp, ...form, updatedAt: Date.now() })
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
          <div key={app.id} className={styles.appCard} onClick={() => handleOpenDetail(app)}>
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
            <div className={styles.formGroup}>
              <label>备注</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="添加备注信息..."
                className={styles.textarea}
                rows={3}
              />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setAddOpen(false)}>取消</button>
              <button className={styles.submitBtn} onClick={handleAdd}>添加</button>
            </div>
          </div>
        </div>
      )}

      {/* 详情弹窗 */}
      {detailOpen && selectedApp && (
        <div className={styles.modalOverlay} onClick={() => setDetailOpen(false)}>
          <div className={styles.detailModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📋 {selectedApp.company}</h3>
              <button onClick={() => setDetailOpen(false)} className={styles.closeBtn}>✕</button>
            </div>

            {!editing ? (
              <>
                <div className={styles.detailSection}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>岗位</span>
                    <span className={styles.detailValue}>{selectedApp.position}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>薪资</span>
                    <span className={styles.detailValue}>{selectedApp.salary}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>状态</span>
                    <div className={styles.statusTag} data-status={selectedApp.status}>
                      {statusLabel[selectedApp.status]}
                    </div>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>优先级</span>
                    <span style={{ color: priorityColor[selectedApp.priority] }}>
                      {selectedApp.priority === 'high' ? '🔴 高' : selectedApp.priority === 'medium' ? '🟡 中' : '🟢 低'}
                    </span>
                  </div>
                  {selectedApp.deadline && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>截止日期</span>
                      <span className={styles.detailValue}>{selectedApp.deadline}</span>
                    </div>
                  )}
                  {selectedApp.notes && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>备注</span>
                      <span className={styles.detailValue}>{selectedApp.notes}</span>
                    </div>
                  )}
                </div>

                <div className={styles.detailSection}>
                  <h4>更新状态</h4>
                  <div className={styles.statusGrid}>
                    {(['pending', 'applied', 'test', 'interview', 'offer', 'rejected'] as AppStatus[]).map((status) => (
                      <button
                        key={status}
                        className={`${styles.statusBtn} ${selectedApp.status === status ? styles.statusBtnActive : ''}`}
                        onClick={() => {
                          updateStatus(selectedApp.id, status)
                          setSelectedApp({ ...selectedApp, status })
                        }}
                      >
                        {statusLabel[status]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button className={styles.editBtn} onClick={handleEdit}>编辑</button>
                  <button className={styles.deleteBtn} onClick={() => {
                    removeApplication(selectedApp.id)
                    setDetailOpen(false)
                  }}>删除</button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.formGroup}>
                  <label>公司名称 *</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>岗位名称 *</label>
                  <input
                    type="text"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
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
                <div className={styles.formGroup}>
                  <label>备注</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={styles.textarea}
                    rows={3}
                  />
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.cancelBtn} onClick={() => setEditing(false)}>取消</button>
                  <button className={styles.submitBtn} onClick={handleSave}>保存</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
