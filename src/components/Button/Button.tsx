import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'text'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  variant?: Variant
  size?: Size
  disabled?: boolean
  className?: string
  loading?: boolean
  icon?: React.ReactNode
  block?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  loading = false,
  icon,
  block = false,
}: Props) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${disabled || loading ? styles.disabled : ''} ${block ? styles.block : ''} ${className || ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className={styles.spinner} />}
      {icon && !loading && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}