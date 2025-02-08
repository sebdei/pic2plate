import { RecipeDto } from './recipe.dto'

export interface RecipeResponse {
  recipe: RecipeDto['recipe'] | null
  image_ingredients: string[] | undefined
}
