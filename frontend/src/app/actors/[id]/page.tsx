'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Loading } from '@/components/loading';
import { actorsApi } from '@/lib/api';
import { Calendar, MapPin, Film, ArrowLeft, Clock } from 'lucide-react';

export default function ActorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const actorId = parseInt(params.id as string);

  const { data: actor, isLoading, error } = useQuery({
    queryKey: ['actor', actorId],
    queryFn: () => actorsApi.getById(actorId),
    enabled: !!actorId,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Actor Not Found</h1>
            <button
              onClick={() => router.push('/actors')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Back to Actors
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

  if (!actor) return null;

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

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{actor.name}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-4 mb-6">
                {actor.birthDate && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    {formatDate(actor.birthDate)} ({calculateAge(actor.birthDate)} years old)
                  </div>
                )}

                {actor.nationality && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    {actor.nationality}
                  </div>
                )}

                {actor.movies && actor.movies.length > 0 && (
                  <div className="flex items-center text-gray-600">
                    <Film className="w-5 h-5 mr-2" />
                    {actor.movies.length} movie{actor.movies.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {actor.biography && (
                <p className="text-gray-700 leading-relaxed">{actor.biography}</p>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actor Info</h3>
                <div className="space-y-3">
                  {actor.birthDate && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Birth Date:</span>
                      <p className="text-gray-600">{formatDate(actor.birthDate)}</p>
                    </div>
                  )}

                  {actor.nationality && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Nationality:</span>
                      <p className="text-gray-600">{actor.nationality}</p>
                    </div>
                  )}

                  {actor.movies && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Total Movies:</span>
                      <p className="text-gray-600">{actor.movies.length}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {actor.movies && actor.movies.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Film className="w-6 h-6 mr-3" />
              Filmography
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {actor.movies.map((movie) => (
                <div
                  key={movie.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer"
                  onClick={() => router.push(`/movies/${movie.id}`)}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{movie.title}</h3>

                  <div className="space-y-1 mb-3">
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
                  </div>

                  {movie.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {movie.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 