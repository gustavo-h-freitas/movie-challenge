import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateMovieRatingDto {
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  reviewerName?: string;

  @IsInt()
  movieId: number;
}

export class UpdateMovieRatingDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  reviewerName?: string;
} 