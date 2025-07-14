import { BaseDataProvider } from './base-data-provider.interface';
import { Actor } from '../../entities/actor.entity';
import { CreateActorDto, UpdateActorDto } from '../../dto/actor.dto';
import { Movie } from '../../entities/movie.entity';

export interface ActorDataProvider
  extends BaseDataProvider<Actor, CreateActorDto, UpdateActorDto> {
  search(query: string): Promise<Actor[]>;
  getMoviesByActor(id: number): Promise<Movie[]>;
}
