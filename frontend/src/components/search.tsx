'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  initialValue?: string;
}

export function SearchInput({ placeholder = 'Search...', onSearch, className = '', initialValue = '' }: SearchProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    if (query === initialValue) return; // Don't trigger search for initial value

    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch, initialValue]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
} 