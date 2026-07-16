import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authApi } from '../../api'
import { EyeIcon, EyeOffIcon } from '../../components/Icons'
import styles from './AuthPage.module.css'

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!password) {
      setPasswordStrength(null)
      return
    }
    
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    
    if (score <= 2) setPasswordStrength('weak')
    else if (score <= 4) setPasswordStrength('medium')
    else setPasswordStrength('strong')
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!token) {
      setError('无效的重置链接')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('密码长度至少为6位')
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

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return '#EF4444'
      case 'medium': return '#F59E0B'
      case 'strong': return '#10B981'
      default: return '#D1D5DB'
    }
  }

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return '弱'
      case 'medium': return '中等'
      case 'strong': return '强'
      default: return ''
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
            <div className={styles.passwordField}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入新密码（至少6位）"
                required
                minLength={6}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            
            {password && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  <div 
                    className={styles.strengthFill} 
                    style={{ 
                      width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%',
                      backgroundColor: getStrengthColor()
                    }}
                  ></div>
                </div>
                <span className={styles.strengthText} style={{ color: getStrengthColor() }}>
                  {getStrengthText()}
                </span>
              </div>
            )}
          </div>
          <div className={styles.field}>
            <label>确认密码</label>
            <div className={styles.passwordField}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入新密码"
                required
                minLength={6}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <span className={styles.passwordMatchError}>密码不一致</span>
            )}
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading || !password || !confirmPassword}>
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
