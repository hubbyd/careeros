import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore'
import { RocketIcon } from '../../components/Icons'
import styles from './AuthPage.module.css'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loadingTime, setLoadingTime] = useState(0)
  const { register, loading, error, clearError } = useUserStore()
  const navigate = useNavigate()

  // 记录加载时间，超过5秒显示提示
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
      await register(email, password, name)
      navigate('/onboarding')
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
    return '注册中...'
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}><RocketIcon size={48} /></div>
        <h1 className={styles.title}>求职冲刺</h1>
        <p className={styles.subtitle}>创建你的账号</p>

        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={clearError} className={styles.errorClose}>✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入姓名"
              required
            />
          </div>
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
              placeholder="至少 6 位"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? getLoadingText() : '注册'}
          </button>
        </form>

        <p className={styles.switch}>
          已有账号？<a href="/login">去登录</a>
        </p>
      </div>
    </div>
  )
}
