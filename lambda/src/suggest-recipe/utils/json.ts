export function extractJson(gptResponse: string) {
  const matches = new RegExp('```json((.|\n)*)```').exec(gptResponse)
  return matches?.length ?? 0 >= 2 ? matches?.[1] : null
}

export function parse<T>(jsonStr: string): T | null {
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    return null
  }
}
