import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { env } from '$env/dynamic/private'

export type LLMProvider = 'openai' | 'anthropic' | 'google' | 'deepseek'

export interface LLMConfig {
  provider: LLMProvider
  model: string
}

export function createLLMClient(config: LLMConfig) {
  const { provider, model } = config
  
  switch (provider) {
    case 'openai':
      if (!env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is required for OpenAI provider')
      }
      const openaiClient = createOpenAI({
        apiKey: env.OPENAI_API_KEY
      })
      return openaiClient(model)
    
    case 'anthropic':
      if (!env.ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY is required for Anthropic provider')
      }
      const anthropicClient = createAnthropic({
        apiKey: env.ANTHROPIC_API_KEY
      })
      return anthropicClient(model)
    
    case 'google':
      if (!env.GOOGLE_GENERATIVE_AI_API_KEY) {
        throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is required for Google provider')
      }
      const googleClient = createGoogleGenerativeAI({
        apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY
      })
      return googleClient(model)
    
    case 'deepseek':
      if (!env.DEEPSEEK_API_KEY) {
        throw new Error('DEEPSEEK_API_KEY is required for DeepSeek provider')
      }
      const deepseek = createOpenAICompatible({
        name: 'deepseek',
        apiKey: env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com/v1'
      })
      return deepseek(model)
    
    default:
      throw new Error(`Unsupported LLM provider: ${provider}`)
  }
}

// Default configurations for each provider
export const defaultConfigs: Record<LLMProvider, LLMConfig> = {
  openai: { provider: 'openai', model: 'gpt-4o-mini' },
  anthropic: { provider: 'anthropic', model: 'claude-3-5-sonnet-20241022' },
  google: { provider: 'google', model: 'gemini-1.5-flash' },
  deepseek: { provider: 'deepseek', model: 'deepseek-chat' }
}

// Helper function to get default config for a provider
export function getDefaultConfig(provider: LLMProvider): LLMConfig {
  return defaultConfigs[provider]
}

// Helper function to create LLM client with environment-based selection
export function createDefaultLLMClient(): ReturnType<typeof createLLMClient> {
  const provider = (env.LLM_PROVIDER as LLMProvider) || 'openai'
  const model = env.LLM_MODEL || defaultConfigs[provider].model
  
  return createLLMClient({ provider, model })
}
