import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { Utensils } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();

  const handleSearch = (location: string) => {
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center mb-6">
          <Utensils className="h-12 w-12 text-white" />
          <h1 className="text-5xl font-bold text-white ml-4">Forkzi</h1>
        </div>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Discover the best restaurants in your area. From cozy cafes to fine dining, find your next favorite spot.
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
}