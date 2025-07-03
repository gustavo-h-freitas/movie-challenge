# Movie Management Backend

A NestJS backend application for managing movies, actors, and movie ratings with TypeORM and PostgreSQL.

## Features

- **CRUD Operations**: Full CRUD support for Movies, Actors, and Movie Ratings
- **Search Functionality**: Partial search for movies and actors by name
- **Relationships**: Many-to-many relationship between Movies and Actors, One-to-many between Movies and Ratings
- **API Security**: API key authentication for CUD operations
- **Validation**: Request validation using class-validator
- **Database Seeding**: Sample data seeder for testing
- **Docker Support**: Complete Docker setup with PostgreSQL

## Tech Stack

- **Framework**: NestJS with TypeScript
- **ORM**: TypeORM with PostgreSQL
- **Validation**: class-validator and class-transformer
- **Authentication**: Custom API key guard
- **Database**: PostgreSQL

## Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

## Installation

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-management-app/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up PostgreSQL database**

   ```bash
   # Create database
   createdb movie_management
   ```

5. **Run the application**

   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

### Docker Setup

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

2. **Seed the database**
   ```bash
   # After the containers are running
   curl -X POST http://localhost:3001/seeder \
     -H "Authorization: Bearer your-secret-api-key-123"
   ```

## API Endpoints

### Authentication

All CUD operations require an API key in the Authorization header:

```
Authorization: Bearer your-secret-api-key-123
```

### Movies

- `GET /movies` - Get all movies
- `GET /movies?search=query` - Search movies by title, director, or genre
- `GET /movies/:id` - Get movie by ID
- `GET /movies/:id/actors` - Get all actors in a movie
- `POST /movies` - Create a new movie
- `PATCH /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

### Actors

- `GET /actors` - Get all actors
- `GET /actors?search=query` - Search actors by name or nationality
- `GET /actors/:id` - Get actor by ID
- `GET /actors/:id/movies` - Get all movies an actor has been in
- `POST /actors` - Create a new actor
- `PATCH /actors/:id` - Update an actor
- `DELETE /actors/:id` - Delete an actor

### Movie Ratings

- `GET /movie-ratings` - Get all ratings
- `GET /movie-ratings?movieId=1` - Get ratings for a specific movie
- `GET /movie-ratings/:id` - Get rating by ID
- `POST /movie-ratings` - Create a new rating
- `PATCH /movie-ratings/:id` - Update a rating
- `DELETE /movie-ratings/:id` - Delete a rating

### Database Seeding

- `POST /seeder` - Seed the database with sample data

## Request/Response Examples

### Create a Movie

```bash
POST /movies
Authorization: Bearer your-secret-api-key-123
Content-Type: application/json

{
  "title": "The Shawshank Redemption",
  "description": "Two imprisoned men bond over a number of years...",
  "releaseYear": 1994,
  "genre": "Drama",
  "director": "Frank Darabont",
  "duration": 142,
  "actorIds": [1, 2]
}
```

### Search Movies

```bash
GET /movies?search=shawshank
```

### Get Actors in a Movie

```bash
GET /movies/1/actors
```

## Environment Variables

| Variable       | Description           | Default               |
| -------------- | --------------------- | --------------------- |
| `DB_HOST`      | Database host         | localhost             |
| `DB_PORT`      | Database port         | 5432                  |
| `DB_USERNAME`  | Database username     | postgres              |
| `DB_PASSWORD`  | Database password     | password              |
| `DB_NAME`      | Database name         | movie_management      |
| `PORT`         | Application port      | 3001                  |
| `NODE_ENV`     | Environment           | development           |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Development

### Running Tests

```bash
npm run test
npm run test:watch
npm run test:cov
```

### Code Formatting

```bash
npm run format
npm run lint
```

### Database Migrations

The application uses TypeORM's synchronize option in development. For production, you should use migrations:

```bash
# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run

# Revert migration
npm run typeorm migration:revert
```

## Project Structure

```
src/
├── entities/           # TypeORM entities
├── dto/               # Data Transfer Objects
├── controllers/       # API controllers
├── services/          # Business logic
├── modules/           # Feature modules
├── auth/              # Authentication
├── database/          # Database utilities
└── main.ts           # Application entry point
```

## Error Handling

The application includes comprehensive error handling:

- Validation errors return 400 Bad Request
- Not found errors return 404 Not Found
- Authentication errors return 401 Unauthorized
- Server errors return 500 Internal Server Error

## Security

- API key authentication for CUD operations
- Input validation using class-validator
- CORS configuration for frontend integration
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
