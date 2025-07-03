# Data Provider Pattern

This directory contains the implementation of the Data Provider pattern for the Movie Management App backend. This pattern abstracts database operations from the service layer, making the code more maintainable and testable.

## Structure

```
data-providers/
├── interfaces/                    # Data provider interfaces
│   ├── base-data-provider.interface.ts
│   ├── movie-data-provider.interface.ts
│   ├── actor-data-provider.interface.ts
│   └── movie-rating-data-provider.interface.ts
├── implementations/              # Concrete implementations
│   ├── movie-data-provider.impl.ts
│   ├── actor-data-provider.impl.ts
│   └── movie-rating-data-provider.impl.ts
├── tokens/                       # Dependency injection tokens
│   └── data-provider.tokens.ts
├── data-providers.module.ts      # NestJS module configuration
├── index.ts                      # Public exports
└── README.md                     # This file
```

## Architecture

### Base Interface

The `BaseDataProvider<T, CreateDto, UpdateDto>` interface defines common CRUD operations:

- `create(data: CreateDto): Promise<T>`
- `findAll(): Promise<T[]>`
- `findOne(id: number): Promise<T>`
- `update(id: number, data: UpdateDto): Promise<T>`
- `remove(id: number): Promise<void>`

### Specific Interfaces

Each entity has its own interface that extends the base interface and adds entity-specific methods:

- **MovieDataProvider**: Adds `search()` and `getActorsByMovie()` methods
- **ActorDataProvider**: Adds `search()` and `getMoviesByActor()` methods
- **MovieRatingDataProvider**: Adds `findByMovie()` method

### Implementations

Each interface has a concrete implementation that handles the actual database operations using TypeORM repositories.

### Dependency Injection

The pattern uses NestJS dependency injection with tokens to provide the implementations:

```typescript
@Inject(MOVIE_DATA_PROVIDER)
private movieDataProvider: MovieDataProvider;
```

## Benefits

1. **Separation of Concerns**: Database logic is separated from business logic
2. **Testability**: Easy to mock data providers for unit testing
3. **Maintainability**: Database operations are centralized and reusable
4. **Flexibility**: Easy to swap implementations (e.g., for different databases)
5. **Type Safety**: Full TypeScript support with proper typing

## Usage

### In Services

```typescript
@Injectable()
export class MovieService {
  constructor(
    @Inject(MOVIE_DATA_PROVIDER)
    private movieDataProvider: MovieDataProvider,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieDataProvider.findAll();
  }
}
```

### In Modules

```typescript
@Module({
  imports: [DataProvidersModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
```

## Adding New Data Providers

1. Create an interface extending `BaseDataProvider`
2. Create an implementation class
3. Add a token to `data-provider.tokens.ts`
4. Register in `data-providers.module.ts`
5. Export from `index.ts`

## Testing

Data providers can be easily mocked in tests:

```typescript
const mockMovieDataProvider = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  // ... other methods
};

Test.createTestingModule({
  providers: [
    MovieService,
    {
      provide: MOVIE_DATA_PROVIDER,
      useValue: mockMovieDataProvider,
    },
  ],
}).compile();
```
