import { useStudyStore } from '../stores/useStudyStore'

export function useStreak() {
  const streak = useStudyStore((s) => s.streak)
  const checkIn = useStudyStore((s) => s.checkIn)

  const canCheckIn = streak.lastCheckIn !== new Date().toISOString().slice(0, 10)

  return {
    current: streak.current,
    longest: streak.longest,
    lastCheckIn: streak.lastCheckIn,
    calendar: streak.calendar,
    canCheckIn,
    checkIn,
  }
}