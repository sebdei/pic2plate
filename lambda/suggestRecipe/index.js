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

async function getBlobImage(imageDataUrl) {
  return await (await fetch(imageDataUrl))?.blob();
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

function getMockText() {
  return `Es sieht so aus, als hätten Sie einige gute Zutaten, um eine cremige Pilzpfanne mit Schafskäse zu kreieren. Hier ist ein einfaches Rezept, das Sie mit diesen Zutaten machen können:

  **Cremige Pilzpfanne mit Schafskäse**

  Zutaten:
  - Eine Packung frische Champignons (400g)
  - 200g Speisequark
  - Creme Fraiche (nach Belieben, z.B. 200ml)
  - Hirtenkäse (nach Belieben)
  - Salz und Pfeffer (nach Geschmack)
  - Optional: Knoblauch, Zwiebeln, Kräuter (falls vorhanden)

  Anleitung:
  1. Die Champignons säubern und in Scheiben oder Stücke schneiden.
  2. Falls Sie Zwiebeln oder Knoblauch haben, diese fein hacken und in einer Pfanne mit etwas Öl oder Butter glasig anbraten.
  3. Fügen Sie die geschnittenen Champignons hinzu und braten Sie diese an, bis sie Farbe annehmen und das Wasser verloren haben.
  4. Reduzieren Sie die Hitze und fügen Sie den Speisequark und die Creme Fraiche hinzu. Umrühren, bis eine gleichmäßige Sauce entsteht.
  5`;
}
