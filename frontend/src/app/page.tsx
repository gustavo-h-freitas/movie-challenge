import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Film, Users, Star, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MovieDB
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover and explore your favorite movies and actors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/movies"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <Film className="w-5 h-5 mr-2" />
              Browse Movies
            </Link>
            <Link
              href="/actors"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Browse Actors
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Film className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Movies</h3>
            <p className="text-gray-600">
              Explore a vast collection of movies with detailed information, ratings, and cast details.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Actors</h3>
            <p className="text-gray-600">
              Discover talented actors and actresses with their filmography and biographical information.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Star className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ratings</h3>
            <p className="text-gray-600">
              Read and discover movie ratings and reviews from other users.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/movies"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Film className="w-6 h-6 text-indigo-600 mr-3" />
              <span className="font-medium text-indigo-600">All Movies</span>
            </Link>

            <Link
              href="/actors"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="w-6 h-6 text-indigo-600 mr-3" />
              <span className="font-medium text-indigo-600">All Actors</span>
            </Link>

            <Link
              href="/movies?search="
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="w-6 h-6 text-indigo-600 mr-3" />
              <span className="font-medium text-indigo-600">Search Movies</span>
            </Link>

            <Link
              href="/actors?search="
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="w-6 h-6 text-indigo-600 mr-3" />
              <span className="font-medium text-indigo-600">Search Actors</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
