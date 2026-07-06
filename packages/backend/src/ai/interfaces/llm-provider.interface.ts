export interface LlmMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LlmCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface LlmResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ILlmProvider {
  getProviderName(): string;
  complete(
    messages: LlmMessage[],
    options?: LlmCompletionOptions,
  ): Promise<LlmResponse>;
  stream(
    messages: LlmMessage[],
    options?: LlmCompletionOptions,
  ): AsyncGenerator<string>;
}
