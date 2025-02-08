import { ResponseFormatJSONSchema } from 'openai/resources'

export interface RecipeDto {
  recipe: {
    name: string
    duration?: string

    ingredients: Array<{
      amount: string
      description: string
    }>

    steps: Array<{
      description: string
    }>
  }
}

export const RecipeJsonSchema: ResponseFormatJSONSchema.JSONSchema = {
  name: 'Recipe',
  schema: {
    type: 'object',
    properties: {
      recipe: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          duration: { type: 'string' },
          ingredients: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                amount: { type: 'string' },
                description: { type: 'string' }
              },
              required: ['amount', 'description'],
              additionalProperties: false
            }
          },
          steps: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                description: { type: 'string' }
              },
              required: ['description'],
              additionalProperties: false
            }
          }
        },
        required: ['name', 'duration', 'ingredients', 'steps'],
        additionalProperties: false
      },
      additionalProperties: false
    },
    additionalProperties: false
  }
}
