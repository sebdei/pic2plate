import { Recipe, RecipeDto } from '../dto/recipe.dto'
import * as JSONUtils from '../utils/json'
import { chatCompletion } from '../utils/openai'

export async function getRecipe(ingredients: string[], history?: string[] | null) {
  const formattedHistory = history?.map((entry) => `'${entry}'`).join(', ')
  const formattedIngredients = ingredients?.map((ingredient) => `- ${ingredient}`).join(', ')

  const prompt = `
    You are going to write a JSON to answer the following question:
    "Ich benötige ein leckeres Rezept mit den folgenden Zutaten:
    ${formattedIngredients}.

    ${formattedHistory ? `Folgende Gerichte möchte ich nicht essen: ${formattedHistory}` : ''}
    "

    Now consider the following TypeScript Interface for the JSON schema:

    interface Recipe {
      name: string;
      duration: string;

      ingredients: Array<{
        amount: string
        description: string
      }>;


      steps: Array<{
        description: string;
      }>;
    }

    Write the basics section according to the Recipe schema.
    On the response, include only the JSON and no additional text.
    Answer in german:
  `

  const response = await chatCompletion('gpt-4-1106-preview', prompt)

  const jsonStr = response && JSONUtils.extractJson(response)
  const json = jsonStr != null ? JSONUtils.parse<RecipeDto>(jsonStr) : null

  return JSONUtils.validateAndTransform<Recipe, RecipeDto>(Recipe, json)
}
