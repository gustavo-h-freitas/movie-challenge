import { BaseDataProvider } from './base-data-provider.interface';
import { Movie } from '../../entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from '../../dto/movie.dto';
import { Actor } from '../../entities/actor.entity';

export interface MovieDataProvider
  extends BaseDataProvider<Movie, CreateMovieDto, UpdateMovieDto> {
  search(query: string): Promise<Movie[]>;
  getActorsByMovie(id: number): Promise<Actor[]>;
}
