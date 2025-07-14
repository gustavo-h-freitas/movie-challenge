import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear?: number;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  actorIds?: number[];
}

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear?: number;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  actorIds?: number[];
}
