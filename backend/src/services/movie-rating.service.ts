import { Injectable, Inject } from '@nestjs/common';
import { MovieRating } from '../entities/movie-rating.entity';
import {
  CreateMovieRatingDto,
  UpdateMovieRatingDto,
} from '../dto/movie-rating.dto';
import { MovieRatingDataProvider } from '../data-providers/interfaces/movie-rating-data-provider.interface';
import { MOVIE_RATING_DATA_PROVIDER } from '../data-providers/tokens/data-provider.tokens';

@Injectable()
export class MovieRatingService {
  constructor(
    @Inject(MOVIE_RATING_DATA_PROVIDER)
    private movieRatingDataProvider: MovieRatingDataProvider,
  ) {}

  async create(
    createMovieRatingDto: CreateMovieRatingDto,
  ): Promise<MovieRating> {
    return this.movieRatingDataProvider.create(createMovieRatingDto);
  }

  async findAll(): Promise<MovieRating[]> {
    return this.movieRatingDataProvider.findAll();
  }

  async findOne(id: number): Promise<MovieRating> {
    return this.movieRatingDataProvider.findOne(id);
  }

  async findByMovie(movieId: number): Promise<MovieRating[]> {
    return this.movieRatingDataProvider.findByMovie(movieId);
  }

  async update(
    id: number,
    updateMovieRatingDto: UpdateMovieRatingDto,
  ): Promise<MovieRating> {
    return this.movieRatingDataProvider.update(id, updateMovieRatingDto);
  }

  async remove(id: number): Promise<void> {
    return this.movieRatingDataProvider.remove(id);
  }
}
