export const quotes = [
  '今天的努力，是明天 Offer 的底气 💪',
  '每一次投递，都离梦想更近一步 🚀',
  '算法题不会？刷！面试紧张？练！🔥',
  '你比昨天的自己更强，这就够了 ⭐',
  '大厂不是终点，成长才是永恒 🌱',
  '坚持就是胜利，加油！✨',
  '机会留给有准备的人 🎯',
  '每天进步一点点，积累成就大飞跃 📈',
  '自信源于实力，实力源于积累 💎',
  '求职路上，你不是一个人 💙',
]

export function getDailyQuote(): string {
  const index = Math.floor(Date.now() / 86400000) % quotes.length
  return quotes[index]
}