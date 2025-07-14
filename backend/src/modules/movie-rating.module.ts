import { Module } from '@nestjs/common';
import { MovieRatingController } from '../controllers/movie-rating.controller';
import { MovieRatingService } from '../services/movie-rating.service';
import { DataProvidersModule } from '../data-providers/data-providers.module';

@Module({
  imports: [DataProvidersModule],
  controllers: [MovieRatingController],
  providers: [MovieRatingService],
  exports: [MovieRatingService],
})
export class MovieRatingModule {}
