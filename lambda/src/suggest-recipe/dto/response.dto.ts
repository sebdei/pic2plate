import { Recipe } from './recipe.dto'

export interface RecipeResponse {
  recipe: Recipe | null
  image_ingredients: string[] | null
}
