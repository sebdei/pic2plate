import { ResponseFormatJSONSchema } from 'openai/resources'

export interface IngredientsDto {
  ingredients: string[]
}

export const IngredientsJsonSchema: ResponseFormatJSONSchema.JSONSchema = {
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
