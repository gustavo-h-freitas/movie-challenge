import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Actor } from '../../entities/actor.entity';
import { Movie } from '../../entities/movie.entity';
import { CreateActorDto, UpdateActorDto } from '../../dto/actor.dto';
import { ActorDataProvider } from '../interfaces/actor-data-provider.interface';

@Injectable()
export class ActorDataProviderImpl implements ActorDataProvider {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    const actor = this.actorRepository.create(createActorDto);
    return this.actorRepository.save(actor);
  }

  async findAll(): Promise<Actor[]> {
    return this.actorRepository.find({
      relations: ['movies'],
    });
  }

  async findOne(id: number): Promise<Actor> {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ['movies'],
    });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    return actor;
  }

  async search(query: string): Promise<Actor[]> {
    return this.actorRepository.find({
      where: [
        { name: Like(`%${query}%`) },
        { nationality: Like(`%${query}%`) },
      ],
      relations: ['movies'],
    });
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    const actor = await this.findOne(id);
    Object.assign(actor, updateActorDto);
    return this.actorRepository.save(actor);
  }

  async remove(id: number): Promise<void> {
    const actor = await this.findOne(id);
    await this.actorRepository.remove(actor);
  }

  async getMoviesByActor(id: number): Promise<Movie[]> {
    const actor = await this.findOne(id);
    return actor.movies;
  }
}
