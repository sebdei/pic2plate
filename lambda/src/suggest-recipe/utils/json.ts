import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

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

export async function validateAndTransform<T extends object, D>(
  target: ClassConstructor<T>,
  dto: D | null
): Promise<T | null> {
  if (!dto) {
    return null
  }

  const instance = plainToInstance(target, dto)
  const validationErrors = await validate(instance)

  if (validationErrors.length > 0) {
    console.dir(validationErrors, { depth: null })
    return null
  }

  return instance
}
