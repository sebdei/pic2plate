export interface Recipe {
  name: string
  duration: string

  ingredients: Array<{
    amount: string
    description: string
  }>

  steps: Array<{
    description: string
  }>
}
