import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getAvailableModels, chatCompletion, chatCompletionStream } from '../services/aiService';

const router = Router();

router.get('/models', authMiddleware, (_req: AuthRequest, res: Response) => {
  const models = getAvailableModels();
  res.json(models);
});

router.post('/chat', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { messages, model } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages 必须是数组' });
  }

  try {
    const response = await chatCompletion(messages, model);
    res.json({ response });
  } catch (error) {
    console.error('AI聊天失败:', error);
    res.status(500).json({ error: 'AI服务暂时不可用' });
  }
});

router.post('/chat/stream', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { messages, model } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages 必须是数组' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const stream = chatCompletionStream(messages, model);
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('AI流式聊天失败:', error);
    res.write(`data: ${JSON.stringify({ error: 'AI服务暂时不可用' })}\n\n`);
    res.end();
  }
});

export default router;