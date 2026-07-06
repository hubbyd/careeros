import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  variant?: Variant
  size?: Size
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: Props) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ''} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}