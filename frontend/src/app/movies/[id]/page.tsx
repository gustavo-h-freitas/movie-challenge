'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Loading } from '@/components/loading';
import { moviesApi, ratingsApi } from '@/lib/api';
import { Film, Star, Clock, Calendar, User, ArrowLeft } from 'lucide-react';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = parseInt(params.id as string);

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => moviesApi.getById(movieId),
    enabled: !!movieId,
  });

  const { data: ratings } = useQuery({
    queryKey: ['movie-ratings', movieId],
    queryFn: () => ratingsApi.getAll(movieId),
    enabled: !!movieId,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Movie Not Found</h1>
            <button
              onClick={() => router.push('/movies')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Back to Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Loading />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getAverageRating = (ratings: { rating: number }[]) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{movie.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            {movie.releaseYear && (
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                {movie.releaseYear}
              </div>
            )}

            {movie.duration && (
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                {formatDuration(movie.duration)}
              </div>
            )}

            {movie.genre && (
              <div className="flex items-center text-gray-600">
                <Film className="w-5 h-5 mr-2" />
                {movie.genre}
              </div>
            )}

            {movie.ratings && movie.ratings.length > 0 && (
              <div className="flex items-center text-gray-600">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                {getAverageRating(movie.ratings)}/10 ({movie.ratings.length} ratings)
              </div>
            )}
          </div>

          {movie.director && (
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700">Director: </span>
              <span className="text-gray-600">{movie.director}</span>
            </div>
          )}

          {movie.description && (
            <p className="text-gray-700 leading-relaxed">{movie.description}</p>
          )}
        </div>

        {movie.actors && movie.actors.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-6 h-6 mr-3" />
              Cast
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movie.actors.map((actor) => (
                <div
                  key={actor.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer"
                  onClick={() => router.push(`/actors/${actor.id}`)}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{actor.name}</h3>
                  {actor.nationality && (
                    <div className="text-sm text-gray-600">{actor.nationality}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push(`/movies/${movie.id}/rate`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm font-medium"
          >
            Rate this movie
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-3 text-yellow-500" />
            Ratings & Reviews
          </h2>

          {ratings && ratings.length > 0 ? (
            <div className="space-y-6">
              {ratings.map((rating) => (
                <div key={rating.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-4">
                      {Array.from({ length: 10 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rating.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">{rating.rating}/10</span>
                  </div>

                  {rating.reviewerName && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Reviewer:</span> {rating.reviewerName}
                    </p>
                  )}

                  {rating.comment && (
                    <p className="text-gray-700">{rating.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No ratings yet</h3>
              <p className="text-gray-600">Be the first to rate this movie!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 