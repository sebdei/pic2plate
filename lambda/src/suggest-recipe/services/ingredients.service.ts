import * as JSONUtils from '../utils/json'
import { chatCompletion } from '../utils/openai'
import { ChatCompletionContentPart, ResponseFormatJSONSchema } from 'openai/resources'
import { IngredientsDto } from '../dto/ingredients.dto'

const responseFormatSchema: ResponseFormatJSONSchema.JSONSchema = {
  name: 'Ingredients',
  schema: {
    type: 'object',
    properties: {
      ingredients: {
        type: 'array',
        items: { type: 'string' },
        additionalProperties: false
      },
      additionalProperties: false
    },
    additionalProperties: false
  }
}
const validator = JSONUtils.getValidatorBySchema(responseFormatSchema.schema!)

export async function getIngredientsFromImage(img: string) {
  let ingredientsDto = await getInternal(img)
  let result

  if (JSONUtils.isValidSchema<IngredientsDto>(ingredientsDto, validator)) {
    result = ingredientsDto
  } else {
    // Retry 1
    ingredientsDto = await getInternal(img)

    if (JSONUtils.isValidSchema<IngredientsDto>(ingredientsDto, validator)) {
      result = ingredientsDto
    } else {
      // Retry 2
      ingredientsDto = await getInternal(img)

      if (JSONUtils.isValidSchema<IngredientsDto>(ingredientsDto, validator)) {
        result = ingredientsDto
      } else {
        result = null
      }
    }
  }

  console.log('Ingredients')
  console.dir(result, { depth: null })

  return result?.ingredients
}

async function getInternal(img: string): Promise<IngredientsDto | null | undefined> {
  const systemMessage = `
  You are an expert in identifying ingredients from images.
  Your task is to extract a list of ingredients from the given image.
  Ensure the list is accurate and includes all visible ingredients.
  Answer in german.
`

  const prompt = 'Welche Zutaten sind auf dem Bild zu sehen?'

  const content: ChatCompletionContentPart[] = [
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

  const response = await chatCompletion('gpt-4o-mini', systemMessage, content, responseFormatSchema)
  return response ? JSONUtils.parse<IngredientsDto>(response) : undefined
}
