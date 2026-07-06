import { Injectable } from '@nestjs/common';
import { ILlmProvider, LlmMessage, LlmCompletionOptions, LlmResponse } from '../interfaces/llm-provider.interface';

interface OpenAiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAiCompletionRequest {
  model: string;
  messages: OpenAiMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

interface OpenAiChoice {
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface OpenAiCompletionResponse {
  id: string;
  model: string;
  choices: OpenAiChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface OpenAiStreamChunk {
  choices: {
    delta: {
      content?: string;
    };
    finish_reason?: string;
  }[];
}

@Injectable()
export class OpenAiCompatibleProvider implements ILlmProvider {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly defaultModel: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = process.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1';
    this.defaultModel = 'gpt-4o';
  }

  getProviderName(): string {
    return 'openai-compatible';
  }

  async complete(
    messages: LlmMessage[],
    options?: LlmCompletionOptions,
  ): Promise<LlmResponse> {
    const request: OpenAiCompletionRequest = {
      model: options?.model || this.defaultModel,
      messages: messages as OpenAiMessage[],
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
      top_p: options?.topP,
    };

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`LLM API Error: ${error.message || 'Unknown error'}`);
    }

    const data: OpenAiCompletionResponse = await response.json();

    return {
      content: data.choices[0]?.message?.content || '',
      model: data.model,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    };
  }

  async* stream(
    messages: LlmMessage[],
    options?: LlmCompletionOptions,
  ): AsyncGenerator<string> {
    const request: OpenAiCompletionRequest = {
      model: options?.model || this.defaultModel,
      messages: messages as OpenAiMessage[],
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
      top_p: options?.topP,
      stream: true,
    };

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`LLM API Error: ${error.message || 'Unknown error'}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        if (line === 'data: [DONE]') return;

        try {
          const data: OpenAiStreamChunk = JSON.parse(line.slice(6));
          const content = data.choices[0]?.delta?.content;
          if (content) {
            yield content;
          }
        } catch {
          continue;
        }
      }
    }
  }
}
