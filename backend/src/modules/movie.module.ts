import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from '../controllers/movie.controller';
import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule { } 