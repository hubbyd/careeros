import { Controller, Get, Post, Delete, Param, Body, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiChatService } from './ai-chat.service';

@ApiTags('AI聊天')
@Controller('ai-chat')
export class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @Post('session')
  async createSession(@Request() req: { user: { id: number } }, @Body() body: { chatType?: string }) {
    return this.aiChatService.createSession(req.user.id, body.chatType || 'general');
  }

  @Get('sessions')
  async getSessions(@Request() req: { user: { id: number } }) {
    return this.aiChatService.getSessionsByUserId(req.user.id);
  }

  @Get('session/:id')
  async getSession(@Param('id') id: number) {
    return this.aiChatService.getSessionById(id);
  }

  @Get('session/:id/messages')
  async getMessages(@Param('id') id: number) {
    return this.aiChatService.getMessagesBySessionId(id);
  }

  @Post('session/:id/message')
  async sendMessage(
    @Request() req: { user: { id: number } },
    @Param('id') sessionId: number,
    @Body() body: { content: string },
  ) {
    return this.aiChatService.sendMessage(req.user.id, { sessionId, content: body.content });
  }

  @Delete('session/:id')
  async deleteSession(@Request() req: { user: { id: number } }, @Param('id') id: number) {
    return this.aiChatService.deleteSession(id, req.user.id);
  }
}