import { RecipeDto, RecipeJsonSchema } from '../dto/recipe.dto'
import * as JSONUtils from '../utils/json'
import { chatCompletion } from '../utils/openai'

const validator = JSONUtils.getValidatorBySchema(RecipeJsonSchema.schema!)

export async function getRecipe(ingredients: string[], history?: string[] | null) {
  let recipeDto = await getInternal(ingredients, history)
  let result

  if (JSONUtils.isValidSchema<RecipeDto>(recipeDto, validator)) {
    result = recipeDto
  } else {
    // Retry 1
    recipeDto = await getInternal(ingredients, history)

    if (JSONUtils.isValidSchema<RecipeDto>(recipeDto, validator)) {
      result = recipeDto
    } else {
      result = null
    }
  }

  console.log('Recipe')
  console.dir(result, { depth: null })

  return result
}

async function getInternal(
  ingredients: string[],
  history?: string[] | null
): Promise<RecipeDto | null | undefined> {
  const formattedHistory = history?.map((entry) => `'${entry}'`).join(', ')
  const formattedIngredients = ingredients?.map((ingredient) => `- ${ingredient}`).join(', ')

  const systemMessage = `
    You are a culinary expert AI assistant that helps create recipes.
    Your task is to create a delicious recipe based on the given ingredients and preferences.
    If a list of dishes that the user does not want to eat is provided, please take this into account.
  `

  const prompt = `
    "Ich benötige ein leckeres Rezept mit den folgenden Zutaten:
    ${formattedIngredients}.

    ${formattedHistory ? `Folgende Gerichte möchte ich nicht essen: ${formattedHistory}` : ''}
    "
  `

  const response = await chatCompletion('gpt-4o-mini', systemMessage, prompt, RecipeJsonSchema)
  return response ? JSONUtils.parse<RecipeDto>(response) : undefined
}
