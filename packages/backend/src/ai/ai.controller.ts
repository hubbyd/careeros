import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Observable, from, map } from 'rxjs';
import { AiService } from './ai.service';
import { ChatDto } from './dto';

interface MessageEvent {
  data: string;
}

@ApiTags('AI')
@ApiBearerAuth()
@Controller('ai')
@UseGuards(AuthGuard('jwt'))
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() dto: ChatDto) {
    const variables = dto.variables || {};
    const result = await this.aiService.completeWithPrompt(
      dto.promptKey,
      variables,
      dto.message,
    );
    return { content: result.content };
  }

  @Post('chat/stream')
  async chatStream(@Body() dto: ChatDto): Promise<Observable<MessageEvent>> {
    const variables = dto.variables || {};
    const generator = this.aiService.streamWithPrompt(
      dto.promptKey,
      variables,
      dto.message,
    );
    return from(generator).pipe(map((chunk) => ({ data: chunk })));
  }

  @Post('complete')
  async complete(@Body() body: { messages: { role: string; content: string }[] }) {
    const messages = body.messages.map((m) => ({
      role: m.role as 'system' | 'user' | 'assistant',
      content: m.content,
    }));
    const result = await this.aiService.complete(messages);
    return { content: result.content };
  }
}
