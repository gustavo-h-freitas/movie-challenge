import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { MovieRating } from '../entities/movie-rating.entity';
import { MovieDataProviderImpl } from './implementations/movie-data-provider.impl';
import { ActorDataProviderImpl } from './implementations/actor-data-provider.impl';
import { MovieRatingDataProviderImpl } from './implementations/movie-rating-data-provider.impl';
import {
  MOVIE_DATA_PROVIDER,
  ACTOR_DATA_PROVIDER,
  MOVIE_RATING_DATA_PROVIDER,
} from './tokens/data-provider.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor, MovieRating])],
  providers: [
    {
      provide: MOVIE_DATA_PROVIDER,
      useClass: MovieDataProviderImpl,
    },
    {
      provide: ACTOR_DATA_PROVIDER,
      useClass: ActorDataProviderImpl,
    },
    {
      provide: MOVIE_RATING_DATA_PROVIDER,
      useClass: MovieRatingDataProviderImpl,
    },
  ],
  exports: [
    MOVIE_DATA_PROVIDER,
    ACTOR_DATA_PROVIDER,
    MOVIE_RATING_DATA_PROVIDER,
  ],
})
export class DataProvidersModule {}
