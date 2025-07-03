# Movie Management App - Frontend

A modern Next.js frontend application for managing movies and actors, built with TypeScript and TailwindCSS.

## Features

### Core Features

- **Movie Management**: Browse, search, and view detailed information about movies
- **Actor Management**: Browse, search, and view detailed information about actors
- **Search Functionality**: Search movies by title, director, or genre; search actors by name or nationality
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Data**: Uses React Query for efficient data fetching and caching

### Bonus Features

- **Authentication**: Client-side authentication screen with login/register forms
- **Pagination**: Paginated lists for movies and actors
- **Unit Tests**: Jest and React Testing Library setup with example tests

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── movies/            # Movie-related pages
│   ├── actors/            # Actor-related pages
│   ├── auth/              # Authentication page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── navigation.tsx     # Navigation component
│   ├── search.tsx         # Search input component
│   └── loading.tsx        # Loading states
├── lib/                   # Utilities and API
│   └── api.ts            # API client and types
└── providers/            # Context providers
    └── query-provider.tsx # React Query provider
```

## API Integration

The frontend connects to the backend API with the following endpoints:

- `GET /movies` - List all movies
- `GET /movies/:id` - Get movie details
- `GET /movies/:id/actors` - Get actors for a movie
- `GET /actors` - List all actors
- `GET /actors/:id` - Get actor details
- `GET /actors/:id/movies` - Get movies for an actor
- `GET /movie-ratings` - List movie ratings

## Features in Detail

### Movie Listing

- Grid layout with movie cards
- Search by title, director, or genre
- Pagination support
- Average rating display
- Cast information preview

### Movie Details

- Comprehensive movie information
- Cast list with actor links
- Ratings and reviews
- Responsive layout

### Actor Listing

- Grid layout with actor cards
- Search by name or nationality
- Pagination support
- Age calculation
- Filmography preview

### Actor Details

- Actor biography and information
- Complete filmography
- Links to movie details
- Responsive layout

### Authentication

- Login and registration forms
- Password visibility toggle
- Form validation
- Loading states

## Testing

The project includes unit tests for components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Example test coverage:

- Component rendering
- User interactions
- Props validation
- Debounced search functionality

## Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## Performance

- React Query for efficient data caching
- Debounced search to reduce API calls
- Optimized images and assets
- Lazy loading where appropriate

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is part of the Movie Management App.
