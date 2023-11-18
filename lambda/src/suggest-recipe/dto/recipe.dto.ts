export interface Recipe {
  name: string

  ingredients: Array<{
    amount: string
    description: string
  }>

  steps: Array<{
    description: string
  }>
}
