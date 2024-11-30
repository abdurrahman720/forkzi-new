import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRestaurantSearch } from '../hooks/useRestaurantSearch';
import { RestaurantCard } from '../components/RestaurantCard';
import { Filters } from '../components/Filters';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { UtensilsCrossed } from 'lucide-react';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || '';
  const { data, isLoading, error } = useRestaurantSearch(location);

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Implement filter logic here
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6">
          <aside>
            <Filters onFilterChange={handleFilterChange} />
          </aside>

          <main>
            {error ? (
              <ErrorMessage 
                message="Unable to load restaurants. Please try again later."
                className="mt-4"
              />
            ) : isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="lg" />
              </div>
            ) : !data?.length ? (
              <div className="bg-surface rounded-lg p-8 text-center">
                <UtensilsCrossed className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No restaurants found</h2>
                <p className="text-gray-400">
                  Try adjusting your filters or increasing the search radius
                </p>
                <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                  Update Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}