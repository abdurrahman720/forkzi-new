import { useQuery } from 'react-query';
import { searchRestaurants } from '../services/api/restaurants';
import { ApiError } from '../services/api/errors';
import type { Restaurant } from '../types/restaurant';

export function useRestaurantSearch(location: string) {
  return useQuery<Restaurant[], Error>(
    ['restaurants', location],
    () => searchRestaurants(location),
    {
      enabled: Boolean(location),
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        if (error instanceof ApiError) {
          // Don't retry on validation or timeout errors
          if (error.code === 'TIMEOUT' || error.message.includes('validation')) {
            return false;
          }
        }
        // Retry other errors up to 2 times
        return failureCount < 2;
      },
      retryDelay: 1000,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Restaurant search error:', error);
      }
    }
  );
}