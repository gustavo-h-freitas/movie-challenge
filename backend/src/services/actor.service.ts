import { Injectable, Inject } from '@nestjs/common';
import { Actor } from '../entities/actor.entity';
import { Movie } from '../entities/movie.entity';
import { CreateActorDto, UpdateActorDto } from '../dto/actor.dto';
import { ActorDataProvider } from '../data-providers/interfaces/actor-data-provider.interface';
import { ACTOR_DATA_PROVIDER } from '../data-providers/tokens/data-provider.tokens';

@Injectable()
export class ActorService {
  constructor(
    @Inject(ACTOR_DATA_PROVIDER)
    private actorDataProvider: ActorDataProvider,
  ) { }

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    return this.actorDataProvider.create(createActorDto);
  }

  async findAll(): Promise<Actor[]> {
    return this.actorDataProvider.findAll();
  }

  async findOne(id: number): Promise<Actor> {
    return this.actorDataProvider.findOne(id);
  }

  async search(query: string): Promise<Actor[]> {
    return this.actorDataProvider.search(query);
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    return this.actorDataProvider.update(id, updateActorDto);
  }

  async remove(id: number): Promise<void> {
    return this.actorDataProvider.remove(id);
  }

  async getMoviesByActor(id: number): Promise<Movie[]> {
    return this.actorDataProvider.getMoviesByActor(id);
  }
} 