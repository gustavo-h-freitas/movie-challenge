import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederController } from '../controllers/seeder.controller';
import { SeederService } from '../database/seeder';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { MovieRating } from '../entities/movie-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor, MovieRating])],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
