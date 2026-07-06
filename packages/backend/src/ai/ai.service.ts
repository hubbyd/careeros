import { Injectable } from '@nestjs/common';
import { ILlmProvider, LlmMessage, LlmCompletionOptions, LlmResponse } from './interfaces/llm-provider.interface';
import { OpenAiCompatibleProvider } from './providers/openai-compatible.provider';
import { PrismaService } from '../prisma/prisma.service';

interface PromptVariables {
  [key: string]: string;
}

interface StructuredOutputSchema {
  type: 'object';
  properties: {
    [key: string]: {
      type: string;
      description?: string;
    };
  };
  required?: string[];
}

@Injectable()
export class AiService {
  private readonly llmProvider: ILlmProvider;

  constructor(private readonly prismaService: PrismaService) {
    this.llmProvider = new OpenAiCompatibleProvider();
  }

  async complete(
    messages: LlmMessage[],
    options?: LlmCompletionOptions,
  ): Promise<LlmResponse> {
    return this.llmProvider.complete(messages, options);
  }

  async* stream(
    messages: LlmMessage[],
    options?: LlmCompletionOptions,
  ): AsyncGenerator<string> {
    yield* this.llmProvider.stream(messages, options);
  }

  async getPromptByKey(key: string): Promise<string | null> {
    const prompt = await this.prismaService.prompt.findUnique({
      where: { key, isActive: 1 },
    });
    return prompt?.template || null;
  }

  async renderPrompt(key: string, variables: PromptVariables): Promise<string> {
    const template = await this.getPromptByKey(key);
    if (!template) {
      throw new Error(`Prompt not found: ${key}`);
    }
    return template.replace(/{{(\w+)}}/g, (_, varName) => {
      return variables[varName] || '';
    });
  }

  async completeWithPrompt(
    promptKey: string,
    variables: PromptVariables,
    userMessage: string,
    options?: LlmCompletionOptions,
  ): Promise<LlmResponse> {
    const systemPrompt = await this.renderPrompt(promptKey, variables);
    const messages: LlmMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ];
    return this.complete(messages, options);
  }

  async* streamWithPrompt(
    promptKey: string,
    variables: PromptVariables,
    userMessage: string,
    options?: LlmCompletionOptions,
  ): AsyncGenerator<string> {
    const systemPrompt = await this.renderPrompt(promptKey, variables);
    const messages: LlmMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ];
    yield* this.stream(messages, options);
  }

  async parseStructuredOutput<T>(
    response: string,
    schema: StructuredOutputSchema,
  ): Promise<T> {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      const jsonString = jsonMatch[0];
      const parsed = JSON.parse(jsonString);
      this.validateSchema(parsed, schema);
      return parsed as T;
    } catch (error) {
      throw new Error(`Failed to parse structured output: ${(error as Error).message}`);
    }
  }

  private validateSchema(data: unknown, schema: StructuredOutputSchema): void {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Expected object type');
    }

    const obj = data as Record<string, unknown>;
    const required = schema.required || [];

    for (const prop of required) {
      if (!(prop in obj)) {
        throw new Error(`Missing required property: ${prop}`);
      }
    }

    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (key in obj) {
        const value = obj[key];
        const expectedType = propSchema.type;
        if (typeof value !== expectedType) {
          throw new Error(`Property ${key} has wrong type. Expected ${expectedType}, got ${typeof value}`);
        }
      }
    }
  }
}
