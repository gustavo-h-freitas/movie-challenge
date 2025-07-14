import { Module } from '@nestjs/common';
import { ActorController } from '../controllers/actor.controller';
import { ActorService } from '../services/actor.service';
import { DataProvidersModule } from '../data-providers/data-providers.module';

@Module({
  imports: [DataProvidersModule],
  controllers: [ActorController],
  providers: [ActorService],
  exports: [ActorService],
})
export class ActorModule {}
