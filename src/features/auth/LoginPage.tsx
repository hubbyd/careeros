import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { RocketIcon } from '../../components/Icons'
import styles from './AuthPage.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error, clearError } = useUserStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch {
      // error is set in store
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}><RocketIcon size={48} /></div>
        <h1 className={styles.title}>求职冲刺</h1>
        <p className={styles.subtitle}>登录你的账号</p>

        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={clearError} className={styles.errorClose}>✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              required
            />
          </div>
          <div className={styles.field}>
            <label>密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              required
            />
          </div>
          <div className={styles.forgotPassword}>
            <a href="/forgot-password">忘记密码？</a>
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className={styles.switch}>
          还没有账号？<a href="/register">立即注册</a>
        </p>
      </div>
    </div>
  )
}
