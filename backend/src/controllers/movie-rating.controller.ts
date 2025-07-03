import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { MovieRatingService } from '../services/movie-rating.service';
import { CreateMovieRatingDto, UpdateMovieRatingDto } from '../dto/movie-rating.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('movie-ratings')
export class MovieRatingController {
  constructor(private readonly movieRatingService: MovieRatingService) { }

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() createMovieRatingDto: CreateMovieRatingDto) {
    return this.movieRatingService.create(createMovieRatingDto);
  }

  @Get()
  findAll(@Query('movieId') movieId?: string) {
    if (movieId) {
      return this.movieRatingService.findByMovie(parseInt(movieId));
    }
    return this.movieRatingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieRatingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovieRatingDto: UpdateMovieRatingDto) {
    return this.movieRatingService.update(id, updateMovieRatingDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieRatingService.remove(id);
  }
} 