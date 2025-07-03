import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRatingController } from '../controllers/movie-rating.controller';
import { MovieRatingService } from '../services/movie-rating.service';
import { MovieRating } from '../entities/movie-rating.entity';
import { Movie } from '../entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRating, Movie])],
  controllers: [MovieRatingController],
  providers: [MovieRatingService],
  exports: [MovieRatingService],
})
export class MovieRatingModule { } 