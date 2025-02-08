import { APIGatewayEvent } from 'aws-lambda'
import { RecipeRequest } from './dto/request.dto'
import { getIngredientsFromImage } from './services/ingredients.service'
import { getRecipe } from './services/recipe.service'
import { RecipeDto } from './dto/recipe/recipe.dto'
import { writeInternalServerError, writeClientError, writeSuccess } from './utils/response'
import { RecipeResponse } from './dto/response.dto'

export const handler = async (event: APIGatewayEvent) => {
  const jsonBody: RecipeRequest = event?.body && JSON.parse(event.body)

  const { history, image_data_url, ingredients: userIngredients } = jsonBody

  if (!image_data_url && !userIngredients) {
    return writeClientError()
  } else {
    const imageIngredients = image_data_url
      ? await getIngredientsFromImage(image_data_url)
      : undefined
    const ingredients = [...(imageIngredients ?? []), ...(userIngredients ?? [])]

    const recipe = await getRecipe(ingredients, history)

    const responseDto = recipe != undefined ? createResponse(recipe, imageIngredients) : null

    return responseDto
      ? writeSuccess(responseDto, event)
      : writeInternalServerError('Could not generate recipe.', event)
  }
}

export function createResponse(
  recipe: RecipeDto,
  imageIngredients: string[] | undefined
): RecipeResponse {
  return {
    image_ingredients: imageIngredients,
    recipe: recipe.recipe
  }
}
