import { Module } from '@nestjs/common';
import { MovieController } from '../controllers/movie.controller';
import { MovieService } from '../services/movie.service';
import { DataProvidersModule } from '../data-providers/data-providers.module';

@Module({
  imports: [DataProvidersModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
