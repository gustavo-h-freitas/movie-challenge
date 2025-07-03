'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { ratingsApi } from '@/lib/api';
import { Star } from 'lucide-react';

export default function RateMoviePage() {
  const params = useParams();
  const router = useRouter();
  const movieId = parseInt(params.id as string);
  const [form, setForm] = useState({
    rating: '',
    reviewerName: '',
    comment: '',
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
      await ratingsApi.create({
        ...form,
        rating: Number(form.rating),
        movieId,
      });
      setSuccess(true);
      setTimeout(() => router.push(`/movies/${movieId}`), 1000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to submit rating');
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
            <Star className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Rate Movie</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating (1-10)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                required
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. 8"
              />
            </div>
            <div>
              <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                id="reviewerName"
                name="reviewerName"
                value={form.reviewerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name (optional)"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                id="comment"
                name="comment"
                value={form.comment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write a review (optional)"
                rows={3}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Rating'}
            </button>
            {error && <div className="text-red-600 text-center mt-2">{error}</div>}
            {success && <div className="text-green-600 text-center mt-2">Rating submitted! Redirecting...</div>}
          </form>
        </div>
      </main>
    </div>
  );
} 