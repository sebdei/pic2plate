import { RecipeDto } from './recipe.dto'

export interface RecipeResponseDto {
  recipe: RecipeDto | null
  image_ingredients: string[] | null
}
