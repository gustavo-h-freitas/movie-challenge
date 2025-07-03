import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieService } from './movie.service';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { NotFoundException } from '@nestjs/common';

describe('MovieService', () => {
  let service: MovieService;
  let movieRepository: Repository<Movie>;
  let actorRepository: Repository<Actor>;

  const mockMovieRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockActorRepository = {
    findByIds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
        },
        {
          provide: getRepositoryToken(Actor),
          useValue: mockActorRepository,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    actorRepository = module.get<Repository<Actor>>(getRepositoryToken(Actor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const mockMovies = [
        { id: 1, title: 'Test Movie 1' },
        { id: 2, title: 'Test Movie 2' },
      ];
      mockMovieRepository.find.mockResolvedValue(mockMovies);

      const result = await service.findAll();
      expect(result).toEqual(mockMovies);
      expect(mockMovieRepository.find).toHaveBeenCalledWith({
        relations: ['actors', 'ratings'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a movie if found', async () => {
      const mockMovie = { id: 1, title: 'Test Movie' };
      mockMovieRepository.findOne.mockResolvedValue(mockMovie);

      const result = await service.findOne(1);
      expect(result).toEqual(mockMovie);
    });

    it('should throw NotFoundException if movie not found', async () => {
      mockMovieRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
}); 