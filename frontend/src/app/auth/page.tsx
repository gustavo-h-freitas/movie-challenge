'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { KeyRound } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Store API key in localStorage
    localStorage.setItem('apiKey', apiKey);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <KeyRound className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black mb-4">Enter API Key</h1>
            <p className="text-black mt-2">
              Paste your API key to authenticate requests.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-black mb-2">
                API Key
              </label>
              <input
                type="text"
                id="apiKey"
                name="apiKey"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                placeholder="your-secret-api-key-123"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !apiKey}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Save API Key'
              )}
            </button>
            {success && (
              <div className="text-green-600 text-center mt-2">API key saved! Redirecting...</div>
            )}
          </form>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-black">
            You can find your API key in your backend configuration.
          </p>
        </div>
      </main>
    </div>
  );
} 