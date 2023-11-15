import OpenAI from "openai";

const openai = new OpenAI();

export const handler = async (event, context) => {
  const jsonBody = event?.body && JSON.parse(event.body);
  const imageDataUrl = jsonBody?.image_data_url;

  if (!imageDataUrl) {
    return {
      statusCode: 400,
      body: "Missing image_data_url in request body",
    };
  }

  const gptResponse = await getGptRecipe(imageDataUrl);

  console.log("gptResponse:  ", JSON.stringify(gptResponse));

  const jsonStr = gptResponse && extractJson(gptResponse);
  const recipe = jsonStr && parse(jsonStr);

  console.log("recipe: ", JSON.stringify(recipe));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      ...corsHeaders(event),
    },
    body: JSON.stringify(recipe),
  };
};

function corsHeaders(event) {
  return {
    "Access-Control-Allow-Credentials": false,
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Origin": event?.headers?.["Origin"] || "*",
  };
}

async function getGptRecipe(imageDataUrl) {
  const prompt = `
    You are going to write a JSON to answer the following question:
    "Ich benötige ein leckeres Rezept mit den Zutaten, die auf dem Foto zu sehen sind."

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
  `;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Output in JSON",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: imageDataUrl,
            },
          },
        ],
      },
    ],
    max_tokens: 500,
    model: "gpt-4-vision-preview",
  });

  return completion?.choices?.[0]?.message?.content;
}

function extractJson(gptResponse) {
  const matches = new RegExp("```json((.|\n)*)```").exec(gptResponse);
  return matches?.length >= 2 ? matches[1] : null;
}

function parse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}
