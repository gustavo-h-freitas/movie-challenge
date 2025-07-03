import { Injectable, Inject } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';
import { MovieDataProvider } from '../data-providers/interfaces/movie-data-provider.interface';
import { MOVIE_DATA_PROVIDER } from '../data-providers/tokens/data-provider.tokens';

@Injectable()
export class MovieService {
  constructor(
    @Inject(MOVIE_DATA_PROVIDER)
    private movieDataProvider: MovieDataProvider,
  ) { }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieDataProvider.create(createMovieDto);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieDataProvider.findAll();
  }

  async findOne(id: number): Promise<Movie> {
    return this.movieDataProvider.findOne(id);
  }

  async search(query: string): Promise<Movie[]> {
    return this.movieDataProvider.search(query);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.movieDataProvider.update(id, updateMovieDto);
  }

  async remove(id: number): Promise<void> {
    return this.movieDataProvider.remove(id);
  }

  async getActorsByMovie(id: number): Promise<Actor[]> {
    return this.movieDataProvider.getActorsByMovie(id);
  }
} 