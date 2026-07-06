import styles from './Badge.module.css'

interface Props {
  emoji: string
  label: string
  unlocked?: boolean
}

export default function Badge({ emoji, label, unlocked = true }: Props) {
  return (
    <div className={`${styles.badge} ${!unlocked ? styles.locked : ''}`}>
      <div className={styles.emoji}>{unlocked ? emoji : '🔒'}</div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}