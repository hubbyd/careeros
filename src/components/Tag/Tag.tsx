import styles from './Tag.module.css'

type Color = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple'

interface Props {
  children: React.ReactNode
  color?: Color
  variant?: Color | string
  className?: string
}

export default function Tag({ children, color = 'primary', variant, className }: Props) {
  const actualColor = variant || color
  return (
    <span className={`${styles.tag} ${styles[actualColor] || styles.primary} ${className || ''}`}>
      {children}
    </span>
  )
}