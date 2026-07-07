import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authApi } from '../../api'
import styles from './AuthPage.module.css'

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!token) {
      setError('无效的重置链接')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      setLoading(false)
      return
    }

    try {
      await authApi.resetPassword(token, password)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || '重置失败')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>✅</div>
          <h1 className={styles.title}>密码重置成功</h1>
          <p className={styles.subtitle}>您的密码已更新</p>
          
          <div className={styles.success}>
            <p>密码重置成功，请使用新密码登录</p>
          </div>

          <button
            onClick={() => navigate('/login')}
            className={styles.submitBtn}
          >
            返回登录
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>🔐</div>
        <h1 className={styles.title}>重置密码</h1>
        <p className={styles.subtitle}>设置新密码</p>

        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={() => setError('')} className={styles.errorClose}>✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>新密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入新密码（至少6位）"
              required
              minLength={6}
            />
          </div>
          <div className={styles.field}>
            <label>确认密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="请再次输入新密码"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '重置中...' : '重置密码'}
          </button>
        </form>

        <p className={styles.switch}>
          <a href="/login">返回登录</a>
        </p>
      </div>
    </div>
  )
}
