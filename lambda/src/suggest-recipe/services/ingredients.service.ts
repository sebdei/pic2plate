import { Recipe } from '../dto/recipe.dto'
import * as JSONUtils from '../utils/json'
import { getJsonChatCompletion } from '../utils/openai'

export async function getIngredientsFromImage(img: string) {
  const prompt = `
  You are going to write a JSON to answer the following question:
  "Welche Zutaten sind auf dem Bild zu sehen?"
  
  Now consider the following TypeScript Interface for the JSON schema:
  
  Array<{
    amount: string
    description: string
  }>
  
  Write the basics section according to the Recipe schema.
  On the response, include only the JSON and no additional text.
  Answer in german:
`

  const response = await getJsonChatCompletion('gpt-4-vision-preview', [
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
  ])

  const jsonStr = response && JSONUtils.extractJson(response)
  console.log('GET INGREDIENTS', prompt, jsonStr)
  if (!jsonStr) return []

  const ingredients = JSONUtils.parse<Recipe['ingredients']>(jsonStr)?.map(
    (ingredient) => ingredient.description
  )

  return ingredients ? ingredients : []
}
