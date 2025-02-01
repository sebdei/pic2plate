import { APIGatewayEvent } from 'aws-lambda'
import { RecipeRequest } from './dto/request.dto'
import { getIngredientsFromImage } from './services/ingredients.service'
import { getRecipe } from './services/recipe.service'
import { Recipe } from './dto/recipe.dto'
import { writeInternalServerError, writeClientError, writeSuccess } from './utils/response'
import { RecipeResponse } from './dto/response.dto'

export const handler = async (event: APIGatewayEvent) => {
  const jsonBody: RecipeRequest = event?.body && JSON.parse(event.body)

  const { history, image_data_url, ingredients: bodyIngredients } = jsonBody

  if (!image_data_url && !bodyIngredients) {
    return writeClientError()
  } else {
    const imageIngredients = image_data_url
      ? await getIngredientsFromImage(image_data_url)
      : undefined
    const ingredients = [...(imageIngredients ?? []), ...(bodyIngredients ?? [])]

    const recipe = await getRecipe(ingredients, history)

    const responseDto = recipe != null ? createResponse(recipe, imageIngredients) : null

    return responseDto
      ? writeSuccess(responseDto, event)
      : writeInternalServerError('Could not generate recipe.', event)
  }
}

export function createResponse(
  recipe: Recipe,
  imageIngredients: string[] | undefined
): RecipeResponse {
  return {
    image_ingredients: imageIngredients,
    recipe: recipe
  }
}
