import { APIGatewayEvent } from 'aws-lambda'
import { RecipeRequest } from './dto/request.dto'
import { getIngredientsFromImage } from './services/ingredients.service'
import { getRecipe } from './services/recipe.service'
import { buildResponse, writeError, writeInputError, writeSuccess } from './utils/response'

export const handler = async (event: APIGatewayEvent) => {
  const jsonBody: RecipeRequest = event?.body && JSON.parse(event.body)

  console.log('RECEIVED DATA', jsonBody)

  const { history, image_data_url, ingredients: bodyIngredients } = jsonBody

  if (!image_data_url && !bodyIngredients) {
    return writeInputError()
  } else {
    const recognizedIngredients = image_data_url
      ? await getIngredientsFromImage(image_data_url)
      : null
    const ingredients = [...(recognizedIngredients ?? []), ...(bodyIngredients ?? [])]

    const recipe = await getRecipe(ingredients, history)

    return recipe
      ? writeSuccess(buildResponse(recipe, recognizedIngredients), event)
      : writeError(event)
  }
}
