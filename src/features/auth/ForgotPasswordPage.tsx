import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api'
import styles from './AuthPage.module.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [resetUrl, setResetUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await authApi.forgotPassword(email)
      setSuccess(true)
      setResetUrl(result.resetUrl || '')
    } catch (err: any) {
      setError(err.message || '发送失败')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>✉️</div>
          <h1 className={styles.title}>找回密码</h1>
          <p className={styles.subtitle}>重置密码链接已发送</p>
          
          <div className={styles.success}>
            <p>我们已向 {email} 发送了重置密码链接</p>
            {resetUrl && (
              <div className={styles.resetLink}>
                <p>重置链接：</p>
                <a href={resetUrl} target="_blank" rel="noopener noreferrer">
                  {resetUrl}
                </a>
              </div>
            )}
            <p className={styles.successSub}>链接有效期为 1 小时</p>
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
        <div className={styles.logo}>🔑</div>
        <h1 className={styles.title}>找回密码</h1>
        <p className={styles.subtitle}>输入您的注册邮箱</p>

        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={() => setError('')} className={styles.errorClose}>✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入注册邮箱"
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '发送中...' : '发送重置链接'}
          </button>
        </form>

        <p className={styles.switch}>
          <a href="/login">返回登录</a>
        </p>
      </div>
    </div>
  )
}
