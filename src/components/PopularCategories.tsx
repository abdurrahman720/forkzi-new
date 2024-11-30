import React from 'react';
import { Coffee, Pizza, Sandwich, Wine } from 'lucide-react';

const categories = [
  { name: 'Cafes', icon: Coffee },
  { name: 'Italian', icon: Pizza },
  { name: 'Fast Food', icon: Sandwich },
  { name: 'Fine Dining', icon: Wine },
];

export function PopularCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Icon className="h-8 w-8 text-indigo-600 mb-3" />
                <span className="text-lg font-medium text-gray-900">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}