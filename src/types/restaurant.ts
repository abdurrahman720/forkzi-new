export interface Restaurant {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  phone?: string;
  website?: string;
  cuisine?: string[];
  rating?: number;
  priceRange?: string;
  hours?: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  lastUpdated: string;
}

export interface SearchFilters {
  cuisine?: string[];
  priceRange?: string[];
  rating?: number;
  distance?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}