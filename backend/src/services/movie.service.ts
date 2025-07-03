import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) { }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);

    if (createMovieDto.actorIds && createMovieDto.actorIds.length > 0) {
      const actors = await this.actorRepository.findBy({ id: In(createMovieDto.actorIds) });
      movie.actors = actors;
    }

    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['actors', 'ratings'],
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['actors', 'ratings'],
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async search(query: string): Promise<Movie[]> {
    return this.movieRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { director: Like(`%${query}%`) },
        { genre: Like(`%${query}%`) },
      ],
      relations: ['actors', 'ratings'],
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);

    if (updateMovieDto.actorIds) {
      const actors = await this.actorRepository.findBy({ id: In(updateMovieDto.actorIds) });
      movie.actors = actors;
    }

    Object.assign(movie, updateMovieDto);
    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }

  async getActorsByMovie(id: number): Promise<Actor[]> {
    const movie = await this.findOne(id);
    return movie.actors;
  }
} 