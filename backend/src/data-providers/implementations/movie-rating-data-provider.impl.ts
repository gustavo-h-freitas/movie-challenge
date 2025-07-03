import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieRating } from '../../entities/movie-rating.entity';
import { Movie } from '../../entities/movie.entity';
import { CreateMovieRatingDto, UpdateMovieRatingDto } from '../../dto/movie-rating.dto';
import { MovieRatingDataProvider } from '../interfaces/movie-rating-data-provider.interface';

@Injectable()
export class MovieRatingDataProviderImpl implements MovieRatingDataProvider {
  constructor(
    @InjectRepository(MovieRating)
    private movieRatingRepository: Repository<MovieRating>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) { }

  async create(createMovieRatingDto: CreateMovieRatingDto): Promise<MovieRating> {
    const movie = await this.movieRepository.findOne({
      where: { id: createMovieRatingDto.movieId },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${createMovieRatingDto.movieId} not found`);
    }

    const rating = this.movieRatingRepository.create(createMovieRatingDto);
    return this.movieRatingRepository.save(rating);
  }

  async findAll(): Promise<MovieRating[]> {
    return this.movieRatingRepository.find({
      relations: ['movie'],
    });
  }

  async findOne(id: number): Promise<MovieRating> {
    const rating = await this.movieRatingRepository.findOne({
      where: { id },
      relations: ['movie'],
    });

    if (!rating) {
      throw new NotFoundException(`Movie rating with ID ${id} not found`);
    }

    return rating;
  }

  async findByMovie(movieId: number): Promise<MovieRating[]> {
    return this.movieRatingRepository.find({
      where: { movieId },
      relations: ['movie'],
    });
  }

  async update(id: number, updateMovieRatingDto: UpdateMovieRatingDto): Promise<MovieRating> {
    const rating = await this.findOne(id);
    Object.assign(rating, updateMovieRatingDto);
    return this.movieRatingRepository.save(rating);
  }

  async remove(id: number): Promise<void> {
    const rating = await this.findOne(id);
    await this.movieRatingRepository.remove(rating);
  }
} 