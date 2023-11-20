import { APIGatewayEvent } from 'aws-lambda'
import { RecipeRequest } from './dto/request.dto'
import { getIngredientsFromImage } from './services/ingredients.service'
import { getRecipe } from './services/recipe.service'
import { Recipe } from './dto/recipe.dto'
import { writeInternalServerError, writeClientError, writeSuccess } from './utils/response'
import { RecipeResponse } from './dto/response.dto'

export const handler = async (event: APIGatewayEvent) => {
  // const resultMock: RecipeResponse = {
  //   image_ingredients: ['Champignons', 'Tomaten'],
  //   recipe: {
  //     name: 'Gefüllte Champignons mit Tomaten',
  //     duration: '30 Minuten',
  //     ingredients: [
  //       { amount: '250g', description: 'Champignons' },
  //       { amount: '2', description: 'Tomaten' },
  //       { amount: '1 EL', description: 'OlivenÃ¶l' },
  //       { amount: '2 Zweige', description: 'Thymian' },
  //       { amount: '1', description: 'Knoblauchzehe' },
  //       { amount: '50g', description: 'FrischkÃ¤se' },
  //       { amount: '30g', description: 'geriebener KÃ¤se' },
  //       { amount: 'Salz und Pfeffer', description: 'nach Geschmack' }
  //     ],
  //     steps: [
  //       { description: 'Heize den Ofen auf 180Â°C vor.' },
  //       { description: 'Putze die Champignons und entferne die Stiele.' },
  //       { description: 'Schneide die Tomaten in kleine WÃ¼rfel.' },
  //       {
  //         description:
  //           'Erhitze das OlivenÃ¶l in einer Pfanne und dÃ¼nste den fein gehackten Knoblauch an.'
  //       },
  //       {
  //         description:
  //           'FÃ¼ge die TomatenwÃ¼rfel und ThymianblÃ¤ttchen hinzu und lass es kurz kÃ¶cheln.'
  //       },
  //       { description: 'Nimm die Pfanne vom Herd und mische den FrischkÃ¤se unter die Tomaten.' },
  //       { description: 'WÃ¼rze die Masse mit Salz und Pfeffer.' },
  //       { description: 'FÃ¼lle die ChampignonkÃ¶pfe mit der Tomaten-FrischkÃ¤se-Mischung.' },
  //       { description: 'Streue den geriebenen KÃ¤se darÃ¼ber.' },
  //       {
  //         description:
  //           'Backe die gefÃ¼llten Champignons fÃ¼r 15 Minuten im Ofen, bis der KÃ¤se goldbraun ist.'
  //       }
  //     ]
  //   }
  // }

  // return writeSuccess(resultMock, event)

  const jsonBody: RecipeRequest = event?.body && JSON.parse(event.body)

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

export function createResponse(recipe: Recipe, imageIngredients: string[] | null): RecipeResponse {
  return {
    image_ingredients: imageIngredients,
    recipe: recipe
  }
}
