import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { RocketIcon, EyeIcon, EyeOffIcon } from '../../components/Icons'
import styles from './AuthPage.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loadingTime, setLoadingTime] = useState(0)
  const { login, loading, error, clearError } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    const savedEmail = localStorage.getItem('jobsprint_email')
    const savedRemember = localStorage.getItem('jobsprint_remember') === 'true'
    if (savedEmail && savedRemember) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (loading) {
      timer = setInterval(() => {
        setLoadingTime(prev => prev + 1)
      }, 1000)
    } else {
      setLoadingTime(0)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      if (rememberMe) {
        localStorage.setItem('jobsprint_email', email)
        localStorage.setItem('jobsprint_remember', 'true')
      } else {
        localStorage.removeItem('jobsprint_email')
        localStorage.removeItem('jobsprint_remember')
      }
      navigate('/')
    } catch {
      // error is set in store
    }
  }

  const getLoadingText = () => {
    if (loadingTime >= 10) {
      return '服务启动中，请稍候...'
    }
    if (loadingTime >= 5) {
      return '正在连接服务器...'
    }
    return '登录中...'
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
            <div className={styles.passwordField}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>
          <div className={styles.loginOptions}>
            <label className={styles.rememberMe}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>记住我</span>
            </label>
            <a href="/forgot-password" className={styles.forgotPasswordLink}>忘记密码？</a>
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? getLoadingText() : '登录'}
          </button>
        </form>

        <div className={styles.divider}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>或</span>
          <div className={styles.dividerLine}></div>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.socialBtn} onClick={() => alert('微信登录功能开发中')}>
            <span className={styles.socialIcon}>💬</span>
            <span>微信登录</span>
          </button>
          <button className={styles.socialBtn} onClick={() => alert('GitHub登录功能开发中')}>
            <span className={styles.socialIcon}>🐙</span>
            <span>GitHub登录</span>
          </button>
        </div>

        <p className={styles.switch}>
          还没有账号？<a href="/register">立即注册</a>
        </p>
      </div>
    </div>
  )
}
