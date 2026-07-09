import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import { generateInterviewQuestion, evaluateInterviewAnswer, generateInterviewReport } from '../services/aiService'
import { getLocalQuestions, LocalQuestion } from '../data/interviewQuestions'

const router = Router()

router.get('/sessions', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await prisma.interviewSession.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        interviewQuestions: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })
    res.json(sessions.map(s => ({
      id: s.id,
      userId: s.userId,
      jobTitle: s.jobTitle,
      company: s.company,
      level: s.level,
      status: s.status,
      questionCount: s.interviewQuestions.length,
      createdAt: s.createdAt,
    })))
  } catch {
    res.status(500).json({ error: '获取面试记录失败' })
  }
})

router.get('/sessions/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
      include: {
        interviewQuestions: {
          orderBy: { createdAt: 'asc' },
        },
      },
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
  const { jobTitle, company, level, questionCount = 5 } = req.body

  if (!jobTitle) {
    return res.status(400).json({ error: '目标岗位必填' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
    })

    if (!user) {
      return res.status(401).json({ error: '登录已过期，请重新登录' })
    }

    const session = await prisma.interviewSession.create({
      data: {
        userId: req.userId!,
        jobTitle,
        company: company || '',
        level: level || 'entry',
      },
    })

    const questions: LocalQuestion[] = []
    let aiSuccessCount = 0
    let aiAttempted = false

    for (let i = 0; i < questionCount; i++) {
      if (!aiAttempted) {
        try {
          const aiQuestion = await generateInterviewQuestion(jobTitle, company || '', level || 'entry')
          questions.push({
            question: aiQuestion.question,
            questionType: aiQuestion.questionType || '技术基础',
            expectedPoints: aiQuestion.expectedPoints || [],
          })
          aiSuccessCount++
        } catch (aiError) {
          console.error('AI面试问题生成失败，切换到本地题库:', aiError)
          aiAttempted = true
        }
      }

      if (aiAttempted || questions.length <= i) {
        const localQuestions = getLocalQuestions(jobTitle, questionCount - questions.length)
        questions.push(...localQuestions)
        break
      }
    }

    if (questions.length === 0) {
      const fallbackQuestion = generateFallbackQuestion(jobTitle)
      questions.push({
        question: fallbackQuestion.question,
        questionType: fallbackQuestion.questionType,
        expectedPoints: fallbackQuestion.expectedPoints,
      })
    }

    const finalQuestions = questions.slice(0, questionCount)

    await prisma.interviewQuestion.createMany({
      data: finalQuestions.map(q => ({
        sessionId: session.id,
        question: q.question,
      })),
    })

    const createdQuestions = await prisma.interviewQuestion.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: 'asc' },
    })

    res.status(201).json({
      id: session.id,
      jobTitle: session.jobTitle,
      company: session.company,
      level: session.level,
      status: session.status,
      createdAt: session.createdAt,
      interviewQuestions: createdQuestions,
      aiGeneratedCount: aiSuccessCount,
      localGeneratedCount: finalQuestions.length - aiSuccessCount,
    })
  } catch (error) {
    console.error('创建面试会话失败:', error)
    res.status(500).json({ error: '创建面试失败，请重试' })
  }
})

router.post('/sessions/:id/questions', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
      include: {
        interviewQuestions: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }

    let questionText: string
    try {
      const question = await generateInterviewQuestion(session.jobTitle, session.company, session.level)
      questionText = question.question
    } catch {
      const localQuestions = getLocalQuestions(session.jobTitle, 1)
      questionText = localQuestions[0]?.question || generateFallbackQuestion(session.jobTitle).question
    }

    const questionRecord = await prisma.interviewQuestion.create({
      data: {
        sessionId: session.id,
        question: questionText,
      },
    })

    res.json({
      id: questionRecord.id,
      sessionId: questionRecord.sessionId,
      question: questionRecord.question,
      createdAt: questionRecord.createdAt,
    })
  } catch (error) {
    console.error('生成面试问题失败:', error)
    res.status(500).json({ error: '生成面试问题失败' })
  }
})

