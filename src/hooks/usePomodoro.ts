import { useState, useEffect, useRef, useCallback } from 'react'

interface PomodoroState {
  seconds: number
  isRunning: boolean
  isCompleted: boolean
  totalPomodoros: number
}

export function usePomodoro(initialMinutes = 25) {
  const [seconds, setSeconds] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [totalPomodoros, setTotalPomodoros] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(() => {
    if (isCompleted) {
      setSeconds(initialMinutes * 60)
      setIsCompleted(false)
    }
    setIsRunning(true)
  }, [isCompleted, initialMinutes])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setSeconds(initialMinutes * 60)
    setIsRunning(false)
    setIsCompleted(false)
  }, [initialMinutes])

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!)
            setIsRunning(false)
            setIsCompleted(true)
            setTotalPomodoros((t) => t + 1)
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, seconds])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const progress = 1 - seconds / (initialMinutes * 60)

  return {
    minutes,
    seconds: secs,
    progress,
    isRunning,
    isCompleted,
    totalPomodoros,
    start,
    pause,
    reset,
  }
}