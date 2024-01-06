import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsString, ValidateNested } from 'class-validator'

export interface RecipeDto {
  name: string
  duration: string

  ingredients: Array<{ amount: string; description: string }>
  steps: Array<{ description: string }>
}

class Ingredient {
  @IsString()
  public amount: string

  @IsString()
  public description: string
}

class RecipeDescription {
  @IsString()
  public description: string
}

export class Recipe implements RecipeDto {
  @IsString()
  public name: string

  @IsString()
  public duration: string

  @Type(() => Ingredient)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  public ingredients: Ingredient[]

  @Type(() => RecipeDescription)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  public steps: RecipeDescription[]
}
