import React from 'react';
import { MapPin, Star, DollarSign, Clock, Utensils } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [distance, setDistance] = React.useState('50');
  const [rating, setRating] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFilterChange = (type: string, value: string) => {
    switch (type) {
      case 'distance':
        setDistance(value);
        break;
      case 'rating':
        setRating(value === rating ? '' : value);
        break;
      case 'price':
        setPrice(value === price ? '' : value);
        break;
      case 'open':
        setIsOpen(!isOpen);
        break;
    }

    onFilterChange({
      distance,
      rating,
      price,
      isOpen,
    });
  };

  return (
    <div className="bg-surface rounded-lg p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Utensils className="h-5 w-5 text-primary" />
          Craving Something?
        </h2>
        <p className="text-gray-400 text-sm">Filter to find your perfect meal</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Distance
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['5', '10', '25', '50'].map((value) => (
              <button
                key={value}
                className={`filter-button ${distance === value ? 'active' : ''}`}
                onClick={() => handleFilterChange('distance', value)}
              >
                {value} mi
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Star className="h-4 w-4" /> Rating
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['3.0', '3.5', '4.0', '4.5'].map((value) => (
              <button
                key={value}
                className={`filter-button ${rating === value ? 'active' : ''}`}
                onClick={() => handleFilterChange('rating', value)}
              >
                {value} ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Price
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {['$', '$$', '$$$', '$$$$'].map((value) => (
              <button
                key={value}
                className={`price-button ${price === value ? 'active' : ''}`}
                onClick={() => handleFilterChange('price', value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Open Now
          </h3>
          <button
            className={`filter-button w-full ${isOpen ? 'active' : ''}`}
            onClick={() => handleFilterChange('open', '')}
          >
            {isOpen ? 'Open Now' : 'No'}
          </button>
        </div>
      </div>

      <button
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
      >
        <Utensils className="h-5 w-5" />
        Find Delicious Food
      </button>
    </div>
  );
}