import Ajv from 'ajv'

const ajv = new Ajv()

export function parse<T>(jsonStr: string): T | null {
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    return null
  }
}

export function getValidatorBySchema(schema: Record<string, unknown>) {
  return ajv.compile(schema)
}

export function isValidSchema<T>(obj: unknown, validate: Ajv.ValidateFunction): obj is T {
  return validate(obj) as boolean
}
