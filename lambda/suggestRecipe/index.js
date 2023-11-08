export const handler = async (event) => {
  // const body = event?.body && JSON.parse(event.body)
  // const imageDataUrl = body?.image_data_url

  // if (!imageDataUrl) {
  //   return {
  //     statusCode: 400,
  //     body: 'Missing image_data_url in request body'
  //   }
  // }

  const res = { text: "hi" }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      ...corsHeaders(event)
    },
    body: JSON.stringify(res)
  }
}

function corsHeaders(event) {
  return {
    'Access-Control-Allow-Credentials': false,
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    // 'Access-Control-Allow-Origin': event?.headers?.['Origin'] || '*'
    'Access-Control-Allow-Origin': event?.headers?.['Origin'] || '*'
  }
}

async function getBlobImage(imageDataUrl) {
  return await (await fetch(imageDataUrl))?.blob()
}
