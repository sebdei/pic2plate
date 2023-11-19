import { APIGatewayEvent } from 'aws-lambda'

function corsHeaders(event: APIGatewayEvent) {
  return {
    'Access-Control-Allow-Credentials': false,
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': event?.headers?.['Origin'] || '*'
  }
}

export function writeClientError() {
  return { statusCode: 400 }
}

export function writeInternalServerError(error: string, event: APIGatewayEvent) {
  return {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders(event)
    },
    body: JSON.stringify({ error })
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
