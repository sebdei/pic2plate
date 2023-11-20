import * as JSONUtils from '../utils/json'
import { chatCompletion } from '../utils/openai'

export async function getIngredientsFromImage(img: string) {
  const prompt = `
    You are going to write a JSON to answer the following question:
    "Welche Zutaten sind auf dem Bild zu sehen?"

    Now consider the following TypeScript Interface for the JSON schema:

    string[];

    Write the basics section according to the Recipe schema.
    On the response, include only the JSON and no additional text.
    Answer in german:
  `

  const content = [
    {
      type: 'text',
      text: prompt
    },
    {
      type: 'image_url',
      image_url: {
        url: img
      }
    }
  ]

  const response = await chatCompletion('gpt-4-vision-preview', content)

  const jsonStr = response && JSONUtils.extractJson(response)

  return jsonStr != null ? JSONUtils.parse<string[]>(jsonStr) : null
}
