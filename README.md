# Movie Management App

A full-stack web application for managing movies, actors, and ratings. Built with NestJS (backend) and Next.js (frontend), featuring a modern UI with real-time data management.

## 🎬 Features

### Core Features

- **Movie Management**: Create, view, search, and manage movies with detailed information
- **Actor Management**: Create, view, search, and manage actors with biographical information
- **Rating System**: Rate movies and view aggregated ratings
- **Search Functionality**: Search movies by title, director, or genre; search actors by name or nationality
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Data**: Uses React Query for efficient data fetching and caching

### Advanced Features

- **Actor-Movie Relationships**: Connect actors to movies during creation
- **Pagination**: Efficient pagination for large datasets
- **API Key Authentication**: Secure API access with API key authentication
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠 Tech Stack

### Backend

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: API Key-based authentication
- **Validation**: Class-validator
- **Testing**: Jest

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library

## 📋 Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for easy backend setup)
- **PostgreSQL** (if running backend locally without Docker)

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-management-app
   ```

2. **Start the backend and database**

   ```bash
   cd backend
   docker-compose up -d
   ```

   This will start:

   - PostgreSQL database on port 5432
   - NestJS backend on port 3001

3. **Start the frontend**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000` (or 3002 if 3000 is busy)

4. **Set up API Key**
   - Navigate to `http://localhost:3000/auth`
   - Enter the API key: `your-secret-api-key-123`
   - Click "Save API Key"

### Option 2: Local Development

1. **Set up the database**

   ```bash
   # Install PostgreSQL and create database
   createdb movie_management
   ```

2. **Configure backend environment**

   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. **Install and start backend**

   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

4. **Install and start frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
movie-management-app/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── controllers/    # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── entities/       # Database models
│   │   ├── dto/           # Data transfer objects
│   │   └── auth/          # Authentication guards
│   ├── docker-compose.yml  # Docker setup
│   └── package.json
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utilities and API client
│   │   └── providers/    # Context providers
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Movies

- `GET /movies` - List all movies (with optional search)
- `GET /movies/:id` - Get movie details
- `GET /movies/:id/actors` - Get actors for a movie
- `POST /movies` - Create a new movie (requires API key)
- `PATCH /movies/:id` - Update a movie (requires API key)
- `DELETE /movies/:id` - Delete a movie (requires API key)

### Actors

- `GET /actors` - List all actors (with optional search)
- `GET /actors/:id` - Get actor details
- `GET /actors/:id/movies` - Get movies for an actor
- `POST /actors` - Create a new actor (requires API key)
- `PATCH /actors/:id` - Update an actor (requires API key)
- `DELETE /actors/:id` - Delete an actor (requires API key)

### Ratings

- `GET /movie-ratings` - List all ratings (with optional movieId filter)
- `GET /movie-ratings/:id` - Get rating details
- `POST /movie-ratings` - Create a new rating (requires API key)
- `PATCH /movie-ratings/:id` - Update a rating (requires API key)
- `DELETE /movie-ratings/:id` - Delete a rating (requires API key)

## 🎯 Usage Guide

### Getting Started

1. **Set API Key**: Visit `/auth` and enter `your-secret-api-key-123`
2. **Browse Movies**: Visit `/movies` to see all movies
3. **Browse Actors**: Visit `/actors` to see all actors
4. **Create Content**: Use the "Create" buttons in navigation

### Creating Content

1. **Create Actor**:

   - Navigate to `/actors/create`
   - Fill in name, birth date, nationality, and biography
   - Click "Create Actor"

2. **Create Movie**:

   - Navigate to `/movies/create`
   - Fill in movie details
   - Select actors from the available list
   - Click "Create Movie"

3. **Rate a Movie**:
   - Navigate to a movie's detail page
   - Click "Rate this movie"
   - Enter rating (1-10), your name, and comment
   - Click "Submit Rating"

### Searching

- Use the search bar on movies/actors pages
- Search movies by title, director, or genre
- Search actors by name or nationality

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
npm run test:e2e
```

### Frontend Tests

```bash
cd frontend
npm test
npm run test:watch
```

## 🐳 Docker Commands

### Backend Management

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Database Management

```bash
# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d movie_management

# Reset database
docker-compose down -v
docker-compose up -d
```

## 🔒 Security

- **API Key Authentication**: All write operations require a valid API key
- **Input Validation**: Both client and server-side validation
- **SQL Injection Protection**: TypeORM provides parameterized queries
- **CORS**: Configured for development and production

## 🚀 Deployment

### Backend Deployment

1. Set environment variables for production
2. Build the application: `npm run build`
3. Start production server: `npm run start:prod`

### Frontend Deployment

1. Set `NEXT_PUBLIC_API_URL` environment variable
2. Build the application: `npm run build`
3. Start production server: `npm run start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is part of the Movie Management App.

## 🆘 Troubleshooting

### Common Issues

**Backend won't start:**

- Check if PostgreSQL is running
- Verify environment variables in `.env`
- Check Docker logs: `docker-compose logs backend`

**Frontend can't connect to backend:**

- Ensure backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify API key is set correctly

**Database connection issues:**

- Check PostgreSQL is running
- Verify database credentials
- Ensure database `movie_management` exists

**API Key errors:**

- Make sure you've set the API key in `/auth`
- Verify the key is `your-secret-api-key-123`
- Check browser's local storage for the key

## 📞 Support

For issues and questions:

1. Check the troubleshooting section above
2. Review the logs for error messages
3. Ensure all prerequisites are installed
4. Verify environment configuration

---

**Happy Movie Managing! 🎬**
`Obs.: Yes, I used AI to create this readme :D`
