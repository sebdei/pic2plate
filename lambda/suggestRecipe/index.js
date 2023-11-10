import OpenAI from "openai";

const openai = new OpenAI();

export const handler = async (event, context) => {
  const body = event?.body && JSON.parse(event.body);
  const imageDataUrl = body?.image_data_url;

  if (!imageDataUrl) {
    return {
      statusCode: 400,
      body: "Missing image_data_url in request body",
    };
  }

  const text = await getGptRecipe(imageDataUrl);
  // const text = getMockText();
  console.log(text);

  const resp = { text };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      ...corsHeaders(event),
    },
    body: JSON.stringify(resp),
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
        amount: string;
        description: string;
      }>;

      steps: string[];
    }

    Write the basics section according to the Recipe schema.
    On the response, include only the JSON.
  `;
  const completion = await openai.chat.completions.create({
    messages: [
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
    model: "gpt-4-vision-preview",
    max_tokens: 300,
  });

  return completion?.choices?.[0]?.message?.content;
}
