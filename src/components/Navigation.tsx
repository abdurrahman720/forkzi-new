import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, MapPin } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-surface/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-full p-2">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Forkzi</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-primary mr-1" />
              Fort Lauderdale, FL
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}