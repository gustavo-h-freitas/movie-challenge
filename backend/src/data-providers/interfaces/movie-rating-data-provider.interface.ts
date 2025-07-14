import { BaseDataProvider } from './base-data-provider.interface';
import { MovieRating } from '../../entities/movie-rating.entity';
import {
  CreateMovieRatingDto,
  UpdateMovieRatingDto,
} from '../../dto/movie-rating.dto';

export interface MovieRatingDataProvider
  extends BaseDataProvider<
    MovieRating,
    CreateMovieRatingDto,
    UpdateMovieRatingDto
  > {
  findByMovie(movieId: number): Promise<MovieRating[]>;
}
