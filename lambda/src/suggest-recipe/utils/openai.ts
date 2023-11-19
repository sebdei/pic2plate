import OpenAI from 'openai'

const openai = new OpenAI()

type OpenAIModel = 'gpt-4-1106-preview' | 'gpt-4-vision-preview'

export async function chatCompletion(model: OpenAIModel, content: any, max_tokens = 750) {
  const completion = await openai.chat.completions.create({
    model,
    max_tokens,
    messages: [
      {
        role: 'system',
        content: 'Output in JSON'
      },
      {
        role: 'user',
        content: content
      }
    ]
  })

  return completion?.choices?.[0]?.message?.content
}
