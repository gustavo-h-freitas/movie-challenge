'use client';

import { useState, Suspense, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { SearchInput } from '@/components/search';
import { LoadingCard } from '@/components/loading';
import { moviesApi } from '@/lib/api';
import { Film, Star, Clock, Calendar, User } from 'lucide-react';

function MoviesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => {
      return moviesApi.getAll(searchQuery || undefined);
    },
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    router.push(`/movies?${params.toString()}`);
  }, [router]);

  const filteredMovies = movies || [];
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Movies</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Movies</h1>
        <SearchInput
          placeholder="Search movies by title, director, or genre..."
          onSearch={handleSearch}
          className="max-w-md"
          initialValue={searchQuery}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {paginatedMovies.length === 0 ? (
            <div className="text-center py-12">
              <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No movies found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search terms.' : 'No movies available.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedMovies.map((movie) => (
                <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {movie.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      {movie.releaseYear && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {movie.releaseYear}
                        </div>
                      )}

                      {movie.duration && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {formatDuration(movie.duration)}
                        </div>
                      )}

                      {movie.genre && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Film className="w-4 h-4 mr-2" />
                          {movie.genre}
                        </div>
                      )}

                      {movie.ratings && movie.ratings.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 mr-2 text-yellow-500" />
                          {getAverageRating(movie.ratings)}/10 ({movie.ratings.length} ratings)
                        </div>
                      )}
                    </div>

                    {movie.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {movie.description}
                      </p>
                    )}

                    {movie.actors && movie.actors.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <User className="w-4 h-4 mr-2" />
                          Cast:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {movie.actors.slice(0, 3).map((actor) => (
                            <span
                              key={actor.id}
                              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {actor.name}
                            </span>
                          ))}
                          {movie.actors.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{movie.actors.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => router.push(`/movies/${movie.id}`)}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Suspense fallback={<LoadingCard />}>
        <MoviesPageContent />
      </Suspense>
    </div>
  );
} 