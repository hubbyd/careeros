import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import { generateInterviewQuestion, evaluateInterviewAnswer, generateInterviewReport } from '../services/aiService'

const router = Router()

router.get('/sessions', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await prisma.interviewSession.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    res.json(sessions)
  } catch {
    res.status(500).json({ error: '获取面试记录失败' })
  }
})

router.get('/sessions/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }
    res.json(session)
  } catch {
    res.status(500).json({ error: '获取面试记录失败' })
  }
})

router.post('/sessions', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { jobTitle, company } = req.body

  if (!jobTitle) {
    return res.status(400).json({ error: '目标岗位必填' })
  }

  try {
    const session = await prisma.interviewSession.create({
      data: {
        userId: req.userId!,
        jobTitle,
        company: company || '',
        questions: JSON.stringify([]),
        answers: JSON.stringify([]),
      },
    })

    const question = await generateInterviewQuestion(jobTitle, company || '')

    res.status(201).json({ session, question, isFallback: false })
  } catch (error) {
    console.error('AI面试问题生成失败:', error)

    const session = await prisma.interviewSession.create({
      data: {
        userId: req.userId!,
        jobTitle,
        company: company || '',
        questions: JSON.stringify([]),
        answers: JSON.stringify([]),
      },
    })

    const question = generateFallbackQuestion(jobTitle)

    res.status(201).json({ session, question, isFallback: true })
  }
})

router.post('/sessions/:id/answer', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { question, answer, questionType } = req.body

  if (!question || !answer) {
    return res.status(400).json({ error: '问题和回答都不能为空' })
  }

  try {
    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }

    const feedback = await evaluateInterviewAnswer(question, answer, session.jobTitle)

    const questions = JSON.parse(session.questions || '[]')
    const answers = JSON.parse(session.answers || '[]')

    questions.push({ question, questionType: questionType || '综合' })
    answers.push({ answer, feedback })

    await prisma.interviewSession.update({
      where: { id: req.params.id },
      data: {
        questions: JSON.stringify(questions),
        answers: JSON.stringify(answers),
      },
    })

    const nextQuestion = await generateInterviewQuestion(session.jobTitle, session.company)

    res.json({ feedback, nextQuestion, isFallback: false })
  } catch (error) {
    console.error('AI面试评价失败:', error)

    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }

    const feedback = generateFallbackFeedback(answer)

    const questions = JSON.parse(session.questions || '[]')
    const answers = JSON.parse(session.answers || '[]')

    questions.push({ question, questionType: questionType || '综合' })
    answers.push({ answer, feedback })

    await prisma.interviewSession.update({
      where: { id: req.params.id },
      data: {
        questions: JSON.stringify(questions),
        answers: JSON.stringify(answers),
      },
    })

    const nextQuestion = generateFallbackQuestion(session.jobTitle)

    res.json({ feedback, nextQuestion, isFallback: true })
  }
})

router.post('/sessions/:id/finish', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }

    const questions = JSON.parse(session.questions || '[]')
    const answers = JSON.parse(session.answers || '[]')

    const questionTexts = questions.map((q: any) => q.question)
    const answerTexts = answers.map((a: any) => a.answer)
    const feedbackTexts = answers.map((a: any) => a.feedback?.feedback || '')

    let report
    try {
      report = await generateInterviewReport(questionTexts, answerTexts, feedbackTexts, session.jobTitle)
    } catch {
      report = generateFallbackReport(session.jobTitle, answers)
    }

    await prisma.interviewSession.update({
      where: { id: req.params.id },
      data: {
        status: 'completed',
        report: JSON.stringify(report),
      },
    })

    await prisma.growthRecord.create({
      data: {
        userId: req.userId!,
        type: 'interview',
        content: JSON.stringify({
          type: '模拟面试',
          jobTitle: session.jobTitle,
          score: report.overallScore,
          questionCount: questions.length,
        }),
      },
    })

    res.json(report)
  } catch (error) {
    console.error('生成面试报告失败:', error)
    res.status(500).json({ error: '生成面试报告失败' })
  }
})

router.delete('/sessions/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }

    await prisma.interviewSession.delete({
      where: { id: req.params.id },
    })

    res.json({ message: '删除成功' })
  } catch {
    res.status(500).json({ error: '删除失败' })
  }
})

function generateFallbackQuestion(jobTitle: string): any {
  const questions: Record<string, string[]> = {
    '前端': [
      '请解释什么是闭包（Closure）？',
      'React 和 Vue 的主要区别是什么？',
      '请解释事件循环（Event Loop）的机制？',
      'CSS 中 flex 和 grid 的区别是什么？',
      '如何优化网页加载性能？',
    ],
    '后端': [
      '请解释 TCP/IP 三次握手的过程？',
      '数据库索引的作用是什么？如何创建有效的索引？',
      '什么是 RESTful API？有哪些设计原则？',
      '如何保证分布式系统的数据一致性？',
      '什么是微服务架构？有哪些优缺点？',
    ],
    '算法': [
      '请实现一个快速排序算法？',
      '什么是动态规划？举一个应用场景？',
      '如何判断一个链表是否有环？',
      '二叉树的三种遍历方式是什么？',
      '什么是时间复杂度和空间复杂度？',
    ],
    '产品': [
      '你是如何进行需求分析的？',
      '如何处理需求冲突？',
      '你做过最成功的产品是什么？为什么？',
      '如何衡量产品的成功？',
      '你如何理解用户体验？',
    ],
  }

  let category = '综合'
  if (jobTitle.includes('前端')) category = '前端'
  else if (jobTitle.includes('后端') || jobTitle.includes('开发')) category = '后端'
  else if (jobTitle.includes('算法')) category = '算法'
  else if (jobTitle.includes('产品')) category = '产品'

  const questionList = questions[category] || questions['后端']
  const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)]

  return {
    question: randomQuestion,
    questionType: category,
    expectedPoints: ['回答思路清晰', '技术深度', '表达能力'],
  }
}

function generateFallbackFeedback(answer: string): any {
  const length = answer.length
  let score = 60
  let feedback = '回答基本合理，建议进一步完善。'

  if (length > 200) {
    score = 80
    feedback = '回答内容丰富，思路清晰。建议增加更多技术细节和实践经验。'
  } else if (length > 100) {
    score = 70
    feedback = '回答比较完整，但可以更深入一些。'
  } else if (length > 50) {
    score = 60
    feedback = '回答比较简短，建议展开说明。'
  } else {
    score = 40
    feedback = '回答过于简略，建议详细阐述。'
  }

  return {
    score,
    feedback,
    improvements: ['建议增加具体例子', '提高技术深度', '注意表达逻辑'],
    sampleAnswer: '这是一个很好的问题！参考回答应包含核心概念解释、实际应用场景和最佳实践。',
  }
}

function generateFallbackReport(jobTitle: string, answers: any[]): any {
  const avgScore = answers.length > 0
    ? Math.round(answers.reduce((sum, a) => sum + (a.feedback?.score || 0), 0) / answers.length)
    : 0

  return {
    summary: `你完成了针对【${jobTitle}】岗位的模拟面试，共回答了${answers.length}个问题。`,
    strengths: ['态度积极', '回答思路比较清晰'],
    weaknesses: ['部分问题回答不够深入', '可以增加更多实际案例'],
    suggestions: ['建议针对薄弱环节加强学习', '多进行模拟面试练习', '注意回答的结构和逻辑'],
    overallScore: avgScore,
  }
}

export default router