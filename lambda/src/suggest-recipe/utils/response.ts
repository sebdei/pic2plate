import { APIGatewayEvent } from 'aws-lambda'
import { Recipe } from '../dto/recipe.dto'

export function buildResponse(recipe: Recipe, ingredients: string[] | null) {
  return {
    recipe,
    ...(ingredients ? { ingredients } : {})
  }
}

export function writeSuccess(json: object, event: APIGatewayEvent) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders(event)
    },
    body: JSON.stringify(json)
  }
}

export function writeInputError() {
  return { statusCode: 400 }
}

export function writeError(event: APIGatewayEvent) {
  return {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders(event)
    },
    body: JSON.stringify({
      error: 'Could not generate recipe.'
    })
  }
}

function corsHeaders(event: APIGatewayEvent) {
  return {
    'Access-Control-Allow-Credentials': false,
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': event?.headers?.['Origin'] || '*'
  }
}
