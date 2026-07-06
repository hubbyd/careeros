import { useMemo } from 'react'

export function useGreeting() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 6) return '夜深了，注意休息 🌙'
    if (hour < 9) return '早安，开启新的一天 ☀️'
    if (hour < 12) return '上午好，加油学习 💪'
    if (hour < 14) return '午安，记得午休 😴'
    if (hour < 18) return '下午好，继续冲刺 🚀'
    if (hour < 22) return '晚上好，复盘今天的收获 📊'
    return '夜深了，早点休息吧 🌙'
  }, [])

  return greeting
}