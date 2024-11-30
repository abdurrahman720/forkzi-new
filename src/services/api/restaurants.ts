import { d7Api } from './d7-api';
import { ApiError } from './errors';
import type { Restaurant } from '../../types/restaurant';

export async function searchRestaurants(location: string): Promise<Restaurant[]> {
  if (!location.trim()) {
    throw new ApiError('Location is required', 400);
  }

  try {
    const results = await d7Api.searchWithPolling(location);
    
    return results
      .map(result => {
        try {
          return {
            id: result.id || String(Math.random()),
            name: result.name || result.business_name || '',
            address: {
              street: result.address1 || '',
              city: result.city || '',
              state: result.state || '',
              zipCode: result.zip || '',
            },
            phone: result.phone,
            website: result.website,
            cuisine: result.category ? [result.category] : [],
            rating: result.googlestars ? parseFloat(result.googlestars) : undefined,
            priceRange: result.price_range,
            lastUpdated: new Date().toISOString()
          };
        } catch (error) {
          console.warn('Failed to parse restaurant:', error);
          return null;
        }
      })
      .filter((r): r is Restaurant => r !== null);
  } catch (error) {
    console.error('Restaurant search failed:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError('Restaurant search failed', 500);
  }
}