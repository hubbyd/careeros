import styles from './ProgressRing.module.css'

interface Props {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0-1
  color?: string;
  children?: React.ReactNode;
}

export default function ProgressRing({
  size = 120,
  strokeWidth = 8,
  progress,
  color = 'var(--primary)',
  children,
}: Props) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.min(progress, 1))

  return (
    <div className={styles.wrapper} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={styles.svg}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-soft)"
          stroke-width={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          stroke-width={strokeWidth}
          stroke-linecap="round"
          stroke-dasharray={circumference}
          stroke-dashoffset={offset}
          className={styles.progressCircle}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  )
}
