import OpenAI from 'openai'
import { ChatCompletionContentPart, ResponseFormatJSONSchema } from 'openai/resources'

const openai = new OpenAI()

type OpenAIModel = 'gpt-4o-mini'

export async function chatCompletion(
  model: OpenAIModel,
  systemMessage: string,
  userMessage: string | ChatCompletionContentPart[],
  responseFormatSchema: ResponseFormatJSONSchema.JSONSchema,
  max_tokens = 750
) {
  const response_format: ResponseFormatJSONSchema = {
    type: 'json_schema',
    json_schema: responseFormatSchema
  }

  const completion = await openai.chat.completions.create({
    model,
    max_tokens,
    response_format,
    messages: [
      {
        role: 'system',
        content: systemMessage
      },
      {
        role: 'user',
        content: userMessage
      }
    ]
  })

  return completion?.choices?.[0]?.message?.content
}
