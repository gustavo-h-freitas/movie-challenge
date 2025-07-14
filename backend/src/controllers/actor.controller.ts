import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ActorService } from '../services/actor.service';
import { CreateActorDto, UpdateActorDto } from '../dto/actor.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    if (search) {
      return this.actorService.search(search);
    }
    return this.actorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.actorService.findOne(id);
  }

  @Get(':id/movies')
  getMoviesByActor(@Param('id', ParseIntPipe) id: number) {
    return this.actorService.getMoviesByActor(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return this.actorService.update(id, updateActorDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.actorService.remove(id);
  }
}