router.post('/questions/:id/answer', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { answer } = req.body

  if (!answer) {
    return res.status(400).json({ error: '回答不能为空' })
  }

  try {
    const question = await prisma.interviewQuestion.findUnique({
      where: { id: req.params.id },
    })

    if (!question) {
      return res.status(404).json({ error: '问题不存在' })
    }

    const session = await prisma.interviewSession.findUnique({
      where: { id: question.sessionId, userId: req.userId! },
    })

    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }

    let evaluationData: { score: number; evaluation: string; suggestion: string } | null = null
    try {
      const evaluation = await evaluateInterviewAnswer(question.question, answer, session.jobTitle)
      evaluationData = {
        score: evaluation.score,
        evaluation: evaluation.feedback,
        suggestion: evaluation.sampleAnswer,
      }
    } catch {
      const fallback = generateFallbackFeedback(answer)
      evaluationData = {
        score: fallback.score,
        evaluation: fallback.feedback,
        suggestion: fallback.sampleAnswer,
      }
    }

    await prisma.interviewQuestion.update({
      where: { id: req.params.id },
      data: {
        answer,
        evaluation: evaluationData.evaluation,
        score: evaluationData.score,
      },
    })

    res.json({
      id: question.id,
      question: question.question,
      answer,
      evaluation: evaluationData.evaluation,
      score: evaluationData.score,
    })
  } catch (error) {
    console.error('提交回答失败:', error)
    res.status(500).json({ error: '提交回答失败' })
  }
})

router.get('/sessions/:id/report', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
      include: {
        interviewQuestions: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }

    const questions = session.interviewQuestions
    const answeredQuestions = questions.filter((q) => q.score !== null)

    const totalScore = answeredQuestions.reduce((sum, q) => sum + (q.score || 0), 0)
    const averageScore = answeredQuestions.length > 0 ? Math.round(totalScore / answeredQuestions.length) : 0

    const questionHistory = questions.map((q, i) => {
      const answer = q.answer || '未回答'
      const score = q.score !== null ? `（得分：${q.score}）` : ''
      return `${i + 1}. Q: ${q.question}\n   A: ${answer}${score}`
    }).join('\n\n')

    let summary: string
    try {
      const report = await generateInterviewReport(
        questions.map(q => q.question),
        questions.map(q => q.answer || ''),
        questions.map(q => q.evaluation || ''),
        session.jobTitle
      )
      summary = report.summary
    } catch {
      summary = generateFallbackReportText(session.jobTitle, questions)
    }

    const reportData = {
      session: {
        id: session.id,
        jobTitle: session.jobTitle,
        company: session.company,
        level: session.level,
      },
      questions: questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
        score: q.score,
        evaluation: q.evaluation,
      })),
      summary,
      averageScore,
    }

    await prisma.interviewSession.update({
      where: { id: session.id },
      data: {
        report: JSON.stringify(reportData),
      },
    })

    res.json(reportData)
  } catch (error) {
    console.error('生成面试报告失败:', error)
    res.status(500).json({ error: '生成面试报告失败' })
  }
})

router.post('/sessions/:id/end', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.interviewSession.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })

    if (!session) {
      return res.status(404).json({ error: '面试记录不存在' })
    }

    const updatedSession = await prisma.interviewSession.update({
      where: { id: req.params.id },
      data: { status: 'completed' },
    })

    const questions = await prisma.interviewQuestion.findMany({
      where: { sessionId: session.id },
    })

    const answeredCount = questions.filter(q => q.score !== null).length
    const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0)
    const avgScore = answeredCount > 0 ? Math.round(totalScore / answeredCount) : 0

    await prisma.growthRecord.create({
      data: {
        userId: req.userId!,
        type: 'interview',
        content: JSON.stringify({
          type: '模拟面试',
          jobTitle: session.jobTitle,
          score: avgScore,
          questionCount: questions.length,
        }),
      },
    })

    res.json({
      id: updatedSession.id,
      status: updatedSession.status,
      message: '面试结束',
    })
  } catch (error) {
    console.error('结束面试失败:', error)
    res.status(500).json({ error: '结束面试失败' })
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

    await prisma.interviewQuestion.deleteMany({
      where: { sessionId: req.params.id },
    })

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

function generateFallbackReportText(jobTitle: string, questions: any[]): string {
  const answeredCount = questions.filter(q => q.score !== null).length
  const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0)
  const avgScore = answeredCount > 0 ? Math.round(totalScore / answeredCount) : 0

  return `你完成了针对【${jobTitle}】岗位的模拟面试，共回答了${answeredCount}个问题，平均得分${avgScore}分。

整体评价：${avgScore >= 80 ? '表现优秀，具备扎实的专业知识和良好的表达能力。' : avgScore >= 60 ? '表现良好，有一定的专业基础，但仍有提升空间。' : '需要加强学习，提高专业知识水平。'}

优势：${avgScore >= 60 ? '态度积极，回答思路比较清晰' : '参与度高，有学习热情'}

不足：${avgScore < 80 ? '部分问题回答不够深入，可以增加更多实际案例' : '继续保持，精益求精'}

改进建议：
1. 建议针对薄弱环节加强学习
2. 多进行模拟面试练习
3. 注意回答的结构和逻辑

继续加油！`
}

export default router