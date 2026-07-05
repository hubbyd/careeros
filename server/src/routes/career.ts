import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// 获取职业测评结果
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const assessment = await prisma.careerAssessment.findUnique({
      where: { userId: req.userId! },
    })
    res.json(assessment)
  } catch {
    res.status(500).json({ error: '获取测评结果失败' })
  }
})

// 提交职业测评
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { major, education, cities, expectedSalary, skills, values } = req.body

  if (!major || !education) {
    return res.status(400).json({ error: '专业和学历必填' })
  }

  try {
    // 生成简单的测评报告（基于规则，不调用 AI）
    const summary = generateCareerReport(major, education, cities, expectedSalary, skills, values)

    const existing = await prisma.careerAssessment.findUnique({
      where: { userId: req.userId! },
    })

    if (existing) {
      const updated = await prisma.careerAssessment.update({
        where: { userId: req.userId! },
        data: {
          major,
          education,
          cities: JSON.stringify(cities),
          expectedSalary,
          skills: JSON.stringify(skills),
          values,
          summary,
        },
      })
      res.json(updated)
    } else {
      const assessment = await prisma.careerAssessment.create({
        data: {
          userId: req.userId!,
          major,
          education,
          cities: JSON.stringify(cities),
          expectedSalary,
          skills: JSON.stringify(skills),
          values,
          summary,
        },
      })
      res.status(201).json(assessment)
    }
  } catch {
    res.status(500).json({ error: '提交测评失败' })
  }
})

// 生成职业测评报告（基于规则）
function generateCareerReport(
  major: string,
  education: string,
  cities: string[],
  expectedSalary: number,
  skills: string[],
  values: string
): string {
  const cityNames = cities.join('、')
  const skillNames = skills.join('、')

  let report = `# 职业测评报告\n\n`
  report += `## 基本信息\n`
  report += `- 专业：${major}\n`
  report += `- 学历：${education}\n`
  report += `- 期望城市：${cityNames}\n`
  report += `- 期望月薪：${expectedSalary}K\n`
  report += `- 核心技能：${skillNames}\n`
  report += `- 职业价值观：${values}\n\n`

  report += `## 推荐方向\n\n`

  // 基于专业推荐
  const recommendations: any[] = []

  if (['计算机科学', '软件工程', '信息技术'].includes(major)) {
    recommendations.push({
      title: '前端开发工程师',
      match: 95,
      reason: '你的专业背景与前端开发高度匹配，建议重点准备 React/Vue 框架',
    })
    recommendations.push({
      title: '后端开发工程师',
      match: 90,
      reason: '计算机系统知识扎实，适合后端开发岗位',
    })
  }

  if (['数据科学', '统计学', '数学'].includes(major)) {
    recommendations.push({
      title: '数据分析师',
      match: 92,
      reason: '数学统计背景强，适合数据分析方向',
    })
    recommendations.push({
      title: '算法工程师',
      match: 85,
      reason: '算法基础扎实，可以往 AI 方向发展',
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: '转码建议',
      match: 75,
      reason: '建议通过培训或自学转入技术岗位，市场需求大',
    })
  }

  recommendations.forEach((r, i) => {
    report += `### ${i + 1}. ${r.title}（匹配度 ${r.match}%）\n`
    report += `${r.reason}\n\n`
  })

  report += `## 行动建议\n\n`
  report += `1. **技能提升**：重点强化 ${skills.slice(0, 3).join('、')} 等核心技能\n`
  report += `2. **项目积累**：至少完成 2-3 个完整项目并部署上线\n`
  report += `3. **简历优化**：突出项目经验和技术栈，量化成果\n`
  report += `4. **面试准备**：刷题 + 模拟面试，建议每天 2-3 题\n\n`

  report += `---\n\n*报告生成时间：${new Date().toLocaleDateString('zh-CN')}*\n`

  return report
}

export default router
