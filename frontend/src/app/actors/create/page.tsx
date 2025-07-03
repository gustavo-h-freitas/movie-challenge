'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { actorsApi } from '@/lib/api';
import { Users } from 'lucide-react';

export default function CreateActorPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    nationality: '',
    biography: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await actorsApi.create(form);
      setSuccess(true);
      setTimeout(() => router.push('/actors'), 1000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create actor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Users className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Create Actor</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Actor name"
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nationality"
              />
            </div>
            <div>
              <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
              <textarea
                id="biography"
                name="biography"
                value={form.biography}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Short biography"
                rows={3}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Actor'}
            </button>
            {error && <div className="text-red-600 text-center mt-2">{error}</div>}
            {success && <div className="text-green-600 text-center mt-2">Actor created! Redirecting...</div>}
          </form>
        </div>
      </main>
    </div>
  );
} 