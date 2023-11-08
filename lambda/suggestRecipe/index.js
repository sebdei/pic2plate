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

  const text = await openAiChatCompletion(imageDataUrl);
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
    // 'Access-Control-Allow-Origin': event?.headers?.['Origin'] || '*'
    "Access-Control-Allow-Origin": event?.headers?.["Origin"] || "*",
  };
}

async function getBlobImage(imageDataUrl) {
  return await (await fetch(imageDataUrl))?.blob();
}

async function openAiChatCompletion(imageDataUrl) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Ich benötige ein leckeres Rezept mit den Zutaten, die auf dem Foto zu sehen sind.",
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

  console.log(JSON.stringify(completion));

  return completion?.choices[0]?.message?.content;
}
