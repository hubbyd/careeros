export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  })
}

export function getToday(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getWeekDays(): string[] {
  const days: string[] = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

export function getWeekLabels(): string[] {
  const labels: string[] = []
  const today = new Date()
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    labels.push(weekDays[d.getDay()])
  }
  return labels
}

export function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2
}

export function isToday(dateStr: string): boolean {
  return dateStr === getToday()
}

export function getDaysBetween(start: string, end: string): number {
  const s = new Date(start)
  const e = new Date(end)
  return Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
}