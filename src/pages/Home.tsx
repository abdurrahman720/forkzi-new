import React from 'react';
import { Hero } from '../components/Hero';
import { PopularCategories } from '../components/PopularCategories';

export function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <PopularCategories />
    </div>
  );
}