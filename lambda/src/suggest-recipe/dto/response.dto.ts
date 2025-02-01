import { RecipeDto } from './recipe.dto'

export interface RecipeResponse {
  recipe: RecipeDto | null
  image_ingredients: string[] | undefined
}
