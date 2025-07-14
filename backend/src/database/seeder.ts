import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { MovieRating } from '../entities/movie-rating.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
    @InjectRepository(MovieRating)
    private movieRatingRepository: Repository<MovieRating>,
  ) {}

  async seed() {
    // Clear existing data
    await this.movieRatingRepository.clear();
    await this.movieRepository.clear();
    await this.actorRepository.clear();

    // Create actors
    const actors = await this.actorRepository.save([
      {
        name: 'Tom Hanks',
        birthDate: new Date('1956-07-09'),
        nationality: 'American',
        biography:
          'Academy Award-winning actor known for his versatile performances.',
      },
      {
        name: 'Meryl Streep',
        birthDate: new Date('1949-06-22'),
        nationality: 'American',
        biography: 'One of the most acclaimed actresses in film history.',
      },
      {
        name: 'Leonardo DiCaprio',
        birthDate: new Date('1974-11-11'),
        nationality: 'American',
        biography: 'Oscar-winning actor and environmental activist.',
      },
      {
        name: 'Emma Watson',
        birthDate: new Date('1990-04-15'),
        nationality: 'British',
        biography: 'Actress and activist known for her role in Harry Potter.',
      },
      {
        name: 'Denzel Washington',
        birthDate: new Date('1954-12-28'),
        nationality: 'American',
        biography: 'Academy Award-winning actor and director.',
      },
    ]);

    // Create movies
    const movies = await this.movieRepository.save([
      {
        title: 'Forrest Gump',
        description:
          'The story of a man with a low IQ who accomplished great things in his life.',
        releaseYear: 1994,
        genre: 'Drama',
        director: 'Robert Zemeckis',
        duration: 142,
        actors: [actors[0]], // Tom Hanks
      },
      {
        title: 'The Devil Wears Prada',
        description:
          'A young woman becomes an assistant to a powerful fashion magazine editor.',
        releaseYear: 2006,
        genre: 'Comedy',
        director: 'David Frankel',
        duration: 109,
        actors: [actors[1], actors[3]], // Meryl Streep, Emma Watson
      },
      {
        title: 'Titanic',
        description:
          'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious Titanic.',
        releaseYear: 1997,
        genre: 'Romance',
        director: 'James Cameron',
        duration: 194,
        actors: [actors[2]], // Leonardo DiCaprio
      },
      {
        title: 'Training Day',
        description:
          'A rookie cop spends his first day as a Los Angeles narcotics officer with a rogue detective.',
        releaseYear: 2001,
        genre: 'Crime',
        director: 'Antoine Fuqua',
        duration: 122,
        actors: [actors[4]], // Denzel Washington
      },
      {
        title: 'Cast Away',
        description:
          'A FedEx executive must transform himself physically and emotionally to survive a crash landing on a deserted island.',
        releaseYear: 2000,
        genre: 'Adventure',
        director: 'Robert Zemeckis',
        duration: 143,
        actors: [actors[0]], // Tom Hanks
      },
    ]);

    // Create movie ratings
    await this.movieRatingRepository.save([
      {
        rating: 9,
        comment: 'One of the best movies ever made!',
        reviewerName: 'MovieFan123',
        movieId: movies[0].id,
      },
      {
        rating: 8,
        comment: 'Great performance by Tom Hanks',
        reviewerName: 'CinemaLover',
        movieId: movies[0].id,
      },
      {
        rating: 7,
        comment: 'Fun and entertaining',
        reviewerName: 'FilmCritic',
        movieId: movies[1].id,
      },
      {
        rating: 10,
        comment: 'Epic love story!',
        reviewerName: 'RomanceFan',
        movieId: movies[2].id,
      },
      {
        rating: 8,
        comment: 'Intense and gripping',
        reviewerName: 'ActionFan',
        movieId: movies[3].id,
      },
      {
        rating: 9,
        comment: 'Amazing survival story',
        reviewerName: 'AdventureSeeker',
        movieId: movies[4].id,
      },
    ]);

    console.log('Database seeded successfully!');
  }
}
