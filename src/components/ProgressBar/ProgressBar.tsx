import styles from './ProgressBar.module.css'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  progress?: number
  value?: number
  label?: string
  showPercent?: boolean
  color?: string
  size?: Size
  max?: number
}

export default function ProgressBar({
  progress,
  value,
  label,
  showPercent = false,
  color = 'var(--primary)',
  size = 'md',
  max = 100,
}: Props) {
  const actualValue = value ?? progress ?? 0
  const percentage = max !== 100 ? (actualValue / max) * 100 : actualValue
  
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.barBg}>
        <div
          className={styles.barFill}
          style={{ width: `${Math.min(percentage, 100)}%`, background: color }}
        />
      </div>
      {showPercent && <div className={styles.percent}>{Math.round(percentage)}%</div>}
    </div>
  )
}