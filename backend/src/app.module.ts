import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './modules/movie.module';
import { ActorModule } from './modules/actor.module';
import { MovieRatingModule } from './modules/movie-rating.module';
import { SeederModule } from './modules/seeder.module';
import { Movie } from './entities/movie.entity';
import { Actor } from './entities/actor.entity';
import { MovieRating } from './entities/movie-rating.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'movie_management',
      entities: [Movie, Actor, MovieRating],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-sync schema in development
      logging: process.env.NODE_ENV !== 'production',
    }),
    MovieModule,
    ActorModule,
    MovieRatingModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
