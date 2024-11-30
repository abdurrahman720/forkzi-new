import React from 'react';
import { useRestaurantSearch } from '../hooks/useRestaurantSearch';
import { RestaurantCard } from './RestaurantCard';
import { Loader2 } from 'lucide-react';

interface Props {
  location: string;
}

export function RestaurantList({ location }: Props) {
  const { data, isLoading, error } = useRestaurantSearch(location);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Unable to load restaurants. Please try again later.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No restaurants found in this area.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}