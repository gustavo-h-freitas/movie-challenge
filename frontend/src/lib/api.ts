import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach API key for authenticated requests
api.interceptors.request.use((config) => {
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem('apiKey') : null;
  if (apiKey && config.method && ['post', 'patch', 'delete'].includes(config.method)) {
    config.headers = { ...config.headers, 'Authorization': `Bearer ${apiKey}` } as any;
  }
  return config;
});

// Types
export interface Movie {
  id: number;
  title: string;
  description?: string;
  releaseYear?: number;
  genre?: string;
  director?: string;
  duration?: number;
  actors: Actor[];
  ratings: MovieRating[];
  actorIds?: number[];
  createdAt: string;
  updatedAt: string;
}

export interface Actor {
  id: number;
  name: string;
  birthDate?: string;
  nationality?: string;
  biography?: string;
  movies: Movie[];
  createdAt: string;
  updatedAt: string;
}

export interface MovieRating {
  id: number;
  rating: number;
  comment?: string;
  reviewerName?: string;
  movieId: number;
  movie?: Movie;
  createdAt: string;
  updatedAt: string;
}

// API functions
export const moviesApi = {
  getAll: (search?: string) =>
    api.get<Movie[]>(`/movies${search ? `?search=${encodeURIComponent(search)}` : ''}`).then(res => res.data),

  getById: (id: number) =>
    api.get<Movie>(`/movies/${id}`).then(res => res.data),

  getActors: (id: number) =>
    api.get<Actor[]>(`/movies/${id}/actors`).then(res => res.data),

  create: (data: Partial<Movie>) => api.post('/movies', data).then(res => res.data),
};

export const actorsApi = {
  getAll: (search?: string) =>
    api.get<Actor[]>(`/actors${search ? `?search=${encodeURIComponent(search)}` : ''}`).then(res => res.data),

  getById: (id: number) =>
    api.get<Actor>(`/actors/${id}`).then(res => res.data),

  getMovies: (id: number) =>
    api.get<Movie[]>(`/actors/${id}/movies`).then(res => res.data),

  create: (data: Partial<Actor>) => api.post('/actors', data).then(res => res.data),
};

export const ratingsApi = {
  getAll: (movieId?: number) =>
    api.get<MovieRating[]>(`/movie-ratings${movieId ? `?movieId=${movieId}` : ''}`).then(res => res.data),

  getById: (id: number) =>
    api.get<MovieRating>(`/movie-ratings/${id}`).then(res => res.data),

  create: (data: Partial<MovieRating>) => api.post('/movie-ratings', data).then(res => res.data),
}; 