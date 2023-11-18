import { APIGatewayEvent } from 'aws-lambda'
import OpenAI from 'openai'

const openai = new OpenAI()

export const handler = async (event: APIGatewayEvent) => {
  const jsonBody = event?.body && JSON.parse(event.body)
  const imageDataUrl = jsonBody?.image_data_url

  if (!imageDataUrl) {
    // sic! For now do not return any error message to the client, because the lambda is not secured at all.
    return {
      statusCode: 400
    }
  }

  const gptResponse = await getGptRecipe(imageDataUrl)
  const jsonStr = gptResponse && extractJson(gptResponse)
  const recipe = jsonStr && parse(jsonStr)

  return recipe ? writeSuccess(recipe, event) : writeError(event)
}

function corsHeaders(event: APIGatewayEvent) {
  return {
    'Access-Control-Allow-Credentials': false,
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': event?.headers?.['Origin'] || '*'
  }
}

async function getGptRecipe(imageDataUrl: string) {
  const prompt = `
    You are going to write a JSON to answer the following question:
    "Ich benötige ein leckeres Rezept mit den Zutaten, die auf dem Foto zu sehen sind. Weitere benötigte Zutaten kann ich einkaufen. Ich habe Standard-Zutaten wie Salz und Pfeffer bereits zu Hause."

    Now consider the following TypeScript Interface for the JSON schema:

    interface Recipe {
      name: string;

      ingredients: Array<{
        amount: string
        description: string
      }>;


      steps: Array<{
        description: string;
      }>;
    }

    Write the basics section according to the Recipe schema.
    On the response, include only the JSON and no additional text.
  `

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'Output in JSON'
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt
          },
          {
            type: 'image_url',
            image_url: {
              url: imageDataUrl
            }
          }
        ]
      }
    ],
    max_tokens: 500,
    model: 'gpt-4-vision-preview'
  })

  return completion?.choices?.[0]?.message?.content
}

function extractJson(gptResponse: string) {
  const matches = new RegExp('```json((.|\n)*)```').exec(gptResponse)
  return matches?.length ?? 0 >= 2 ? matches?.[1] : null
}

function parse(jsonStr: string) {
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    return null
  }
}

function writeError(event: APIGatewayEvent) {
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

function writeSuccess(json: object, event: APIGatewayEvent) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders(event)
    },
    body: JSON.stringify(json)
  }
}
