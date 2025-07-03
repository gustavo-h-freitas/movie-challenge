import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    if (search) {
      return this.movieService.search(search);
    }
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }

  @Get(':id/actors')
  getActorsByMovie(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.getActorsByMovie(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
} 