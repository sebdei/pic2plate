import { IsOptional, IsString } from 'class-validator'

export interface RecipeRequestDto {
  image_data_url: string | null
  ingredients: string[] | null
  history: string[] | null
}

export class RecipeRequest implements RecipeRequestDto {
  @IsOptional()
  @IsString()
  public image_data_url: string | null

  @IsOptional()
  @IsString()
  public ingredients: string[] | null

  @IsOptional()
  @IsString({ each: true })
  public history: string[] | null
}
