'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Navigation } from '@/components/navigation';
import { moviesApi, actorsApi, type Actor } from '@/lib/api';
import { Film, X, Plus } from 'lucide-react';

export default function CreateMoviePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    director: '',
    duration: '',
  });
  const [selectedActors, setSelectedActors] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Fetch all actors for selection
  const { data: actors = [] } = useQuery({
    queryKey: ['actors'],
    queryFn: () => actorsApi.getAll(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleActorSelect = (actor: Actor) => {
    if (!selectedActors.find(a => a.id === actor.id)) {
      setSelectedActors([...selectedActors, actor]);
    }
  };

  const handleActorRemove = (actorId: number) => {
    setSelectedActors(selectedActors.filter(a => a.id !== actorId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await moviesApi.create({
        ...form,
        releaseYear: form.releaseYear ? Number(form.releaseYear) : undefined,
        duration: form.duration ? Number(form.duration) : undefined,
        actorIds: selectedActors.map(actor => actor.id),
      });
      setSuccess(true);
      setTimeout(() => router.push('/movies'), 1000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create movie');
    } finally {
      setIsLoading(false);
    }
  };

  const availableActors = actors.filter(actor => !selectedActors.find(a => a.id === actor.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Film className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black">Create Movie</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-black mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Movie title"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-black mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Short description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="releaseYear" className="block text-sm font-medium text-black mb-2">Release Year</label>
                <input
                  type="number"
                  id="releaseYear"
                  name="releaseYear"
                  value={form.releaseYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 2024"
                  min="1888"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-black mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. 120"
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-black mb-2">Genre</label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Genre"
                />
              </div>
              <div>
                <label htmlFor="director" className="block text-sm font-medium text-black mb-2">Director</label>
                <input
                  type="text"
                  id="director"
                  name="director"
                  value={form.director}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Director"
                />
              </div>
            </div>

            {/* Actor Selection */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Cast</label>

              {/* Selected Actors */}
              {selectedActors.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-black mb-2">Selected Actors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedActors.map((actor) => (
                      <div
                        key={actor.id}
                        className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{actor.name}</span>
                        <button
                          type="button"
                          onClick={() => handleActorRemove(actor.id)}
                          className="ml-2 text-indigo-600 hover:text-indigo-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Actors */}
              <div>
                <h4 className="text-sm font-medium text-black mb-2">Available Actors:</h4>
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {availableActors.length > 0 ? (
                    <div className="space-y-1">
                      {availableActors.map((actor) => (
                        <button
                          key={actor.id}
                          type="button"
                          onClick={() => handleActorSelect(actor)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center justify-between"
                        >
                          <span className="text-black">{actor.name}</span>
                          <Plus className="w-4 h-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm py-2">No actors available</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Movie'}
            </button>
            {error && <div className="text-red-600 text-center mt-2">{error}</div>}
            {success && <div className="text-green-600 text-center mt-2">Movie created! Redirecting...</div>}
          </form>
        </div>
      </main>
    </div>
  );
} 