import { z } from 'zod';
import type { Restaurant } from '../types/restaurant';

const API_KEY = import.meta.env.VITE_D7_LEAD_FINDER_API_KEY;
const API_BASE_URL = import.meta.env.VITE_D7_API_BASE_URL;

const restaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number()
    }).optional()
  }),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  cuisine: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  priceRange: z.string().optional(),
  lastUpdated: z.string()
});

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API request failed: ${error.message}`);
    }
    throw new Error('API request failed with an unknown error');
  }
}

export async function searchRestaurants(location: string): Promise<Restaurant[]> {
  if (!location) {
    throw new Error('Location is required');
  }

  try {
    const data = await fetchWithAuth(`/search?key=${API_KEY}&location=${encodeURIComponent(location)}&type=restaurant`);

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }

    const results = Array.isArray(data.results) ? data.results : [];
    
    const restaurants = results
      .map(business => {
        try {
          return restaurantSchema.parse({
            id: business.id || String(Math.random()),
            name: business.name || business.business_name,
            address: {
              street: business.address || '',
              city: business.city || '',
              state: business.state || '',
              zipCode: business.postal_code || business.zip || '',
              coordinates: business.coordinates ? {
                latitude: parseFloat(business.coordinates.lat || business.coordinates.latitude),
                longitude: parseFloat(business.coordinates.lng || business.coordinates.longitude)
              } : undefined
            },
            phone: business.phone,
            website: business.website,
            cuisine: Array.isArray(business.categories) ? business.categories : [],
            rating: business.rating ? parseFloat(business.rating) : undefined,
            priceRange: business.price_range,
            lastUpdated: business.updated_at || new Date().toISOString()
          });
        } catch (error) {
          console.warn('Failed to parse restaurant:', error);
          return null;
        }
      })
      .filter((r): r is Restaurant => r !== null);

    return restaurants;
  } catch (error) {
    console.error('Restaurant search failed:', error);
    throw error;
  }
}

export async function getApiStatus(): Promise<{ status: string }> {
  try {
    const data = await fetchWithAuth('/status');
    return { status: data.status || 'unknown' };
  } catch (error) {
    console.error('API status check failed:', error);
    throw error;
  }
}