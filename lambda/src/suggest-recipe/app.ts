import 'reflect-metadata'
import { APIGatewayEvent } from 'aws-lambda'
import { RecipeDto } from './dto/recipe.dto'
import { RecipeRequestDto } from './dto/request.dto'
import { RecipeResponseDto } from './dto/response.dto'
import { getIngredientsFromImage } from './services/ingredients.service'
import { getRecipe } from './services/recipe.service'
import { writeClientError, writeInternalServerError, writeSuccess } from './utils/response'

export const handler = async (event: APIGatewayEvent) => {
  const jsonBody: RecipeRequestDto = event?.body && JSON.parse(event.body)

  const { history, image_data_url, ingredients: bodyIngredients } = jsonBody

  if (!image_data_url && !bodyIngredients) {
    return writeClientError()
  } else {
    const imageIngredients = image_data_url ? await getIngredientsFromImage(image_data_url) : null
    const ingredients = [...(imageIngredients ?? []), ...(bodyIngredients ?? [])]

    const recipe = await getRecipe(ingredients, history)

    const responseDto = recipe != null ? createResponse(recipe, imageIngredients) : null

    return responseDto
      ? writeSuccess(responseDto, event)
      : writeInternalServerError('Could not generate recipe.', event)
  }
}

export function createResponse(
  recipe: RecipeDto,
  imageIngredients: string[] | null
): RecipeResponseDto {
  return {
    image_ingredients: imageIngredients,
    recipe: recipe
  }
}
