import { Controller, Post, UseGuards } from '@nestjs/common';
import { SeederService } from '../database/seeder';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) { }

  @Post()
  @UseGuards(ApiKeyGuard)
  async seed() {
    await this.seederService.seed();
    return { message: 'Database seeded successfully!' };
  }
} 