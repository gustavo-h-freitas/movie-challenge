'use client';

import { useState, Suspense, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { SearchInput } from '@/components/search';
import { LoadingCard } from '@/components/loading';
import { actorsApi } from '@/lib/api';
import { Users, Calendar, MapPin, Film } from 'lucide-react';

function ActorsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: actors, isLoading, error, refetch } = useQuery({
    queryKey: ['actors', searchQuery],
    queryFn: () => actorsApi.getAll(searchQuery || undefined),
  });

  // Refetch data when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    router.push(`/actors?${params.toString()}`);
  };

  const filteredActors = actors || [];
  const totalPages = Math.ceil(filteredActors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActors = filteredActors.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Actors</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Actors</h1>
        <SearchInput
          placeholder="Search actors by name or nationality..."
          onSearch={handleSearch}
          className="max-w-md"
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
              {filteredActors.length} actor{filteredActors.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {paginatedActors.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No actors found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search terms.' : 'No actors available.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedActors.map((actor) => (
                <div key={actor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {actor.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      {actor.birthDate && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(actor.birthDate)} ({calculateAge(actor.birthDate)} years old)
                        </div>
                      )}

                      {actor.nationality && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {actor.nationality}
                        </div>
                      )}

                      {actor.movies && actor.movies.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Film className="w-4 h-4 mr-2" />
                          {actor.movies.length} movie{actor.movies.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    {actor.biography && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {actor.biography}
                      </p>
                    )}

                    {actor.movies && actor.movies.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">Recent movies:</div>
                        <div className="flex flex-wrap gap-1">
                          {actor.movies.slice(0, 3).map((movie) => (
                            <span
                              key={movie.id}
                              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {movie.title}
                            </span>
                          ))}
                          {actor.movies.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{actor.movies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => router.push(`/actors/${actor.id}`)}
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

export default function ActorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Suspense fallback={<LoadingCard />}>
        <ActorsPageContent />
      </Suspense>
    </div>
  );
} 