import { z } from 'zod';

export const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number()
});

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  coordinates: coordinatesSchema.optional()
});

export const restaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: addressSchema,
  phone: z.string().optional(),
  website: z.string().url().optional(),
  cuisine: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  priceRange: z.string().optional(),
  lastUpdated: z.string()
});

export const searchResponseSchema = z.object({
  search_id: z.string(),
  status: z.string(),
  results: z.array(z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    business_name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    zip: z.string().optional(),
    coordinates: z.object({
      lat: z.string().or(z.number()).optional(),
      lng: z.string().or(z.number()).optional(),
      latitude: z.string().or(z.number()).optional(),
      longitude: z.string().or(z.number()).optional()
    }).optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    categories: z.array(z.string()).optional(),
    rating: z.string().or(z.number()).optional(),
    price_range: z.string().optional(),
    updated_at: z.string().optional()
  }))
});

export const resultsResponseSchema = z.object({
  status: z.string(),
  progress: z.number(),
  results: z.array(z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    business_name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    zip: z.string().optional(),
    coordinates: z.object({
      lat: z.string().or(z.number()).optional(),
      lng: z.string().or(z.number()).optional(),
      latitude: z.string().or(z.number()).optional(),
      longitude: z.string().or(z.number()).optional()
    }).optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    categories: z.array(z.string()).optional(),
    rating: z.string().or(z.number()).optional(),
    price_range: z.string().optional(),
    updated_at: z.string().optional()
  }))
});

export type Restaurant = z.infer<typeof restaurantSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
export type ResultsResponse = z.infer<typeof resultsResponseSchema>;