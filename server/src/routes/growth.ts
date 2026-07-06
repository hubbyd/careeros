import express, { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/records', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const records = await prisma.growthRecord.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json(records);
  } catch (error) {
    console.error('获取成长记录失败:', error);
    res.status(500).json({ error: '获取成长记录失败' });
  }
});

router.post('/records', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { type, content } = req.body;
  try {
    const record = await prisma.growthRecord.create({
      data: {
        userId: req.userId!,
        type,
        content: typeof content === 'object' ? JSON.stringify(content) : content,
      },
    });
    res.status(201).json(record);
  } catch (error) {
    console.error('创建成长记录失败:', error);
    res.status(500).json({ error: '创建成长记录失败' });
  }
});

router.delete('/records/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.growthRecord.delete({
      where: { id },
    });
    res.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除成长记录失败:', error);
    res.status(500).json({ error: '删除成长记录失败' });
  }
});

export default router;