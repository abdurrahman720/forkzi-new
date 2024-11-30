import React from 'react';
import { MapPin, Phone, Globe, Star } from 'lucide-react';
import type { Restaurant } from '../types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {restaurant.name}
        </h3>
        
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{restaurant.address.street}, {restaurant.address.city}</span>
          </div>
          
          {restaurant.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>{restaurant.phone}</span>
            </div>
          )}
          
          {restaurant.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <a 
                href={restaurant.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>
        
        {restaurant.rating && (
          <div className="mt-4 flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < restaurant.rating! 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}